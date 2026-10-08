export const itens = {
    0: "nada",
    1: "madeira",
    2:"picareta-obamium", 
    3:"picareta-rubi", 
    4:"picareta-esmeralda", 
    5:"picareta-diamante", 
    6:"picareta-ouro", 
    7:"picareta-ferro", 
    9:"picareta-prata", 
    10:"picareta-pedra", 
    11:"picareta-madeira"
}
export const picaretas = {
    "picareta-obamium" : 45, 
    "picareta-rubi" : 40,
    "picareta-esmeralda" : 35,
    "picareta-diamante" : 30 ,
    "picareta-ouro" : 25,
    "picareta-ferro" : 20,
    "picareta-prata" : 15,
    "picareta-pedra" : 10,
    "picareta-madeira" : 5
}
export function atualizar(sprit, id, cores) {
    const elemento = document.getElementById(id);
    elemento.innerHTML = ""
    sprit.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");
            div.classList.add("pixel");

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });
}