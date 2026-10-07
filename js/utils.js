export const cores = {
    C: "cabelo",
    P: "pele",
    I: "olho",
    R: "roupa",
    K: "calca",
    F: "folhac",
    O: "folhas",
    T: "tronco",
    B: "branco"
};
export const itens = {
    0: "nada",
    1: "madeira"
}

export function atualizar(sprit, id) {
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