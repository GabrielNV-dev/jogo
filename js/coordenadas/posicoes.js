
import { } from "../grama/grama.js";
import { } from "../arvore/arvore.js";
import { } from "../pedra/pedra.js";
import { pedra } from "../pedra/spr_pedra.js";
import { criarGrama } from "../grama/grama.js";
import { grama } from "../grama/spr_grama.js";

import { criarArvore } from "../arvore/arvore.js";
import { arvore } from "../arvore/spr_arvore.js";

export function gerarMapa() {
    const qnt_arvore = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
    const qnt_pedra = Math.floor(Math.random() * (200 - 100 + 1)) + 200;
    const qnt_grama = Math.floor(Math.random() * (300 - 200 + 1)) + 300;
    const minerios = {
        "pedra": Math.floor(qnt_pedra * 0.3),
        "prata": Math.floor(qnt_pedra * 0.22),
        "ferro": Math.floor(qnt_pedra * 0.17),
        "ouro": Math.floor(qnt_pedra * 0.12),
        "diamante": Math.floor(qnt_pedra * 0.08),
        "esmeralda": Math.floor(qnt_pedra * 0.05),
        "rubi": Math.floor(qnt_pedra * 0.03),
        "obamium": Math.floor(qnt_pedra * 0.02),
    };
    console.log(minerios)

    const nivel_pedra = [pedra]
    console.log(" arvore: " + qnt_arvore + " pedra: " + qnt_pedra + " grama: " + qnt_grama)

    1800
    2500

    var gramas = [];

    const larguraMapa = 2500;
    const alturaMapa = 1800;

    const gramasPorLinha = Math.floor(larguraMapa / 25);

    for (let i = 0; i < qnt_grama; i++) {
        const x = Math.floor(Math.random() * (larguraMapa - 50)) + 25;
        const y = Math.floor(Math.random() * (alturaMapa - 40)) + 20;

        gramas.push({ x, y });
    }
    gramas.forEach((posicao, index) => {
        criarGrama(grama.padrao, posicao.x, posicao.y, `grama-${index}`);
    });


    var arvores = [{ x: 532, y: 234 }]
    const distanciaMinX = 40;
    const distanciaMinY = 30;

    for (let i = 0; i < qnt_arvore; i++) {
        let x, y;
        let posicaoValida = false;
        let tentativas = 0;
        const maxTentativas = 1000;

        while (!posicaoValida && tentativas < maxTentativas) {
            x = Math.floor(Math.random() * (larguraMapa - 80)) + 40;
            y = Math.floor(Math.random() * (alturaMapa - 30)) + 30;

            posicaoValida = arvores.every(arvoreExistente => {
                const distanciaX = Math.abs(x - arvoreExistente.x);
                const distanciaY = Math.abs(y - arvoreExistente.y);

                return distanciaX >= distanciaMinX ||
                    distanciaY >= distanciaMinY;
            });

            tentativas++;
        }

        if (posicaoValida) {
            //arvores.push({ x, y });
        } else {
            console.warn(`Não foi possível posicionar a árvore ${i}.`);
        }
    }

    arvores.forEach((posicao, index) => {
        criarArvore(
            arvore.padrao,
            posicao.x,
            posicao.y,
            `arvore-${index}`
        );
    });

    var pedras = [

        { x: 10, y: 100 },
        { x: 50, y: 100 },
        { x: 50, y: 120 },]
}
gerarMapa()