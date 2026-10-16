import { pedra } from "../pedra/spr_pedra.js";
import { criarGrama } from "../grama/grama.js";
import { grama } from "../grama/spr_grama.js";
import { criarPedra } from "../pedra/pedra.js";
import { criarArvore } from "../arvore/arvore.js";
import { arvore } from "../arvore/spr_arvore.js";

const centroX = 1250;
const centroY = 900;
const raioProtegido = 250;

export function gerarMapa() {
    const larguraMapa = 2500;
    const alturaMapa = 1800;

    const qnt_arvore = Math.floor(Math.random() * 101) + 50;
    const qnt_pedra = 120;
    const qnt_grama = Math.floor(Math.random() * 101) + 200;

    const minerios = {
        pedra: Math.floor(qnt_pedra * 0.31),
        prata: Math.floor(qnt_pedra * 0.22),
        ferro: Math.floor(qnt_pedra * 0.17),
        ouro: Math.floor(qnt_pedra * 0.12),
        diamante: Math.floor(qnt_pedra * 0.08),
        esmeralda: Math.floor(qnt_pedra * 0.05),
        rubi: Math.floor(qnt_pedra * 0.03),
        obamium: Math.floor(qnt_pedra * 0.02)
    };

    // Distâncias mínimas entre os elementos
    const distancias = {
        arvore: 70,
        pedra: 45,
        grama: 30
    };

    // Registra todos os elementos já posicionados
    const elementos = [];

    function distanciaEntre(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    function posicaoValida(x, y, tipo) {
        const novaPosicao = { x, y, tipo };

        // Impede gerar elementos dentro do raio protegido
        const dx = x - centroX;
        const dy = y - centroY;

        if (Math.sqrt(dx * dx + dy * dy) < raioProtegido) {
            return false;
        }

        return elementos.every(elemento => {
            const distanciaMinima = Math.max(
                distancias[tipo],
                distancias[elemento.tipo]
            );

            return distanciaEntre(novaPosicao, elemento) >= distanciaMinima;
        });
    }
    function gerarPosicoes(tipo, quantidade, margemX, margemY) {
        const posicoes = [];
        const maxTentativas = 3000;

        for (let i = 0; i < quantidade; i++) {
            let posicaoValidaEncontrada = false;

            for (let tentativa = 0; tentativa < maxTentativas; tentativa++) {
                const x = Math.floor(
                    Math.random() * (larguraMapa - margemX * 2)
                ) + margemX;

                const y = Math.floor(
                    Math.random() * (alturaMapa - margemY * 2)
                ) + margemY;

                if (posicaoValida(x, y, tipo)) {
                    const posicao = { x, y, tipo };

                    posicoes.push(posicao);
                    elementos.push(posicao);

                    posicaoValidaEncontrada = true;
                    break;
                }
            }

            if (!posicaoValidaEncontrada) {
                console.warn(
                    `Não foi possível posicionar ${tipo} ${i + 1}.`
                );
            }
        }

        return posicoes;
    }

    // 1. Gerar árvores
    const arvores = gerarPosicoes(
        "arvore",
        qnt_arvore,
        50,
        50
    );

    arvores.forEach((posicao, index) => {
        criarArvore(
            arvore.padrao,
            posicao.x,
            posicao.y,
            `arvore-${index}`
        );
    });

    // 2. Gerar pedras e minérios
    const pedras = [];

    for (const [tipo, quantidade] of Object.entries(minerios)) {
        const novasPedras = gerarPosicoes(
            "pedra",
            quantidade,
            35,
            35
        );

        novasPedras.forEach(posicao => {
            pedras.push({
                x: posicao.x,
                y: posicao.y,
                tipo
            });
        });
    }

    pedras.forEach((posicao, index) => {
        criarPedra(
            pedra.padrao,
            posicao.x,
            posicao.y,
            `${posicao.tipo}-${index}`
        );
    });

    // 3. Gerar grama nos espaços restantes
    const gramas = gerarPosicoes(
        "grama",
        qnt_grama,
        20,
        20
    );

    gramas.forEach((posicao, index) => {
        criarGrama(
            grama.padrao,
            posicao.x,
            posicao.y,
            `grama-${index}`
        );
    });

    console.log(
        `Mapa gerado: ${arvores.length} árvores, ` +
        `${pedras.length} pedras/minérios e ${gramas.length} gramas.`
    );
}

gerarMapa();