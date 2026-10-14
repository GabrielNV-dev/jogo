import { realizar_receitas } from "./crafts.js";
import { itens, atualizar } from "../utils.js";
import { result, table2x2 } from "./table2x2.js";
import { hotbar } from "./hotbar.js";

import { referencia, nada } from "../itens/center.js";

let vizu_inv = 0;

// Variável para guardar o slot que está atualmente selecionado pelo clique
let itemSelecionado = null; // Exemplo: { area: "inv", i: 0, j: 1 }

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

    return 0;
}

function definir_slot(posicao, item) {
    const { area, i, j } = posicao;

    if (area === "inv") {
        inventario[i][j] = item;
    } else if (area === "craft") {
        table2x2[i][j] = item;
    } else if (area === "result") {
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

    // Coletar o resultado da receita
    if (origem.area === "result") {
        if (destino.area !== "inv") return;

        const [nome, quantidade] = [...result];
        const slotDestino = inventario[destino.i][destino.j];

        if (slotDestino !== 0) {
            if (
                !Array.isArray(slotDestino) ||
                slotDestino[0] !== nome
            ) {
                return;
            }
        }

        if (Array.isArray(slotDestino)) {
            slotDestino[1] += quantidade;
        } else {
            inventario[destino.i][destino.j] = [nome, quantidade];
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                table2x2[i][j] = 0;
            }
        }

        atualizar_inv();
        return;
    }

    if (destino.area === "result") return;

    const itemDestino = pegar_slot(destino);

    definir_slot(origem, itemDestino);
    definir_slot(destino, itemOrigem);

    atualizar_inv();
}

// Configura o clique em vez de arrastar
function configurarClique(div, area, i, j) {
    div.addEventListener("click", () => {
        const posicaoAtual = { area, i, j };
        const itemNoSlot = pegar_slot(posicaoAtual);

        // Se nenhum item está selecionado, seleciona este (se houver item)
        if (!itemSelecionado) {
            // Se for o resultado e estiver vazio, não faz nada
            if (area === "result" && !Array.isArray(result)) return;
            // Se for um slot normal e estiver vazio (0), não faz nada
            if (area !== "result" && !Array.isArray(itemNoSlot)) return;

            itemSelecionado = posicaoAtual;
            atualizar_inv(); // Atualiza para destacar visualmente se quiser
            return;
        }

        // Se já tem um item selecionado, o clique atual funciona como o destino
        // Caso clique no mesmo lugar, deseleciona
        if (
            itemSelecionado.area === area &&
            itemSelecionado.i === i &&
            itemSelecionado.j === j
        ) {
            itemSelecionado = null;
            atualizar_inv();
            return;
        }

        // Executa a movimentação entre as áreas
        mover_entre_areas(itemSelecionado, posicaoAtual);
        
        // Limpa a seleção após mover
        itemSelecionado = null;
        atualizar_inv();
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

    // Renderiza a Mesa de Craft (2x2)
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

    // Renderiza o Inventário
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