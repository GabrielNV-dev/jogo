import { pedra } from "./spr_pedra.js";
import { atualizar } from "../utils.js";
import { press_E } from "../interacao/press_E.js";

export var vida = 100
export function diminuir_vida(valor){
    vida -= valor
}
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
    U: "prata",
    X: "vermelho-efeito"
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
    elemento.classList.add("100");

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

export async function fracasso(alvo) {
    atualizar_pedra(pedra.fracasso, alvo, cores)
    setTimeout(() => {
        atualizar_pedra(pedra.interacao, alvo, cores)
    }, 1000);
}
export function informar_vida(id, vida) {
    const personagem = document.getElementById(id)

    if (!personagem) return

    // Procura uma barra que já foi criada
    let barra = personagem.querySelector(".barra-vida")

    // Se não existir, cria
    if (!barra) {
        barra = document.createElement("div")
        barra.classList.add("barra-vida")

        // Configuração da barra
        barra.style.position = "absolute"
        barra.style.top = "-8px"
        barra.style.left = "0"
        barra.style.width = "100%"
        barra.style.height = "5px"
        barra.style.backgroundColor = "red"
        barra.style.borderRadius = "3px"
        barra.style.overflow = "hidden"

        // Parte verde
        const vidaBarra = document.createElement("div")
        vidaBarra.classList.add("vida-barra")

        vidaBarra.style.height = "100%"
        vidaBarra.style.width = "100%"
        vidaBarra.style.backgroundColor = "limegreen"
        vidaBarra.style.transition = "width 0.2s"

        barra.appendChild(vidaBarra)
        personagem.appendChild(barra)
    }

    // Garante que a vida fique entre 0 e 100
    vida = Math.max(0, Math.min(100, vida))

    // Altera o tamanho da parte verde
    const vidaBarra = barra.querySelector(".vida-barra")
    vidaBarra.style.width = `${vida}%`
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
    //ARRUMAR ESSA BOSTA DEPOIS
    if (event.key == "w" || event.key == "s" || event.key == "d" || event.key == "a"){vida = 100}
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
            
            if (event.key == "e") { // essa bct de um é a quantidade dropada, arruma pra cada minerio dps essa prr
                press_E("minerio", cores[minerio], ferramentas[minerio], item2.id, 1)
            }

        } else {
            atualizar_pedra(pedra.padrao, item2.id, cores)
        }
    })

});
