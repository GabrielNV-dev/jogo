import { arvore } from "./spr_arvore.js";
import { itens, atualizar } from "../utils.js";
import { press_E } from "../interacao/press_E.js";
import { vida } from "../pedra/pedra.js";

const cores = {
    F: "folhac",
    O: "folhas",
    T: "tronco",
    B: "branco",
    I: "preto"
};

const ferramentas = ["machado-obamium", "machado-rubi", "machado-esmeralda", "machado-diamante", "machado-ouro", "machado-ferro", "machado-prata", "machado-pedra", "machado-madeira"]

export function criarArvore(sprit, x, y, id) {
    const elemento = document.createElement("div");

    elemento.classList.add("arvore");
    elemento.classList.add("objeto");

    elemento.style.left = `${x}px`;
    elemento.style.top = `${y}px`;
    elemento.id = id;
    sprit.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");

            div.classList.add("pixel");

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });

    document.body.appendChild(elemento);
}
let arvoreEmInteracao = null;

document.addEventListener("keydown", (event) => {
    const tecla = event.key.toLowerCase();

    // Ignora teclas que não afetam a interação com árvores
    if (!["w", "a", "s", "d", "e"].includes(tecla)) return;

    const player = document.getElementById("boneco");
    if (!player) return;

    const posicao = player.getBoundingClientRect();
    let arvoreProxima = null;

    document.querySelectorAll(".arvore").forEach(item => {
        const rect = item.getBoundingClientRect();

        const distanciaX = Math.round( (rect.left - posicao.right) / 10) * 10
        const distanciaY = Math.round( (rect.top - posicao.bottom) / 10) * 10

        const perto =
            distanciaX <= -10 &&
            distanciaX >= -50 &&
            distanciaY >= -65.5 &&
            distanciaY <= -25.5;

        if (perto) {
            arvoreProxima = item;
        }
    });

    // Só redesenha as árvores quando a árvore próxima muda
    if (arvoreProxima !== arvoreEmInteracao) {
        if (arvoreEmInteracao) {
            atualizar(
                arvore.padrao,
                arvoreEmInteracao.id,
                cores
            );
        }

        if (arvoreProxima) {
            atualizar(
                arvore.interacao,
                arvoreProxima.id,
                cores
            );
        }

        arvoreEmInteracao = arvoreProxima;
    }

    // Interage apenas com a árvore próxima
    if (tecla === "e" && arvoreProxima) {
        press_E(
            "arvore",
            "madeira_bruta",
            ferramentas,
            arvoreProxima.id,
            3
        );
        if(vida == 0){ arvoreProxima = null}
    }
});
