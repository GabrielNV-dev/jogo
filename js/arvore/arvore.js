import { arvore } from "./spr_arvore.js";
import { aplicarSprite, trocarSprite } from "../sprites.js";
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
    aplicarSprite(elemento, sprit, cores);

    document.body.appendChild(elemento);
}
let arvoreEmInteracao = null;

document.addEventListener("keydown", (event) => {
    const tecla = event.key.toLowerCase();

    // Ignora teclas que não afetam a interação com árvores
    if (!["w", "a", "s", "d", "e"].includes(tecla)) return;

    const player = document.getElementById("boneco");
    if (!player) return;

    let arvoreProxima = null;

    const player_left = Math.round(parseFloat(player.style.left) / 10) * 10;
    const player_top = Math.round(parseFloat(player.style.top) / 10) * 10;

    document.querySelectorAll(".arvore").forEach(item => {

        const entidade_left = Math.round(parseFloat(item.style.left) / 10) * 10;
        const entidade_top = Math.round(parseFloat(item.style.top) / 10) * 10;



        const perto =
            player_left + 20 >= entidade_left && player_top >= entidade_top && player_top <= entidade_top + 20 && player_left <= entidade_left
            ||
            player_left >= entidade_left &&
            player_left <= entidade_left + 20 &&
            player_top >= entidade_top &&
            player_top <= entidade_top + 20
            ||

            player_top - 30 <= entidade_top &&
            player_left <= entidade_left + 13 &&
            player_left >= entidade_left - 13 &&
            player_top - 30 >= entidade_top



        if (perto) {
            arvoreProxima = item;
        }
    });

    if (arvoreProxima !== arvoreEmInteracao) {
        if (arvoreEmInteracao) {
            trocarSprite(arvoreEmInteracao.id, arvore.padrao, cores);
        }

        if (arvoreProxima) {
            trocarSprite(arvoreProxima.id, arvore.interacao, cores);
        }

        arvoreEmInteracao = arvoreProxima;
    }

    if (tecla === "e" && arvoreProxima) {
        press_E(
            "arvore",
            "madeira_bruta",
            ferramentas,
            arvoreProxima.id,
            3
        );
        
        if (
            arvoreEmInteracao &&
            !document.getElementById(arvoreEmInteracao.id)
        ) {
            arvoreEmInteracao = null;
        }
        if (vida == 0) {
            arvoreEmInteracao = null;
        }
    }
});
