
import { itens, atualizar } from "../utils.js";
import { table2x2 } from "./table2x2.js";
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
    document.getElementById("inventario").innerHTML = ""
    document.getElementById("table2x2").innerHTML = ""

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {

            const div = document.createElement("div");
            div.id = `table2x2-${i}${j}`
            div.classList.add("item-inv");

            document.getElementById("table2x2").appendChild(div);

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

            if (Array.isArray(inventario[i][j])) {

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
        }
        else {

            document.getElementById("table2x2").style.display = "none"
            document.getElementById("inventario").style.display = "none"
            vizu_inv = 0
        }
    }
});
