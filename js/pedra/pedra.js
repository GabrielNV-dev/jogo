import { pedra } from "./spr_pedra.js";
import { atualizar } from "../utils.js";
import { press_E } from "../interacao/press_E.js";

const cores = {
    D: "cinza-claro",
    G: "cinza-escuro",
    C: "cinza",
    B: "branco",
    I: "preto",
    P: "pedra-m",
    A: "diamante",
    K: "ferro",
    J: "ouro",
    H: "carvao",
    N: "rubi",
    Q: "obamium",
    R: "esmeralda",
    U: "prata"
};

// Aqui onde é gerado aleatoriamente, mais para frente definir isto em coordenadas
const minerios = ["P", "A", "K", "J", "H", "N", "Q", "R", "U"];
function atualizar_pedra(sprit, id, cores) {

    const elemento = document.getElementById(id);
    elemento.innerHTML = ""
    const minerio = minerios.find(minerio => elemento.classList.contains(minerio));

    sprit.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");
            div.classList.add("pixel");


            if (pixel == "M") {
                div.classList.add(cores[minerio]);
            }

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }
            elemento.appendChild(div);
        });
    });
}

function criarPedra(sprit, x, y, id) {
    const elemento = document.createElement("div");
    const minerio = minerios[Math.floor(Math.random() * minerios.length)];

    elemento.classList.add("pedra");
    elemento.classList.add(minerio);
    elemento.classList.add("objeto");

    elemento.style.left = `${x}px`;
    elemento.style.top = `${y}px`;
    elemento.id = id;
    sprit.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");


            div.classList.add("pixel");
            if (pixel == "M") {
                div.classList.add(cores[minerio]);
            }
            else if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });

    document.body.appendChild(elemento);
}
const pedras = [
    { x: 50, y: 100 },
    { x: 50, y: 200 },
    { x: 50, y: 300 },
    { x: 50, y: 400 },
];

pedras.forEach((posicao, index) => {
    criarPedra(pedra.padrao, posicao.x, posicao.y, `pedra-${index}`);
});

document.addEventListener("keydown", (event) => {

    const player = document.getElementById("boneco")
    var posicao = player.getBoundingClientRect();

    document.querySelectorAll(".pedra").forEach(item2 => {
        const rect2 = item2.getBoundingClientRect();
        const minerio = minerios.find(minerio => item2.classList.contains(minerio));
        const ferramentas = {
            P: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro", "picareta-ferro", "picareta-prata", "picareta-pedra", "picareta-madeira"],
            A: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro"],
            K: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro", "picareta-ferro", "picareta-prata"],
            J: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro",],
            H: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro", "picareta-ferro", "picareta-prata", "picareta-pedra"],
            N: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda"],
            Q: ["picareta-obamium", "picareta-rubi",],
            R: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante"],
            U: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro", "picareta-ferro", "picareta-prata", "picareta-pedra"]
        }

        const distanciaX = rect2.left - posicao.right;
        const distanciaY = rect2.top - posicao.bottom;
        if (
            distanciaX <= -10 &&
            distanciaX >= -50 &&
            distanciaY >= -55.5 &&
            distanciaY <= -25.5
        ) {
            atualizar_pedra(pedra.interacao, item2.id, cores)
            press_E("pedra", ferramentas[minerio])
        } else {
            atualizar_pedra(pedra.padrao, item2.id, cores)
        }
    })
});
