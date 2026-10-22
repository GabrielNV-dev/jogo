
import { atualizar } from "../utils.js";
import { porco } from "./sprs/spr_porco.js";
import { press_E } from "../interacao/press_E.js";

const cores = {
    P: "porco-corpo",
    R: "porco-sombra",
    O: "porco-olho",
    B: "porco-sombra-preta",
    A: "porco-sombra-clara",
    F: "porco-sombra-cima"
};

export function criarPorco(sprit, x, y, id) {
    const elemento = document.createElement("div");

    elemento.classList.add("porco", "entidade");
    elemento.dataset.id = 100
    elemento.style.position = "absolute";
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

    return elemento;
}

const porcos = [{ x: 1250, y: 900 }, { x: 1250, y: 900 }]



function inteligenciaPorco(alvo) {
    let timerPorco;
    const porcoElemento = document.getElementById(alvo);

    const velocidade = 5;
    const intervalo = 200;

    let direcao = Math.floor(Math.random() * 4) + 1;
    let passosRestantes = Math.floor(Math.random() * 16) + 5;
    let pausa = 0;
    function escolherDirecao() {
        if (Math.random() < 0.4) {
            direcao = Math.floor(Math.random() * 4) + 1;
        } else {
            const opcoes = [1, 2, 3, 4].filter(d => d !== direcao);
            direcao = opcoes[Math.floor(Math.random() * opcoes.length)];
        }

        passosRestantes = Math.floor(Math.random() * 16) + 5;
    }

    document.addEventListener("keydown", event => {


        const player = document.getElementById("boneco");

        const x = parseFloat(porcoElemento.style.left);
        const y = parseFloat(porcoElemento.style.top);
        const ex = parseFloat(player.style.left);
        const ey = parseFloat(player.style.top);

        if ([x, y, ex, ey].some(Number.isNaN)) return;

        const perto =
            Math.abs(x - ex) < 20 &&
            Math.abs(y - ey) < 20;

        if (perto) {
            if (event.key.toLowerCase() == "e") {

                press_E(
                    "porco",
                    "carne-crua",
                    ["nada"],
                    alvo,
                    3,
                );
            }
            if (!document.getElementById(alvo) || Number(document.getElementById(alvo).dataset.id) <= 0) { clearInterval(timerPorco); return }
        }
    });


    timerPorco = setInterval(() => {
        if (!porcoElemento.isConnected) {
            clearInterval(timerPorco);
            return;
        }

        if (Number(porcoElemento.dataset.id) <= 0) {
            clearInterval(timerPorco);
            porcoElemento.remove();
            return;
        }

        // O porco fica parado durante a pausa.
        if (pausa > 0) {
            pausa--;
            return;
        }

        // Quando termina de caminhar, descansa e decide o próximo trajeto.
        if (passosRestantes <= 0) {
            pausa = Math.floor(Math.random() * 8) + 3;
            escolherDirecao();
            return;
        }

        const x = parseFloat(porcoElemento.style.left);
        const y = parseFloat(porcoElemento.style.top);

        let novoX = x;
        let novoY = y;

        switch (direcao) {
            case 1: novoX -= velocidade; break; // esquerda
            case 2: novoX += velocidade; break; // direita
            case 3: novoY -= velocidade; break; // cima
            case 4: novoY += velocidade; break;
        }

        let bloqueado = false;

        document.querySelectorAll(".objeto").forEach(entidade => {
            if (
                !entidade.classList.contains("arvore") &&
                !entidade.classList.contains("pedra")
            ) return;

            const ex = parseFloat(entidade.style.left);
            const ey = parseFloat(entidade.style.top);

            if (Number.isNaN(ex) || Number.isNaN(ey)) return;

            const largura = 10;
            const altura = 10;

            const colidiu =
                novoX < ex - 5 + largura &&
                novoX + 10 > ex &&
                novoY < ey - 5 + altura &&
                novoY + 10 > ey;

            if (colidiu) bloqueado = true;
        });


        porcoElemento.style.left = `${novoX}px`;
        porcoElemento.style.top = `${novoY}px`;

        if (direcao === 1) {
            atualizar(porco.esquerda, alvo, cores);
        } else if (direcao === 2) {
            atualizar(porco.direita, alvo, cores);
        } else if (direcao === 3) {
            atualizar(porco.costas, alvo, cores);
        } else if (direcao === 4) {
            atualizar(porco.frente, alvo, cores);
        }

        passosRestantes--;
    }, intervalo);
}



porcos.forEach((posicao, index) => {
    criarPorco(porco.frente, posicao.x, posicao.y, `porco-${index}`);
    inteligenciaPorco(`porco-${index}`)
});



