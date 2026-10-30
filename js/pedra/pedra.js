import { pedra } from "./spr_pedra.js";
import { press_E } from "../interacao/press_E.js";
import { aplicarSprite } from "../sprites.js";

export var vida = 100
export function diminuir_vida(valor) {
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

const coresPorMinerio = Object.fromEntries(
    minerios.map(tipo => [tipo, { ...cores, M: cores[tipo] }])
);

function atualizar_pedra(sprit, id) {
    const elemento = document.getElementById(id);

    if (!elemento) return;

    const minerioSelecionado = minerios.find(tipo =>
        elemento.classList.contains(tipo)
    );

    if (!minerioSelecionado) return;

    aplicarSprite(elemento, sprit, coresPorMinerio[minerioSelecionado]);
}
export function criarPedra(sprit, x, y, id) {
    const elemento = document.createElement("div");
    const minerio = minerios[Math.floor(Math.random() * minerios.length)];

    elemento.classList.add("pedra");
    elemento.classList.add(minerio);
    elemento.classList.add("objeto");

    elemento.style.left = `${x}px`;
    elemento.style.top = `${y}px`;
    elemento.id = id;
    aplicarSprite(elemento, sprit, coresPorMinerio[minerio]);

    document.body.appendChild(elemento);
}

export function fracasso(alvo) {
    if (!document.getElementById(alvo)) return;

    atualizar_pedra(pedra.fracasso, alvo);

    setTimeout(() => {
        if (!document.getElementById(alvo)) return;

        // Se o jogador já saiu de perto, não volta pro sprite de interação
        if (!pedraEmInteracao || pedraEmInteracao.id !== alvo) return;

        atualizar_pedra(pedra.interacao, alvo);
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

const ferramentas = {
    P: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro", "picareta-prata", "picareta-pedra", "picareta-madeira"],
    A: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro"],
    K: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro", "picareta-prata"],
    J: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro"],
    H: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro", "picareta-prata", "picareta-pedra"],
    N: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda"],
    Q: ["picareta-obamium", "picareta-rubi"],
    R: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante"],
    U: ["picareta-obamium", "picareta-rubi", "picareta-esmeralda", "picareta-diamante", "picareta-ouro", "picareta-ferro", "picareta-prata", "picareta-pedra"]
};

let pedraEmInteracao = null;

// Roda DEPOIS que todos os listeners de keydown (inclusive o de movimento) terminarem,
// assim a posição do jogador já está atualizada quando calculamos a proximidade.
document.addEventListener("keydown", (event) => {
    requestAnimationFrame(() => processar_pedra(event));
});

function processar_pedra(event) {
    const tecla = event.key.toLowerCase();
    
    // Ignora teclas que não afetam a interação com pedras
    if (!["w", "a", "s", "d", "e"].includes(tecla)) return;
    
    if (event.key == "w" || event.key == "s" || event.key == "d" || event.key == "a") {
        vida = 100;
    }

    const player = document.getElementById("boneco");
    if (!player) return;

    let pedraProxima = null;

    const player_left = Math.round(parseFloat(player.style.left) / 10) * 10;
    const player_top = Math.round(parseFloat(player.style.top) / 10) * 10;

    document.querySelectorAll(".pedra").forEach(item => {

        const entidade_left = Math.round(parseFloat(item.style.left) / 10) * 10;
        const entidade_top = Math.round(parseFloat(item.style.top) / 10) * 10;

        const perto =
            player_left + 20 >= entidade_left &&
            player_top >= entidade_top &&
            player_top <= entidade_top + 20 &&
            player_left <= entidade_left
            ||
            player_left >= entidade_left &&
            player_left <= entidade_left + 20 &&
            player_top >= entidade_top &&
            player_top <= entidade_top + 20
            ||
            player_top - 30 <= entidade_top &&
            player_left <= entidade_left + 13 &&
            player_left >= entidade_left - 13 &&
            player_top - 30 >= entidade_top;

        if (perto) {
            pedraProxima = item;
        }
    });

    if (pedraProxima !== pedraEmInteracao) {
        if (pedraEmInteracao) {
            atualizar_pedra(pedra.padrao, pedraEmInteracao.id);
        }

        if (pedraProxima) {
            atualizar_pedra(pedra.interacao, pedraProxima.id);
        }

        pedraEmInteracao = pedraProxima;
    }

    if (tecla === "e" && pedraProxima) {
        const minerioSelecionado = minerios.find(tipo =>
            pedraProxima.classList.contains(tipo)
        );

        press_E(
            "minerio",
            cores[minerioSelecionado],
            ferramentas[minerioSelecionado],
            pedraProxima.id,
            2
        );

        if (
            pedraEmInteracao &&
            !document.getElementById(pedraEmInteracao.id)
        ) {
            pedraEmInteracao = null;
        }

        if (vida == 0) {
            pedraEmInteracao = null;
        }
    }
}