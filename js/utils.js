export const itens = [
    "nada",
    "craft-table",
    "madeira_bruta",
    "madeira_refinada",
    "pedra-m",
    "pao",
    "graveto",
    "picareta-obamium",
    "picareta-rubi",
    "picareta-esmeralda",
    "picareta-diamante",
    "picareta-ouro",
    "picareta-ferro",
    "picareta-prata",
    "picareta-pedra",
    "picareta-madeira",
    "ferro",
    "ouro",
    "carvao",
    "rubi",
    "obamium",
    "esmeralda",
    "diamante",
    "prata",
    "vermelho-efeito",
]
export const picaretas_infos = {
    "picareta-obamium": 45,
    "picareta-rubi": 40,
    "picareta-esmeralda": 35,
    "picareta-diamante": 30,
    "picareta-ouro": 25,
    "picareta-ferro": 20,
    "picareta-prata": 15,
    "picareta-pedra": 10,
    "picareta-madeira": 5
}
export const machados_infos = {
    "machado-obamium": 45,
    "machado-rubi": 40,
    "machado-esmeralda": 35,
    "machado-diamante": 30,
    "machado-ouro": 25,
    "machado-ferro": 20,
    "machado-prata": 15,
    "machado-pedra": 10,
    "machado-madeira": 5
}

export function atualizar(sprit, id, cores, pixel_tipo = "pixel") {
    const elemento = document.getElementById(id);
    elemento.innerHTML = ""
    sprit.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");
            div.classList.add(pixel_tipo);

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });
}