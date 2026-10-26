import { realizar_receitas, craftar } from "./crafts.js";
import { itens, atualizar } from "../utils.js";
import { result, table2x2, receber_result } from "./table2x2.js";
import { hotbar, atualizar_hotbar } from "./hotbar.js";
import { referencia, nada } from "../itens/center.js";
import {
    table3x3,
    result as result3x3,
    receber_result as receber_result3x3,
    atualizar_table3x3
} from "./table3x3.js";

let vizu_inv = 0;

const MAX_PILHA = 64;
const TEMPO_CLIQUE_DUPLO = 300;

// Item que "está na mão" (preso ao cursor do mouse), igual ao Minecraft.
// Formato: [nome, quantidade] ou null
let itemCursor = null;

// Estado de arrastar para distribuir itens (segurando o botão do mouse)
let arrasto = null; // { botao, slots: [{ pos, div }] }

// Para detectar clique duplo (juntar todos os itens iguais)
let ultimoClique = null; // { pos, tempo }

let mouseX = 0;
let mouseY = 0;

export var inventario = Array.from({ length: 9 }, () =>
    Array.from({ length: 4 }, () => 0)
);

export function espaco() {
    return inventario.some(linha =>
        linha.some(item => item === 0)
    );
}

/* ------------------------------------------------------------------ */
/* Acesso aos slots                                                    */
/* ------------------------------------------------------------------ */

function pegar_slot(posicao) {
    const { area, i, j } = posicao;

    if (area === "inv") return inventario[i][j];
    if (area === "craft") return table2x2[i][j];
    if (area === "result") return result;
    if (area === "hotbar") return hotbar[i];

    if (area === "craft3x3") return table3x3[i][j];
    if (area === "result3x3") return result3x3;

    return 0;
}

function definir_slot(posicao, item) {
    const { area, i, j } = posicao;

    if (area === "inv") {
        inventario[i][j] = item;
    } else if (area === "craft") {
        table2x2[i][j] = item;
    } else if (area === "hotbar") {
        hotbar[i] = item;
    } else if (area === "craft3x3") {
        table3x3[i][j] = item;
    } else if (area === "result" || area === "result3x3") {
        return false;
    }

    return true;
}

function eh_resultado(area) {
    return area === "result" || area === "result3x3";
}

function mesma_posicao(a, b) {
    return !!a && !!b && a.area === b.area && a.i === b.i && a.j === b.j;
}

function posicoes_inv() {
    const lista = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {
            lista.push({ area: "inv", i, j });
        }
    }
    return lista;
}

function posicoes_hotbar() {
    return Array.from({ length: hotbar.length }, (_, i) => ({
        area: "hotbar",
        i,
        j: 0
    }));
}

function posicoes_craft() {
    const lista = [];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            lista.push({ area: "craft", i, j });
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            lista.push({ area: "craft3x3", i, j });
        }
    }
    return lista;
}

/* ------------------------------------------------------------------ */
/* Inserção de itens em listas de slots                                */
/* ------------------------------------------------------------------ */

// Quanto cabe de "nome" nas posições dadas
function capacidade_para(posicoes, nome) {
    let total = 0;
    for (const p of posicoes) {
        const s = pegar_slot(p);
        if (!Array.isArray(s)) {
            total += MAX_PILHA;
        } else if (s[0] === nome) {
            total += MAX_PILHA - s[1];
        }
    }
    return total;
}

// Insere e devolve o que sobrou (0 = tudo coube)
function inserir(posicoes, nome, quantidade) {
    // 1) completa pilhas existentes
    for (const p of posicoes) {
        const s = pegar_slot(p);
        if (Array.isArray(s) && s[0] === nome && s[1] < MAX_PILHA) {
            const add = Math.min(MAX_PILHA - s[1], quantidade);
            s[1] += add;
            quantidade -= add;
            if (quantidade <= 0) return 0;
        }
    }

    // 2) ocupa casas vazias
    for (const p of posicoes) {
        if (!Array.isArray(pegar_slot(p))) {
            const add = Math.min(MAX_PILHA, quantidade);
            definir_slot(p, [nome, add]);
            quantidade -= add;
            if (quantidade <= 0) return 0;
        }
    }

    return quantidade;
}

// Mantida a assinatura original (usada por drops, mineração etc.)
export function receber_item(drop, quantidade) {
    const sobrou = inserir(posicoes_inv(), drop, quantidade);
    atualizar_inv();
    return sobrou;
}

/* ------------------------------------------------------------------ */
/* Funções antigas (mantidas para compatibilidade)                     */
/* ------------------------------------------------------------------ */

