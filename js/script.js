import { boneco, arvore } from "./sprits.js";

let cameraX = 0;
let cameraY = 0;
const cores = {
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


function atualizar(sprit, id) {
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

function criarArvore(sprit, x, y, id) {
    const elemento = document.createElement("div");

    elemento.classList.add("arvore");
    elemento.classList.add("objeto");

    elemento.style.left = `${x}px`;
    elemento.style.top = `${y}px`;
    elemento.id = id;
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

    document.body.appendChild(elemento);
}

const arvores = [
    { x: 100, y: 200 },
    { x: 1000, y: 1450 },
    { x: 700, y: 250 },
    { x: 500, y: 400 },
    {}
];

arvores.forEach((posicao, index) => {
    criarArvore(arvore.padrao, posicao.x, posicao.y, `arvore-${index}`);
});

atualizar(boneco.frente, "boneco")

document.addEventListener("keydown", (event) => {

    let bloqueado = 0
    const player = document.getElementById("boneco")
    var posicao = player.getBoundingClientRect();
    let step = 10

    document.querySelectorAll(".objeto").forEach(entidade => {

        const rect2 = entidade.getBoundingClientRect();
        const distanciaX = rect2.left - posicao.right;
        const distanciaY = rect2.top - posicao.bottom;
        console.log(distanciaY)
        if (distanciaX <= -10 && (distanciaY <= -33 && distanciaY >= -53.5)){bloqueado = 10}
    });
    if (event.key === "w") {
        if (parseInt(getComputedStyle(player).top) <= 0) { }
        else {
            player.style.top = (parseInt(getComputedStyle(player).top) - step) + "px";
            if (posicao.top <= window.innerHeight / 2) {
                window.scrollBy({
                    top: -50,
                    behavior: "smooth"
                });
            }
            atualizar(boneco.costas, "boneco")
        }
    }
    if (event.key === "s") {
        if (parseInt(getComputedStyle(player).top) <= -1000) { }
        else {
            player.style.top = (parseInt(getComputedStyle(player).top) + step) + "px";
            if (posicao.top >= window.innerHeight / 2) {
                window.scrollBy({
                    top: 50,
                    behavior: "smooth"
                });
            }
            atualizar(boneco.frente, "boneco")
        }
    }
    if (event.key === "a") {
        if (parseInt(getComputedStyle(player).left) <= 0) { }
        else {
            player.style.left = (parseInt(getComputedStyle(player).left) - step) + "px";
            atualizar(boneco.esquerda, "boneco")
        }
    }
    if (event.key === "d") {
        if (parseInt(getComputedStyle(player).left) < 0 || bloqueado == 10) { }
        else {
            player.style.left = (parseInt(getComputedStyle(player).left) + step) + "px";
            atualizar(boneco.direita, "boneco")
        }
    }

    posicao = player.getBoundingClientRect();

    document.querySelectorAll(".arvore").forEach(item2 => {
        const rect2 = item2.getBoundingClientRect();

        const distanciaX = rect2.left - posicao.right;
        const distanciaY = rect2.top - posicao.bottom;
        if (
            distanciaX <= -10 &&
            distanciaX >= -50 &&
            distanciaY >= -65.5 &&
            distanciaY <= -25.5
        ) {
            atualizar(arvore.interacao, item2.id)
        } else {
            atualizar(arvore.padrao, item2.id)
        }
    })
});

