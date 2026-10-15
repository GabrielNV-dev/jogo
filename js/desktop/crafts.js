
import { receber_result, table2x2 } from "./table2x2.js";

const receitas = [
    {
        tipo: "formato",
        pattern: [
            ["madeira_refinada"],
            ["madeira_refinada"]
        ],
        resultado: ["graveto", 4]
    },

    {
        tipo: "formato",
        pattern: [
            ["carvao"],
            ["graveto"]
        ],
        resultado: ["tocha", 4]
    },

    {
        tipo: "formato",
        pattern: [
            [
                "madeira_refinada",
                "madeira_refinada",
                "madeira_refinada"
            ],
            [
                0,
                "graveto",
                0
            ],
            [
                0,
                "graveto",
                0
            ]
        ],
        resultado: ["picareta-madeira", 1]
    },  
    {
        tipo: "sem-formato",
        ingredientes: ["madeira_bruta"],
        resultado: ["madeira_refinada", 4]
    }
];

function itemDaCelula(celula) {
    if (Array.isArray(celula)) {
        return Number(celula[1]) > 0 ? celula[0] : 0;
    }

    return celula ?? 0;
}

function estaVazio(item) {
    return item === 0 ||
        item === null ||
        item === undefined ||
        item === "" ||
        item === "0";
}

function ingredienteAceita(ingrediente, item) {
    if (estaVazio(item)) return false;

    if (Array.isArray(ingrediente)) {
        return ingrediente.includes(item);
    }

    return ingrediente === item;
}

function obterLargura(grade) {
    return Math.max(0, ...grade.map(linha => linha.length));
}

function combinarFormato(grade, pattern, espelhado = false) {
    const alturaGrade = grade.length;
    const larguraGrade = obterLargura(grade);

    const alturaPattern = pattern.length;
    const larguraPattern = obterLargura(pattern);

    if (
        alturaPattern > alturaGrade ||
        larguraPattern > larguraGrade
    ) {
        return false;
    }

    for (
        let deslocY = 0;
        deslocY <= alturaGrade - alturaPattern;
        deslocY++
    ) {
        for (
            let deslocX = 0;
            deslocX <= larguraGrade - larguraPattern;
            deslocX++
        ) {
            let combinou = true;

            for (let y = 0; y < alturaGrade && combinou; y++) {
                for (let x = 0; x < larguraGrade; x++) {
                    const py = y - deslocY;
                    const px = x - deslocX;

                    let esperado = 0;

                    if (
                        py >= 0 &&
                        py < alturaPattern &&
                        px >= 0 &&
                        px < larguraPattern
                    ) {
                        const colunaPattern = espelhado
                            ? larguraPattern - 1 - px
                            : px;

                        esperado = pattern[py]?.[colunaPattern] ?? 0;
                    }

                    const atual = itemDaCelula(grade[y]?.[x]);

                    if (estaVazio(esperado)) {
                        if (!estaVazio(atual)) {
                            combinou = false;
                            break;
                        }
                    } else if (!ingredienteAceita(esperado, atual)) {
                        combinou = false;
                        break;
                    }
                }
            }

            if (combinou) {
                return true;
            }
        }
    }

    return false;
}

function combinarSemFormato(grade, ingredientes) {
    const itensPresentes = [];

    for (const linha of grade) {
        for (const celula of linha) {
            const item = itemDaCelula(celula);

            if (!estaVazio(item)) {
                itensPresentes.push(item);
            }
        }
    }

    if (itensPresentes.length !== ingredientes.length) {
        return false;
    }

    const listaIngredientes = [...ingredientes].sort(
        (a, b) =>
            (Array.isArray(a) ? a.length : 1) -
            (Array.isArray(b) ? b.length : 1)
    );

    const usados = new Set();

    function procurar(indice) {
        if (indice === listaIngredientes.length) {
            return true;
        }

        const ingrediente = listaIngredientes[indice];

        for (let i = 0; i < itensPresentes.length; i++) {
            if (usados.has(i)) continue;

            if (!ingredienteAceita(ingrediente, itensPresentes[i])) {
                continue;
            }

            usados.add(i);

            if (procurar(indice + 1)) {
                return true;
            }

            usados.delete(i);
        }

        return false;
    }

    return procurar(0);
}

function encontrarReceita(grade = table2x2) {
    for (const receita of receitas) {
        if (receita.tipo === "formato") {
            if (
                combinarFormato(grade, receita.pattern) ||
                combinarFormato(grade, receita.pattern, true)
            ) {
                return receita;
            }
        }

        if (receita.tipo === "sem-formato") {
            if (combinarSemFormato(grade, receita.ingredientes)) {
                return receita;
            }
        }
    }

    return null;
}

export function realizar_receitas(grade = table2x2) {
    const receita = encontrarReceita(grade);

    if (!receita) {
        receber_result(0);
        return null;
    }

    const saida = [...receita.resultado];

    receber_result(saida);

    return saida;
}

export function craftar(grade = table2x2) {
    const receita = encontrarReceita(grade);

    if (!receita) {
        return null;
    }

    const saida = [...receita.resultado];
    for (let i = 0; i < grade.length; i++) {
        for (let j = 0; j < grade[i].length; j++) {
            const celula = grade[i][j];
            const item = itemDaCelula(celula);

            if (estaVazio(item)) continue;

            if (Array.isArray(celula)) {
                const quantidade = Number(celula[1]);

                grade[i][j] = quantidade > 1
                    ? [celula[0], quantidade - 1]
                    : 0;
            } else {
                grade[i][j] = 0;
            }
        }
    }
    realizar_receitas(grade);
    return saida;
}
