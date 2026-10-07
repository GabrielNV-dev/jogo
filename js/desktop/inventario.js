
import { cores, itens, atualizar } from "../utils.js";
import { table2x2 } from "./table2x2.js";
import { hotbar } from "./hotbar.js";
let vizu_inv = 0

export var inventario = Array.from({ length: 9 }, () =>
    Array.from({ length: 4 }, () => 0)
);

export function atualizar_inv() {
    document.getElementById("inventario").innerHTML = ""
    document.getElementById("table2x2").innerHTML = ""

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const div = document.createElement("div");
            div.classList.add("pixel-inv");
            if (itens[table2x2[i][j]]) {
                div.classList.add(itens[table2x2[i][j]]);
            }
            document.getElementById("table2x2").appendChild(div);
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {
            const div = document.createElement("div");
            div.classList.add("pixel-inv");

            if (itens[inventario[i][j]]) {
                div.classList.add(itens[inventario[i][j]]);
            }

            document.getElementById("inventario").appendChild(div);
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
