import { arvore } from "./spr_arvore.js";
import { itens, atualizar } from "../utils.js";
import { press_E } from "../interacao/press_E.js";

const cores = {
    F: "folhac",
    O: "folhas",
    T: "tronco",
    B: "branco",
    I: "preto"
};

const ferramentas = ["machado-obamium", "machado-rubi", "machado-esmeralda", "machado-diamante", "machado-ouro", "machado-ferro", "machado-prata", "machado-pedra", "machado-madeira"]

function criarArvore(sprit, x, y, id) {
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
const arvores = [
    { x: 100, y: 100 },
    { x: 2500, y: 1800 },
    { x: 700, y: 250 },
    { x: 500, y: 400 },
];

arvores.forEach((posicao, index) => {
    criarArvore(arvore.padrao, posicao.x, posicao.y, `arvore-${index}`);
});

document.addEventListener("keydown", (event) => {

    const player = document.getElementById("boneco")
    var posicao = player.getBoundingClientRect();

    document.querySelectorAll(".arvore").forEach(item2 => {
        const rect2 = item2.getBoundingClientRect();

        const distanciaX = rect2.left - posicao.right;
        const distanciaY = rect2.top - posicao.bottom;
        if (
            distanciaX <= -10 &&
            distanciaX >= -50 &&
            distanciaY >= -65.5 &&
            distanciaY <= -25.5
        ) {
            atualizar(arvore.interacao, item2.id, cores)
            if(event.key == "e"){
                press_E("arvore", "madeira", ferramentas, item2.id, 1)
            }
        } else {
            atualizar(arvore.padrao, item2.id, cores)
        }
    })
});
