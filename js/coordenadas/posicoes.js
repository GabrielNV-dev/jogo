import { } from "../grama/grama.js";
import { } from "../arvore/arvore.js";
import { } from "../pedra/pedra.js";
import { pedra } from "../pedra/spr_pedra.js";
import { criarGrama } from "../grama/grama.js";
import { grama } from "../grama/spr_grama.js";

export function gerarMapa() {
    const qnt_arvore = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
    const qnt_pedra = Math.floor(Math.random() * (100 - 200 + 1)) + 200;
    const qnt_grama = Math.floor(Math.random() * (200 - 300 + 1)) + 300;
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
        const x = Math.floor(Math.random() * (larguraMapa - 25)) + 25;
        const y = Math.floor(Math.random() * (alturaMapa - 20)) + 20;

        gramas.push({ x, y });
    }

    console.log(gramas)
    gramas.forEach((posicao, index) => {
        criarGrama(grama.padrao, posicao.x, posicao.y, `grama-${index}`);
    });
    var arvores = [
        { x: 140, y: 100 },
        { x: 100, y: 100 },
        { x: 100, y: 60 }]

    var pedras = [

        { x: 10, y: 100 },
        { x: 50, y: 100 },
        { x: 50, y: 120 },]
}
gerarMapa()