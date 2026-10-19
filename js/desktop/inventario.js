import { realizar_receitas } from "./crafts.js";
import { itens, atualizar } from "../utils.js";
import { result, table2x2,receber_result } from "./table2x2.js";
import { hotbar, atualizar_hotbar } from "./hotbar.js";
import { referencia, nada } from "../itens/center.js";
import {
    table3x3,
    result as result3x3,
    receber_result as receber_result3x3,
    atualizar_table3x3
} from "./table3x3.js";

let vizu_inv = 0;

// Variável para guardar o slot que está atualmente selecionado pelo clique
let itemSelecionado = null; // Exemplo: { area: "inv", i: 0, j: 1 }
let temporizadorClique = null;
let cliquePendente = null;

const TEMPO_CLIQUE_DUPLO = 250;

export var inventario = Array.from({ length: 9 }, () =>
    Array.from({ length: 4 }, () => 0)
);

export function espaco() {
    return inventario.some(linha =>
        linha.some(item => item === 0)
    );
}

export function mover_item(origem, destino) {
    const [oi, oj] = origem;
    const [di, dj] = destino;

    if (oi === di && oj === dj) return;

    const itemOrigem = inventario[oi][oj];

    inventario[oi][oj] = inventario[di][dj];
    inventario[di][dj] = itemOrigem;

    atualizar_inv();
}

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
export function mover_entre_areas(origem, destino) {
    if (
        origem.area === destino.area &&
        origem.i === destino.i &&
        origem.j === destino.j
    ) {
        return;
    }

    const itemOrigem = pegar_slot(origem);

    if (!Array.isArray(itemOrigem)) return;

    const resultado2x2 = origem.area === "result";
    const resultado3x3 = origem.area === "result3x3";

    // Retirar um resultado de craft
    if (resultado2x2 || resultado3x3) {
        if (
            destino.area === "result" ||
            destino.area === "result3x3"
        ) {
            return;
        }

        const [nome, quantidade] = itemOrigem;
        const itemDestino = pegar_slot(destino);

        // Não substituir outro item nem misturar tipos diferentes
        if (
            Array.isArray(itemDestino) &&
            itemDestino[0] !== nome
        ) {
            return;
        }

        if (itemDestino === 0) {
            definir_slot(destino, [nome, quantidade]);
        } else {
            itemDestino[1] += quantidade;
        }

        // Consumir os ingredientes da mesa correspondente
        if (resultado2x2) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    table2x2[i][j] = 0;
                }
            }
        }

        if (resultado3x3) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    table3x3[i][j] = 0;
                }
            }
        }

        if (resultado2x2) {
            receber_result(0);
        }

        if (resultado3x3) {
            receber_result3x3(0);
        }

        itemSelecionado = null;
        atualizar_inv();
        return;
    }

    // Não permitir colocar itens nos slots de resultado
    if (
        destino.area === "result" ||
        destino.area === "result3x3"
    ) {
        return;
    }

    const itemDestino = pegar_slot(destino);

    definir_slot(origem, itemDestino);
    definir_slot(destino, itemOrigem);

    atualizar_inv();
}

// Configura o clique em vez de arrastar


