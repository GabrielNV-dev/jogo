export const itens = [
    "nada",
    "madeira",
    "pedra-m",
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