export function mover_item(origem, destino) {
    const [oi, oj] = origem;
    const [di, dj] = destino;

    if (oi === di && oj === dj) return;

    const itemOrigem = inventario[oi][oj];

    inventario[oi][oj] = inventario[di][dj];
    inventario[di][dj] = itemOrigem;

    atualizar_inv();
}

export function mover_entre_areas(origem, destino) {
    if (mesma_posicao(origem, destino)) return;
    if (eh_resultado(origem.area) || eh_resultado(destino.area)) return;

    const itemOrigem = pegar_slot(origem);
    const itemDestino = pegar_slot(destino);

    definir_slot(origem, itemDestino);
    definir_slot(destino, itemOrigem);

    atualizar_inv();
}

/* ------------------------------------------------------------------ */
/* Resultado do craft                                                  */
/* ------------------------------------------------------------------ */

function acao_resultado(pos, shift) {
    const ehTabela2x2 = pos.area === "result";
    const tabela = ehTabela2x2 ? table2x2 : table3x3;
    const ler_result = () => (ehTabela2x2 ? result : result3x3);

    // Shift + clique: crafta o máximo possível direto para o inventário
    if (shift) {
        const destinos = [...posicoes_inv(), ...posicoes_hotbar()];

        for (let n = 0; n < MAX_PILHA; n++) {
            const r = ler_result();
            if (!Array.isArray(r)) break;
            if (capacidade_para(destinos, r[0]) < r[1]) break;

            // craftar() consome o que a receita pede (1 de cada, ou tudo
            // nas receitas sem formato como madeira bruta -> refinada)
            const saida = craftar(tabela);
            if (!saida) break;

            inserir(destinos, saida[0], saida[1]);
        }
        return;
    }

    const r = ler_result();
    if (!Array.isArray(r)) return;

    if (Array.isArray(itemCursor)) {
        if (itemCursor[0] !== r[0] || itemCursor[1] + r[1] > MAX_PILHA) return;
    }

    const saida = craftar(tabela);
    if (!saida) return;

    if (Array.isArray(itemCursor)) {
        itemCursor[1] += saida[1];
    } else {
        itemCursor = [saida[0], saida[1]];
    }
}

/* ------------------------------------------------------------------ */
/* Ações de clique estilo Minecraft                                    */
/* ------------------------------------------------------------------ */

function mover_rapido(pos) {
    const slot = pegar_slot(pos);
    if (!Array.isArray(slot)) return;

    let destinos;
    if (pos.area === "inv") {
        destinos = posicoes_hotbar();
    } else if (pos.area === "hotbar") {
        destinos = posicoes_inv();
    } else {
        destinos = [...posicoes_inv(), ...posicoes_hotbar()];
    }

    const sobrou = inserir(destinos, slot[0], slot[1]);

    if (sobrou <= 0) {
        definir_slot(pos, 0);
    } else {
        slot[1] = sobrou;
    }
}

// Duplo clique: junta no cursor todos os itens iguais espalhados
function coletar_todos() {
    if (!Array.isArray(itemCursor)) return;

    const nome = itemCursor[0];
    const origens = [
        ...posicoes_inv(),
        ...posicoes_hotbar(),
        ...posicoes_craft()
    ];

    for (const p of origens) {
        if (itemCursor[1] >= MAX_PILHA) break;

        const s = pegar_slot(p);
        if (!Array.isArray(s) || s[0] !== nome) continue;

        const levar = Math.min(s[1], MAX_PILHA - itemCursor[1]);
        itemCursor[1] += levar;
        s[1] -= levar;

        if (s[1] <= 0) definir_slot(p, 0);
    }
}

function clique_slot(pos, botao, shift, duplo) {
    const slot = pegar_slot(pos);
    const vazio = !Array.isArray(slot);

    if (shift) {
        mover_rapido(pos);
        return;
    }

    if (duplo && Array.isArray(itemCursor)) {
        coletar_todos();
        return;
    }

    // Mão vazia: pegar pilha (esquerdo) ou metade (direito)
    if (!Array.isArray(itemCursor)) {
        if (vazio) return;

        if (botao === 0) {
            itemCursor = slot;
            definir_slot(pos, 0);
        } else {
            const metade = Math.ceil(slot[1] / 2);
            itemCursor = [slot[0], metade];
            slot[1] -= metade;
            if (slot[1] <= 0) definir_slot(pos, 0);
        }
        return;
    }

    // Mão com item
    if (vazio) {
        // esquerdo: solta tudo / direito: solta 1
        const q = botao === 0 ? itemCursor[1] : 1;
        definir_slot(pos, [itemCursor[0], q]);
        itemCursor[1] -= q;
    } else if (slot[0] === itemCursor[0]) {
        const livre = MAX_PILHA - slot[1];
        const q = Math.min(livre, botao === 0 ? itemCursor[1] : 1);
        slot[1] += q;
        itemCursor[1] -= q;
    } else {
        // tipos diferentes: troca
        const antigo = slot;
        definir_slot(pos, itemCursor);
        itemCursor = antigo;
    }

    if (itemCursor && itemCursor[1] <= 0) itemCursor = null;
}

