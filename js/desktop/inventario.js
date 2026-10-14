import { realizar_receitas } from "./crafts.js";
import { itens, atualizar } from "../utils.js";
import { result, table2x2 } from "./table2x2.js";
import { hotbar } from "./hotbar.js";

import { referencia, nada } from "../itens/center.js";

let vizu_inv = 0

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

    // Guarda o item de origem
    const itemOrigem = inventario[oi][oj];

    // Troca os itens de lugar
    inventario[oi][oj] = inventario[di][dj];
    inventario[di][dj] = itemOrigem;

    // Atualiza o inventário visual
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

        // Verifica se o destino aceita o item
        if (slotDestino !== 0) {
            if (
                !Array.isArray(slotDestino) ||
                slotDestino[0] !== nome
            ) {
                return;
            }
        }

        // Adiciona a quantidade apenas uma vez
        if (Array.isArray(slotDestino)) {
            slotDestino[1] += quantidade;
        } else {
            inventario[destino.i][destino.j] = [nome, quantidade];
        }

        // Consome os ingredientes da receita
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                table2x2[i][j] = 0;
            }
        }

        atualizar_inv();
        return;
    }

    // Não permite arrastar para o resultado
    if (destino.area === "result") return;

    const itemDestino = pegar_slot(destino);

    definir_slot(origem, itemDestino);
    definir_slot(destino, itemOrigem);

    atualizar_inv();
}

function configurarArrastar(div, area, i, j) {
    div.draggable = area !== "result"
        ? Array.isArray(
            area === "inv"
                ? inventario[i][j]
                : table2x2[i][j]
        )
        : Array.isArray(result);

    div.addEventListener("dragstart", (event) => {
        const item = area === "inv"
            ? inventario[i][j]
            : area === "craft"
                ? table2x2[i][j]
                : result;

        if (!Array.isArray(item)) {
            event.preventDefault();
            return;
        }

        event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({ area, i, j })
        );
    });

    div.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    div.addEventListener("drop", (event) => {
        event.preventDefault();

        const dados = event.dataTransfer.getData("text/plain");
        if (!dados) return;

        const origem = JSON.parse(dados);
        const destino = { area, i, j };

        mover_entre_areas(origem, destino);
    });
}



export function receber_item(drop, quantidade) {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {

            if (Array.isArray(inventario[i][j])) {
                if (inventario[i][j][0] == drop) {
                    inventario[i][j][1] += quantidade

                    atualizar_inv()
                    return;
                }
            }
            if (inventario[i][j] == 0) {
                inventario[i][j] = [drop, quantidade]

                console.table(inventario)
                atualizar_inv()
                return;
            }
        }
    }
}

export function atualizar_inv() {
    console.log(table2x2)
    realizar_receitas(table2x2)
    document.getElementById("inventario").innerHTML = ""
    document.getElementById("table2x2").innerHTML = ""
    document.getElementById("result").innerHTML = ""

    const div = document.createElement("div");
    div.id = `result-00`
    div.classList.add("item-inv");
    configurarArrastar(div, "result", 0, 0);
    document.getElementById("result").appendChild(div);

    if (Array.isArray(result)) {

        atualizar(referencia[result[0]].padrao, div.id, referencia[result[0]].cores, "pixel-inv")
        const textoQuantidade = document.createElement("span");

        textoQuantidade.classList.add("quantidade-item");
        textoQuantidade.textContent = result[1];
        div.appendChild(textoQuantidade);
    }

    if (result == 0) {
        atualizar(nada.padrao, div.id, { N: "nada" }, "pixel-inv")
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {

            const div = document.createElement("div");
            div.id = `table2x2-${i}${j}`
            div.classList.add("item-inv");

            document.getElementById("table2x2").appendChild(div);
            configurarArrastar(div, "craft", i, j);

            if (Array.isArray(table2x2[i][j])) {

                atualizar(referencia[table2x2[i][j][0]].padrao, div.id, referencia[table2x2[i][j][0]].cores, "pixel-inv")
                const textoQuantidade = document.createElement("span");

                textoQuantidade.classList.add("quantidade-item");
                textoQuantidade.textContent = table2x2[i][j][1];
                div.appendChild(textoQuantidade);
            }

            if (table2x2[i][j] == 0) {
                atualizar(nada.padrao, div.id, { N: "nada" }, "pixel-inv")
            }

        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {

            const div = document.createElement("div");
            div.id = `inv-${i}${j}`
            div.classList.add("item-inv")
            document.getElementById("inventario").appendChild(div);
            configurarArrastar(div, "inv", i, j);

            if (Array.isArray(inventario[i][j])) {
                console.log(referencia[inventario[i][j][0]])
                atualizar(referencia[inventario[i][j][0]].padrao, div.id, referencia[inventario[i][j][0]].cores, "pixel-inv")
                const textoQuantidade = document.createElement("span");

                textoQuantidade.classList.add("quantidade-item");
                textoQuantidade.textContent = inventario[i][j][1];
                div.appendChild(textoQuantidade);
            }

            if (inventario[i][j] == 0) {
                atualizar(nada.padrao, div.id, { N: "nada" }, "pixel-inv")
            }
        }
    }
}

document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.key == "Tab") {
        if (vizu_inv == 0) {
            vizu_inv = 1

            atualizar_inv()
            document.getElementById("inventario").style.display = "grid"
            document.getElementById("table2x2").style.display = "grid"
            document.getElementById("result").style.display = "grid"
        }
        else {

            document.getElementById("table2x2").style.display = "none"
            document.getElementById("inventario").style.display = "none"
            document.getElementById("result").style.display = "none"
            vizu_inv = 0
        }
    }
});
