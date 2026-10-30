
import { atualizar } from "../utils.js";
import { referencia, nada } from "../itens/center.js";

export var table3x3 = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => 0)
);

export var result = 0;

export function receber_result(item) {
    result = item;
}

export function atualizar_table3x3(configurarClique) {
    const tabela = document.getElementById("table3x3");
    const resultado = document.getElementById("table3x3-result");

    tabela.innerHTML = "";
    resultado.innerHTML = "";

    // Slot de resultado
    const divResult = document.createElement("div");
    divResult.id = "table3x3-result-00";
    divResult.classList.add("item-inv");

    resultado.appendChild(divResult);

    if (configurarClique) {
        configurarClique(divResult, "result3x3", 0, 0);
    }

    if (Array.isArray(result)) {
        atualizar(
            referencia[result[0]].padrao,
            divResult.id,
            referencia[result[0]].cores,
            "pixel-inv"
        );

        const quantidade = document.createElement("span");
        quantidade.classList.add("quantidade-item");
        quantidade.textContent = result[1];

        divResult.appendChild(quantidade);
    } else {
        atualizar(nada.padrao, divResult.id, { N: "nada" }, "pixel-inv");
    }

    // Slots da mesa 3x3
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const div = document.createElement("div");
            div.id = `table3x3-${i}${j}`;
            div.classList.add("item-inv");

            tabela.appendChild(div);

            if (configurarClique) {
                configurarClique(div, "craft3x3", i, j);
            }

            if (Array.isArray(table3x3[i][j])) {
                atualizar(
                    referencia[table3x3[i][j][0]].padrao,
                    div.id,
                    referencia[table3x3[i][j][0]].cores,
                    "pixel-inv"
                );

                const quantidade = document.createElement("span");
                quantidade.classList.add("quantidade-item");
                quantidade.textContent = table3x3[i][j][1];

                div.appendChild(quantidade);
            } else {
                atualizar(
                    nada.padrao,
                    div.id,
                    { N: "nada" },
                    "pixel-inv"
                );
            }
        }
    }
}