function clique_com_duplo(pos, botao, shift) {
    const agora = Date.now();

    const duplo =
        botao === 0 &&
        !shift &&
        Array.isArray(itemCursor) &&
        ultimoClique !== null &&
        mesma_posicao(ultimoClique.pos, pos) &&
        agora - ultimoClique.tempo < TEMPO_CLIQUE_DUPLO;

    ultimoClique = duplo ? null : { pos, tempo: agora };

    clique_slot(pos, botao, shift, duplo);
    atualizar_inv();
}

// Arrastar segurando o botão: distribui o item da mão pelos slots
function distribuir_arrasto(a) {
    if (!Array.isArray(itemCursor)) return;

    const nome = itemCursor[0];

    const validos = a.slots
        .map(s => s.pos)
        .filter(p => {
            const s = pegar_slot(p);
            return !Array.isArray(s) || s[0] === nome;
        });

    if (validos.length === 0) return;

    let restante = itemCursor[1];
    const porSlot =
        a.botao === 0
            ? Math.max(1, Math.floor(restante / validos.length))
            : 1;

    for (const p of validos) {
        if (restante <= 0) break;

        const s = pegar_slot(p);
        const atual = Array.isArray(s) ? s[1] : 0;
        const q = Math.min(porSlot, MAX_PILHA - atual, restante);

        if (q <= 0) continue;

        if (Array.isArray(s)) {
            s[1] += q;
        } else {
            definir_slot(p, [nome, q]);
        }

        restante -= q;
    }

    itemCursor[1] = restante;
    if (restante <= 0) itemCursor = null;
}

/* ------------------------------------------------------------------ */
/* Item preso ao mouse                                                 */
/* ------------------------------------------------------------------ */

function obter_div_cursor() {
    let d = document.getElementById("item-cursor");

    if (!d) {
        d = document.createElement("div");
        d.id = "item-cursor";
        d.classList.add("item-inv");
        Object.assign(d.style, {
            position: "fixed",
            pointerEvents: "none",
            zIndex: "10000",
            background: "transparent",
            border: "none",
            boxShadow: "none",
            transform: "translate(-50%, -50%)",
            display: "none"
        });
        document.body.appendChild(d);
    }

    return d;
}

function posicionar_cursor() {
    const d = document.getElementById("item-cursor");
    if (!d) return;
    d.style.left = mouseX + "px";
    d.style.top = mouseY + "px";
}

function atualizar_cursor() {
    const d = obter_div_cursor();
    d.innerHTML = "";

    if (!Array.isArray(itemCursor)) {
        d.style.display = "none";
        return;
    }

    // Usa o mesmo tamanho dos slots
    const ref = document.querySelector("#inventario .item-inv");
    if (ref && ref.offsetWidth > 0) {
        d.style.width = ref.offsetWidth + "px";
        d.style.height = ref.offsetHeight + "px";
    }

    atualizar(
        referencia[itemCursor[0]].padrao,
        d.id,
        referencia[itemCursor[0]].cores,
        "pixel-inv"
    );

    const textoQuantidade = document.createElement("span");
    textoQuantidade.classList.add("quantidade-item");
    textoQuantidade.textContent = itemCursor[1];
    d.appendChild(textoQuantidade);

    d.style.display = "grid"; // precisa ser grid para o sprite não quebrar em linhas
    posicionar_cursor();
}

// Devolve o item da mão ao inventário (ao fechar)
function devolver_cursor() {
    arrasto = null;
    ultimoClique = null;

    if (Array.isArray(itemCursor)) {
        const sobrou = inserir(
            [...posicoes_inv(), ...posicoes_hotbar()],
            itemCursor[0],
            itemCursor[1]
        );
        itemCursor = sobrou > 0 ? [itemCursor[0], sobrou] : null;
    }

    atualizar_cursor();
}

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    posicionar_cursor();
});

document.addEventListener("mouseup", () => {
    if (!arrasto) return;

    const a = arrasto;
    arrasto = null;

    if (a.slots.length === 1) {
        // não arrastou: é um clique normal
        clique_com_duplo(a.slots[0].pos, a.botao, false);
    } else {
        distribuir_arrasto(a);
        atualizar_inv();
    }
});

/* ------------------------------------------------------------------ */
/* Ligação dos slots (mesma assinatura usada pelos outros arquivos)    */
/* ------------------------------------------------------------------ */

