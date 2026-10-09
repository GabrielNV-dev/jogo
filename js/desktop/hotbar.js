import { itens } from "../utils.js";
import { referencia, nada } from "../itens/center.js";
export var hotbar = Array.from({ length: 8 }, () => 0);

export function selecionar(indice) {
    selecionado = indice;
}

export var selecionado = 0;

export function mao() {
    return hotbar[selecionado]
}
hotbar[0] = ["diamante", 3]
hotbar[1] = ["madeira", 3]
function atualizar(sprit, id, cores, pixel_tipo = "pixel") {
    const elemento = document.getElementById(id);

    if (!elemento || !Array.isArray(sprit) || sprit.length === 0) {
        return;
    }

    elemento.innerHTML = "";

    const linhas = sprit.length;
    const colunas = sprit[0].length;
    const tamanhoPixel = 4;

    elemento.style.display = "grid";
    elemento.style.gridTemplateColumns = `repeat(${colunas}, ${tamanhoPixel}px)`;
    elemento.style.gridTemplateRows = `repeat(${linhas}, ${tamanhoPixel}px)`;
    elemento.style.width = "40px";
    elemento.style.height = "40px";
    elemento.style.placeContent = "center";
    elemento.style.position = "relative";

    sprit.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");
            div.classList.add(pixel_tipo);

            div.style.width = `${tamanhoPixel}px`;
            div.style.height = `${tamanhoPixel}px`;

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });
}

export async function atualizar_hotbar() {
    document.getElementById("hotbar").innerHTML = ""

        for (let i = 0; i < 8; i++) {
            const div = document.createElement("div");

            div.id = `hotbar-${i}`
            div.classList.add("pixel-item");

            document.getElementById("hotbar").appendChild(div);
            console.log(hotbar[i])
            if (Array.isArray(hotbar[i])) {
                atualizar(referencia[hotbar[i][0]].padrao, div.id, referencia[hotbar[i][0]].cores, "pixel-inv")
                const textoQuantidade = document.createElement("span");

                textoQuantidade.classList.add("quantidade-item");
                textoQuantidade.textContent = hotbar[i][1];
                div.appendChild(textoQuantidade);
            }
            if (hotbar[i] === 0) {
                atualizar(nada.padrao, div.id, { N: "nada" }, "pixel-inv")
            }
            if (i == selecionado) {
                div.classList.add("selecionado");
            }
        }
    
}
atualizar_hotbar()