import { receber_result, result, table2x2 } from "./table2x2.js"

const crafts_ordenados = new Map([
    ["0,0,madeira_bruta,madeira_bruta", ["madeira_bruta", 8]]
    ["madeira_bruta,madeira_bruta,0,0", ["madeira_bruta", 8]]
]);

const crafts_desordenados = {
    "madeira_bruta": ["madeira_bruta", 4]
};

export function realizar_receitas(espaco) {
    let receita = [];
    let quantidade = [];

    for (let i = 0; i < espaco.length; i++) {
        for (let j = 0; j < espaco[i].length; j++) {

            if (Array.isArray(table2x2[i][j])) {
                receita.push(table2x2[i][j][0]);
                quantidade.push(table2x2[i][j][1]);
            }

            if (table2x2[i][j] == 0) {
                receita.push(0);
            }
        }
    }

    const itensPresentes = receita.filter(item => item !== 0);
    let resultado = null;
    let multiplicador = 1;

    if (itensPresentes.length === 1) {
        resultado = crafts_desordenados[itensPresentes[0]] ?? null;

        if (resultado) {
            multiplicador = quantidade.reduce((soma, qtd) => soma + qtd, 0);
        }

    } else if (itensPresentes.length > 1) {
        resultado = crafts_ordenados.get(receita.join(",")) ?? null;

        if (resultado) {
            multiplicador = Math.min(...quantidade);
        }
    }

    if (resultado) {
        receber_result([
            resultado[0],
            resultado[1] * multiplicador
        ]);
    } else {
        receber_result(0);
    }
}