export function configurarClique(div, area, i, j) {
    const posicaoAtual = { area, i, j };

    div.addEventListener("contextmenu", (e) => e.preventDefault());

    div.addEventListener("mousedown", (e) => {
        e.preventDefault();

        if (e.button !== 0 && e.button !== 2) return;

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Slot de resultado: pega o item craftado
        if (eh_resultado(area)) {
            acao_resultado(posicaoAtual, e.shiftKey);
            atualizar_inv();
            return;
        }

        // Com item na mão: espera para saber se é clique ou arrasto
        if (Array.isArray(itemCursor) && !e.shiftKey) {
            arrasto = {
                botao: e.button,
                slots: [{ pos: posicaoAtual, div }]
            };
            div.classList.add("selecionado");
            return;
        }

        clique_com_duplo(posicaoAtual, e.button, e.shiftKey);
    });

    div.addEventListener("mouseenter", () => {
        if (!arrasto || eh_resultado(area)) return;

        if (arrasto.slots.some(s => mesma_posicao(s.pos, posicaoAtual))) return;

        const s = pegar_slot(posicaoAtual);
        if (Array.isArray(s) && s[0] !== itemCursor[0]) return;

        arrasto.slots.push({ pos: posicaoAtual, div });
        div.classList.add("selecionado");
    });
}

/* ------------------------------------------------------------------ */
/* Renderização                                                        */
/* ------------------------------------------------------------------ */

export function atualizar_inv() {
    realizar_receitas(table2x2);
    realizar_receitas(table3x3);
    document.getElementById("inventario").innerHTML = "";
    document.getElementById("table2x2").innerHTML = "";
    document.getElementById("result").innerHTML = "";

    // Renderiza o Slot de Resultado
    const divResult = document.createElement("div");
    divResult.id = `result-00`;
    divResult.classList.add("item-inv");

    configurarClique(divResult, "result", 0, 0);
    document.getElementById("result").appendChild(divResult);

    if (Array.isArray(result)) {
        atualizar(referencia[result[0]].padrao, divResult.id, referencia[result[0]].cores, "pixel-inv");
        const textoQuantidade = document.createElement("span");
        textoQuantidade.classList.add("quantidade-item");
        textoQuantidade.textContent = result[1];
        divResult.appendChild(textoQuantidade);
    } else {
        atualizar(nada.padrao, divResult.id, { N: "nada" }, "pixel-inv");
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const div = document.createElement("div");
            div.id = `table2x2-${i}${j}`;
            div.classList.add("item-inv");

            document.getElementById("table2x2").appendChild(div);
            configurarClique(div, "craft", i, j);

            if (Array.isArray(table2x2[i][j])) {
                atualizar(referencia[table2x2[i][j][0]].padrao, div.id, referencia[table2x2[i][j][0]].cores, "pixel-inv");
                const textoQuantidade = document.createElement("span");
                textoQuantidade.classList.add("quantidade-item");
                textoQuantidade.textContent = table2x2[i][j][1];
                div.appendChild(textoQuantidade);
            } else {
                atualizar(nada.padrao, div.id, { N: "nada" }, "pixel-inv");
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {
            const div = document.createElement("div");
            div.id = `inv-${i}${j}`;
            div.classList.add("item-inv");

            document.getElementById("inventario").appendChild(div);
            configurarClique(div, "inv", i, j);

            if (Array.isArray(inventario[i][j])) {
                atualizar(referencia[inventario[i][j][0]].padrao, div.id, referencia[inventario[i][j][0]].cores, "pixel-inv");
                const textoQuantidade = document.createElement("span");
                textoQuantidade.classList.add("quantidade-item");
                textoQuantidade.textContent = inventario[i][j][1];
                div.appendChild(textoQuantidade);
            } else {
                atualizar(nada.padrao, div.id, { N: "nada" }, "pixel-inv");
            }
        }
    }
    atualizar_table3x3(configurarClique);
    atualizar_hotbar();
    atualizar_cursor();
}

document.addEventListener("keydown", (event) => {
    if (event.key == "Tab") {
        event.preventDefault();
        if (vizu_inv == 0) {
            vizu_inv = 1;
            atualizar_inv();
            document.getElementById("inventario").style.display = "grid";
            document.getElementById("table2x2").style.display = "grid";
            document.getElementById("result").style.display = "grid";
        } else {
            document.getElementById("table2x2").style.display = "none";
            document.getElementById("inventario").style.display = "none";
            document.getElementById("result").style.display = "none";
            vizu_inv = 0;
            devolver_cursor(); // devolve o item da mão ao fechar
            atualizar_inv();
        }
    }
});