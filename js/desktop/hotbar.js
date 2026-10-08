import { itens, atualizar } from "../utils.js";

export var hotbar = Array.from({ length: 8 }, () =>
    Array.from({ length: 1 }, () => 0)
);

export function selecionar(indice) {
    selecionado = indice;
    console.log(selecionado)
}

export var selecionado = 0;

export function mao(){
    return hotbar[selecionado]
}
hotbar[3] = "picareta-obamium"
export async function atualizar_hotbar() {
    document.getElementById("hotbar").innerHTML = ""

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 1; j++) {
            const div = document.createElement("div");
            div.classList.add("pixel-hotbar");

            if (itens[hotbar[i][j]]) {
                div.classList.add(itens[hotbar[i][j]]);
            }
            if (i == selecionado) {
                div.classList.add("selecionado");
            }
            document.getElementById("hotbar").appendChild(div);
        }
    }
}
atualizar_hotbar()