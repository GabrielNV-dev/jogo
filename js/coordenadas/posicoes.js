import { } from "../grama/grama.js";
import { } from "../arvore/arvore.js";
import { } from "../pedra/pedra.js";
import { pedra } from "../pedra/spr_pedra.js";

export function gerarMapa() {
    const qnt_arvore = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
    const qnt_pedra = Math.floor(Math.random() * (100 - 200 + 1)) + 200;
    const qnt_grama = Math.floor(Math.random() * (200 - 300 + 1)) + 300;
    pedra 13
prata 12
ferro 12
ouro 12
diamante 12
esmeralda 12
rubi 12
obamium 11
    const nivel_pedra = [pedra]
    console.log(" arvore: " + qnt_arvore + " pedra: " + qnt_pedra + " grama: " + qnt_grama)

    1800
    2500

    const gramas = [
        { x: 25, y: 50 },
        { x: 50, y: 50 },
        { x: 50, y: 30 }];

    const arvores = [
        { x: 140, y: 100 },
        { x: 100, y: 100 },
        { x: 100, y: 60 }]

    const pedras = [

        { x: 10, y: 100 },
        { x: 50, y: 100 },
        { x: 50, y: 120 },]
}
gerarMapa()