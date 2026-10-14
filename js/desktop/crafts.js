import { receber_result, result, table2x2 } from "./table2x2.js"

const crafts_ordenados = new Map([
    ["madeira_bruta,0,madeira_bruta,0", ["madeira_bruta", 4]]
]);

const crafts_desordenados = {
    "madeira_bruta": ["madeira_bruta", 4]
}

export function realizar_receitas(espaco) {
    let receita = []
    for (let i = 0; i < espaco.length; i++) {
        for (let j = 0; j < espaco[i].length; j++) {

            if (Array.isArray(table2x2[i][j])) {
                receita.push(table2x2[i][j][0])
            }
            if (table2x2[i][j] == 0) {
                receita.push(0)
            }
        }
    }
    const itensPresentes = receita.filter(item => item !== 0);
    let resultado = null;

    if (itensPresentes.length === 1) {
        resultado = crafts_desordenados[itensPresentes[0]] ?? null;
    } else if (itensPresentes.length > 1) {
        resultado = crafts_ordenados.get(receita.join(",")) ?? null;
    }

    if (resultado) {
        receber_result([...resultado]);
    } else {
        receber_result(0);
    }
}