export function configurarClique(div, area, i, j) {
    const posicaoAtual = { area, i, j };

    function mesmaPosicao(a, b) {
        return a &&
            b &&
            a.area === b.area &&
            a.i === b.i &&
            a.j === b.j;
    }

    function executarClique(cliqueDuplo) {
        const itemNoSlot = pegar_slot(posicaoAtual);

        // Seleciona um item
        if (!itemSelecionado) {
            if (!Array.isArray(itemNoSlot)) return;

            itemSelecionado = posicaoAtual;
            atualizar_inv();
            return;
        }

        // Clicou no próprio item selecionado: cancela
        if (mesmaPosicao(itemSelecionado, posicaoAtual)) {
            itemSelecionado = null;
            atualizar_inv();
            return;
        }

        // Não permite depositar itens no resultado
        if (
            area === "result" ||
            area === "result3x3"
        ) return;

        // Resultado de craft: mantém o comportamento existente
        if (
            itemSelecionado.area === "result" ||
            itemSelecionado.area === "result3x3"
        ) {
            mover_entre_areas(itemSelecionado, posicaoAtual);
            itemSelecionado = null;
            atualizar_inv();
            return;
        }

        const itemOrigem = pegar_slot(itemSelecionado);

        if (!Array.isArray(itemOrigem)) {
            itemSelecionado = null;
            atualizar_inv();
            return;
        }

        const nomeItem = itemOrigem[0];
        const quantidadeOrigem = itemOrigem[1];

        // Clicar em uma casa ocupada por outro item
        // troca as pilhas completas
        if (
            Array.isArray(itemNoSlot) &&
            itemNoSlot[0] !== nomeItem
        ) {
            definir_slot(itemSelecionado, itemNoSlot);
            definir_slot(posicaoAtual, itemOrigem);

            itemSelecionado = null;
            atualizar_inv();
            return;
        }

        // Clique simples: 1 item
        // Clique duplo: pilha inteira
        const quantidadeTransferir = cliqueDuplo
            ? quantidadeOrigem
            : 1;

        // Casa vazia: cria uma pilha
        if (!Array.isArray(itemNoSlot)) {
            definir_slot(posicaoAtual, [
                nomeItem,
                quantidadeTransferir
            ]);
        } else {
            // Mesmo tipo: junta as quantidades
            itemNoSlot[1] += quantidadeTransferir;
        }

        // Retira da origem somente o que foi transferido
        itemOrigem[1] -= quantidadeTransferir;

        if (itemOrigem[1] <= 0) {
            definir_slot(itemSelecionado, 0);
            itemSelecionado = null;
        }

        atualizar_inv();
    }

    div.addEventListener("click", () => {
        const cliqueAtual = { area, i, j };

        // Segundo clique na mesma casa dentro do intervalo
        if (
            cliquePendente &&
            mesmaPosicao(cliquePendente.posicao, cliqueAtual) &&
            Date.now() - cliquePendente.tempo < TEMPO_CLIQUE_DUPLO
        ) {
            clearTimeout(temporizadorClique);

            temporizadorClique = null;
            cliquePendente = null;

            executarClique(true);
            return;
        }

        // Se havia outro clique pendente, executa-o primeiro
        if (temporizadorClique !== null) {
            clearTimeout(temporizadorClique);

            const cliqueAnterior = cliquePendente;
            temporizadorClique = null;
            cliquePendente = null;

            if (cliqueAnterior) {
                cliqueAnterior.executar(false);
            }
        }

        cliquePendente = {
            posicao: cliqueAtual,
            tempo: Date.now(),
            executar: executarClique
        };

        temporizadorClique = setTimeout(() => {
            const pendente = cliquePendente;

            temporizadorClique = null;
            cliquePendente = null;

            if (pendente) {
                pendente.executar(false);
            }
        }, TEMPO_CLIQUE_DUPLO);
    });
}



export function receber_item(drop, quantidade) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {
            if (Array.isArray(inventario[i][j])) {
                if (inventario[i][j][0] == drop) {
                    inventario[i][j][1] += quantidade;
                    atualizar_inv();
                    return;
                }
            }
            if (inventario[i][j] == 0) {
                inventario[i][j] = [drop, quantidade];
                atualizar_inv();
                return;
            }
        }
    }
}

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

    // Destaca se estiver selecionado
    if (itemSelecionado && itemSelecionado.area === "result") {
        divResult.classList.add("selecionado");
    }

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

            if (itemSelecionado && itemSelecionado.area === "craft" && itemSelecionado.i === i && itemSelecionado.j === j) {
                div.classList.add("selecionado");
            }

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

            if (itemSelecionado && itemSelecionado.area === "inv" && itemSelecionado.i === i && itemSelecionado.j === j) {
                div.classList.add("selecionado");
            }

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
            itemSelecionado = null; // Limpa a seleção ao fechar
        }
    }
});