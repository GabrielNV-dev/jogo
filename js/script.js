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
];
const itens = {
    0: "nada",
    1: "madeira"
}

arvores.forEach((posicao, index) => {
    criarArvore(arvore.padrao, posicao.x, posicao.y, `arvore-${index}`);
});

atualizar(boneco.frente[1], "boneco")

let animacao = 0
let vizu_inv = 0
let _vida = 10;

let vida = {
    get valor() {
        return _vida;
    },

    set valor(novoValor) {
        _vida = novoValor;
        document.getElementById("vida").textContent = "❤️".repeat(vida.valor);
    }
};

vida.valor = _vida;

let _fome = 5;

let fome = {
    get valor() {
        return _fome;
    },

    set valor(novoValor) {
        _fome = novoValor;
        document.getElementById("fome").textContent = "🥩".repeat(fome.valor);
    }
};

fome.valor = _fome;
let contador = 20
let gasto = 1000
async function gestor_fome() {
    setInterval(() => {
        console.log(contador)
        if (contador == 0) { fome.valor -= 1; contador = 20 }
        contador--
    }, gasto);
}
gestor_fome()
var inventario = Array.from({ length: 9 }, () =>
    Array.from({ length: 4 }, () => 0)
);

function atualizar_inv() {
    document.getElementById("inventario").innerHTML = ""
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {
            const div = document.createElement("div");
            div.classList.add("pixel-inv");

            if (itens[inventario[i][j]]) {
                div.classList.add(itens[inventario[i][j]]);
            }

            document.getElementById("inventario").appendChild(div);
        }
    }
}

document.addEventListener("keydown", (event) => {

    let bloqueado = 0
    const player = document.getElementById("boneco")
    var posicao = player.getBoundingClientRect();
    let step = 10
    event.preventDefault();
    if (event.key == "Tab") {
        if (vizu_inv == 0) {
            vizu_inv = 1

            atualizar_inv()
            document.getElementById("inventario").style.display = "grid"
        }
        else {
            document.getElementById("inventario").style.display = "none"
            vizu_inv = 0
        }
    }
    document.querySelectorAll(".objeto").forEach(entidade => {

        const rect2 = entidade.getBoundingClientRect();
        const distanciaX = rect2.left - posicao.right;
        const distanciaY = rect2.top - posicao.bottom;
        if (distanciaY <= -33 && distanciaY >= -53.5 && distanciaX <= -9.50 && distanciaX > -50 && event.key == "d") { bloqueado = 10 }
        if (distanciaY <= -33 && distanciaY >= -53.5 && distanciaX >= -50 && distanciaX < -10 && event.key == "a") { bloqueado = 20 }
        if (distanciaX <= -20 && distanciaX >= -40 && distanciaY >= -63 && distanciaY < -23 && event.key == "w") { bloqueado = 30 }
        if (distanciaX <= -20 && distanciaX >= -40 && distanciaY <= -23 && distanciaY > -63 && event.key == "s") { bloqueado = 40 }

    });
    if (event.key === "w") {
        if (parseInt(getComputedStyle(player).top) <= 0 || bloqueado == 30) { }
        else {
            player.style.top = (parseInt(getComputedStyle(player).top) - step) + "px";
            if (posicao.top <= window.innerHeight / 2) {
                window.scrollBy({
                    top: -step,
                    behavior: "smooth"
                });
            }
            atualizar(boneco.costas, "boneco")
        }
    }
    if (event.key === "s") {
        if (parseInt(getComputedStyle(player).top) <= -1000 || bloqueado == 40) { }
        else {
            player.style.top = (parseInt(getComputedStyle(player).top) + step) + "px";
            if (posicao.top >= window.innerHeight / 2) {
                window.scrollBy({
                    top: step,
                    behavior: "smooth"
                });
            }
            if (animacao == 0) {
                atualizar(boneco.frente[0], "boneco");
                animacao = 1
            }
            else {
                atualizar(boneco.frente[1], "boneco");
                animacao = 0
            }
        }
    }
    if (event.key === "a") {
        if (parseInt(getComputedStyle(player).left) <= 0 || bloqueado == 20) { }
        else {
            player.style.left = (parseInt(getComputedStyle(player).left) - step) + "px";
            atualizar(boneco.esquerda, "boneco");
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

