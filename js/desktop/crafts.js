import { receber_result } from "./table2x2.js";
import { receber_result as receber_result3x3 } from "./table3x3.js";

const receitas = [
    // ESPADA DE MADEIRA
    {
        tipo: "formato",
        pattern: [
            [0, "madeira_refinada", 0],
            [0, "madeira_refinada", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-madeira", 1]
    },

    // ESPADA DE PEDRA
    {
        tipo: "formato",
        pattern: [
            [0, "pedra-m", 0],
            [0, "pedra-m", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-pedra", 1]
    },

    // ESPADA DE PRATA
    {
        tipo: "formato",
        pattern: [
            [0, "prata", 0],
            [0, "prata", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-prata", 1]
    },

    // ESPADA DE FERRO
    {
        tipo: "formato",
        pattern: [
            [0, "ferro", 0],
            [0, "ferro", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-ferro", 1]
    },

    // ESPADA DE OURO
    {
        tipo: "formato",
        pattern: [
            [0, "ouro", 0],
            [0, "ouro", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-ouro", 1]
    },

    // ESPADA DE DIAMANTE
    {
        tipo: "formato",
        pattern: [
            [0, "diamante", 0],
            [0, "diamante", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-diamante", 1]
    },

    // ESPADA DE ESMERALDA
    {
        tipo: "formato",
        pattern: [
            [0, "esmeralda", 0],
            [0, "esmeralda", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-esmeralda", 1]
    },

    // ESPADA DE RUBI
    {
        tipo: "formato",
        pattern: [
            [0, "rubi", 0],
            [0, "rubi", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-rubi", 1]
    },

    // ESPADA DE OBAMIUM
    {
        tipo: "formato",
        pattern: [
            [0, "obamium", 0],
            [0, "obamium", 0],
            [0, "graveto", 0]
        ],
        resultado: ["espada-obamium", 1]
    },

    // PICARETA DE MADEIRA
    {
        tipo: "formato",
        pattern: [
            ["madeira_refinada", "madeira_refinada", "madeira_refinada"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-madeira", 1]
    },

    // PICARETA DE PEDRA
    {
        tipo: "formato",
        pattern: [
            ["pedra-m", "pedra-m", "pedra-m"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-pedra", 1]
    },

    // PICARETA DE PRATA
    {
        tipo: "formato",
        pattern: [
            ["prata", "prata", "prata"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-prata", 1]
    },

    // PICARETA DE FERRO
    {
        tipo: "formato",
        pattern: [
            ["ferro", "ferro", "ferro"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-ferro", 1]
    },

    // PICARETA DE OURO
    {
        tipo: "formato",
        pattern: [
            ["ouro", "ouro", "ouro"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-ouro", 1]
    },

    // PICARETA DE DIAMANTE
    {
        tipo: "formato",
        pattern: [
            ["diamante", "diamante", "diamante"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-diamante", 1]
    },

    // PICARETA DE ESMERALDA
    {
        tipo: "formato",
        pattern: [
            ["esmeralda", "esmeralda", "esmeralda"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-esmeralda", 1]
    },

    // PICARETA DE RUBI
    {
        tipo: "formato",
        pattern: [
            ["rubi", "rubi", "rubi"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-rubi", 1]
    },

    // PICARETA DE OBAMIUM
    {
        tipo: "formato",
        pattern: [
            ["obamium", "obamium", "obamium"],
            [0, "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["picareta-obamium", 1]
    },

    // MACHADO DE MADEIRA
    {
        tipo: "formato",
        pattern: [
            ["madeira_refinada", "madeira_refinada", 0],
            ["madeira_refinada", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-madeira", 1]
    },

    // MACHADO DE PEDRA
    {
        tipo: "formato",
        pattern: [
            ["pedra-m", "pedra-m", 0],
            ["pedra-m", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-pedra", 1]
    },

    // MACHADO DE PRATA
    {
        tipo: "formato",
        pattern: [
            ["prata", "prata,0"],
            ["prata", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-prata", 1]
    },

    // MACHADO DE FERRO
    {
        tipo: "formato",
        pattern: [
            ["ferro", "ferro", 0],
            ["ferro", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-ferro", 1]
    },

    // MACHADO DE OURO
    {
        tipo: "formato",
        pattern: [
            ["ouro", "ouro", 0],
            ["ouro", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-ouro", 1]
    },

    // MACHADO DE DIAMANTE
    {
        tipo: "formato",
        pattern: [
            ["diamante", "diamante", 0],
            ["diamante", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-diamante", 1]
    },

    // MACHADO DE ESMERALDA
    {
        tipo: "formato",
        pattern: [
            ["esmeralda", "esmeralda", 0],
            ["esmeralda", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-esmeralda", 1]
    },

    // MACHADO DE RUBI
    {
        tipo: "formato",
        pattern: [
            ["rubi", "rubi", 0],
            ["rubi", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-rubi", 1]
    },

    // MACHADO DE OBAMIUM
    {
        tipo: "formato",
        pattern: [
            ["obamium", "obamium", 0],
            ["obamium", "graveto", 0],
            [0, "graveto", 0]
        ],
        resultado: ["machado-obamium", 1]
    },

    // GRAVETO
    {
        tipo: "formato",
        pattern: [
            ["madeira_refinada"],
            ["madeira_refinada"]
        ],
        resultado: ["graveto", 4]
    },
    // craft-table
    {
        tipo: "formato",
        pattern: [
            ["madeira_refinada", "madeira_refinada"],
            ["madeira_refinada", "madeira_refinada"]
        ],
        resultado: ["craft-table", 1]
    },
    // MADEIRA BRUTA -> MADEIRA REFINADA
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

function atualizarResultado(grade, item) {
    if (grade.length === 3) {
        receber_result3x3(item);
    } else {
        receber_result(item);
    }
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

    // A receita precisa ter pelo menos uma unidade
    // de cada ingrediente exigido.
    if (itensPresentes.length === 0) {
        return false;
    }

    // Para receitas de um ingrediente, aceita várias unidades
    // do mesmo item, inclusive distribuídas em vários slots.
    if (ingredientes.length === 1) {
        return itensPresentes.every(item =>
            ingredienteAceita(ingredientes[0], item)
        );
    }

    if (itensPresentes.length !== ingredientes.length) {
        return false;
    }

    const usados = new Set();

    function procurar(indice) {
        if (indice === ingredientes.length) {
            return true;
        }

        for (let i = 0; i < itensPresentes.length; i++) {
            if (usados.has(i)) continue;

            if (!ingredienteAceita(ingredientes[indice], itensPresentes[i])) {
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
        atualizarResultado(grade, 0);
        return null;
    }

    const saida = [...receita.resultado];

    if (receita.tipo === "sem-formato") {
        const ingrediente = receita.ingredientes[0];
        let total = 0;

        for (const linha of grade) {
            for (const celula of linha) {
                if (itemDaCelula(celula) === ingrediente) {
                    total += Array.isArray(celula)
                        ? Number(celula[1])
                        : 1;
                }
            }
        }

        saida[1] *= total;
    }

    atualizarResultado(grade, saida);

    return saida;
}



export function craftar(grade = table2x2) {
    const receita = encontrarReceita(grade);

    if (!receita) {
        return null;
    }

    const saida = [...receita.resultado];

    if (receita.tipo === "sem-formato") {
        const ingrediente = receita.ingredientes[0];

        // Soma todas as unidades disponíveis do ingrediente.
        let total = 0;

        for (const linha of grade) {
            for (const celula of linha) {
                if (itemDaCelula(celula) === ingrediente) {
                    total += Array.isArray(celula)
                        ? Number(celula[1])
                        : 1;
                }
            }
        }

        if (total === 0) {
            return null;
        }

        // Cada unidade produz a quantidade definida na receita.
        saida[1] *= total;

        // Consome todos os ingredientes utilizados.
        for (let i = 0; i < grade.length; i++) {
            for (let j = 0; j < grade[i].length; j++) {
                const celula = grade[i][j];

                if (itemDaCelula(celula) !== ingrediente) {
                    continue;
                }

                grade[i][j] = 0;
            }
        }

        realizar_receitas(grade);
        return saida;
    }

    // Receitas com formato: consome uma unidade de cada slot.
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
