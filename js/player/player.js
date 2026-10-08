import { boneco } from "./spr_player.js";
import { itens, atualizar } from "../utils.js";
import { selecionar, atualizar_hotbar } from "../desktop/hotbar.js";

const cores = {
    C: "cabelo",
    P: "pele",
    I: "olho",
    R: "roupa",
    K: "calca",

};

atualizar(boneco.frente[1], "boneco", cores)
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


let contador = 5
let gasto = 1000
async function gestor_fome() {
    setInterval(() => {

        if (contador == 0) {
            if (fome.valor == 0) { vida.valor -= 1 }
            else { fome.valor -= 1; }
            contador = 5
        }
        contador--
    }, gasto);
}


document.addEventListener("keydown", (event) => {

    let bloqueado = 0
    const player = document.getElementById("boneco")
    var posicao = player.getBoundingClientRect();
    let step = 10
    event.preventDefault();

    document.querySelectorAll(".objeto").forEach(entidade => {

        const rect2 = entidade.getBoundingClientRect();
        const distanciaX = rect2.left - posicao.right;
        const distanciaY = rect2.top - posicao.bottom;




        if (entidade.classList.contains("arvore")) {
            if (distanciaY <= -33 && distanciaY >= -53.5 && distanciaX <= -9.50 && distanciaX > -50 && event.key == "d") { bloqueado = 10 }
            if (distanciaY <= -33 && distanciaY >= -53.5 && distanciaX >= -50 && distanciaX < -10 && event.key == "a") { bloqueado = 20 }
            if (distanciaX <= -19.1 && distanciaX >= -40 && distanciaY >= -63 && distanciaY < -23 && event.key == "w") { bloqueado = 30 }
            if (distanciaX <= -19.1 && distanciaX >= -40 && distanciaY <= -22.3 && distanciaY > -63 && event.key == "s") { bloqueado = 40 }
        }
        if (entidade.classList.contains("pedra")) {
            if (distanciaY <= -33 && distanciaY >= -33.5 && distanciaX <= -9.50 && distanciaX > -50 && event.key == "d") { bloqueado = 10 }
            if (distanciaY <= -33 && distanciaY >= -33.5 && distanciaX >= -50 && distanciaX < -10 && event.key == "a") { bloqueado = 20 }
            if (distanciaX <= -19.1 && distanciaX >= -40 && distanciaY >= -43 && distanciaY < -23 && event.key == "w") { bloqueado = 30 }
            if (distanciaX <= -19.1 && distanciaX >= -40 && distanciaY <= -22.3 && distanciaY > -43 && event.key == "s") { bloqueado = 40 }
        }
    });

    if (event.key >= 1 && event.key <= 8) {

        selecionar(event.key-1 )
        atualizar_hotbar()
    }

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
            atualizar(boneco.costas, "boneco", cores)
        }
    }

    if (event.key === "s") {
        if (parseInt(getComputedStyle(player).top) >= 1800 || bloqueado == 40) { }
        else {
            player.style.top = (parseInt(getComputedStyle(player).top) + step) + "px";
            if (posicao.top >= window.innerHeight / 2) {
                window.scrollBy({
                    top: step,
                    behavior: "smooth"
                });
            }
            if (animacao == 0) {
                atualizar(boneco.frente[0], "boneco", cores);
                animacao = 1
            }
            else {
                atualizar(boneco.frente[1], "boneco", cores);
                animacao = 0
            }
        }
    }
    if (event.key === "a") {
        if (parseInt(getComputedStyle(player).left) <= 0 || bloqueado == 20) { }
        else {
            player.style.left = (parseInt(getComputedStyle(player).left) - step) + "px";
            if (posicao.left <= window.innerWidth / 2) {
                window.scrollBy({
                    left: -step,
                    behavior: "smooth"
                });
            }
            atualizar(boneco.esquerda, "boneco", cores);
        }
    }
    if (event.key === "d") {
        if (parseInt(getComputedStyle(player).left) >= 2500 || bloqueado == 10) { }
        else {
            player.style.left = (parseInt(getComputedStyle(player).left) + step) + "px";
            if (posicao.left >= window.innerWidth / 2) {
                window.scrollBy({
                    left: step,
                    behavior: "smooth"
                });
            }
            atualizar(boneco.direita, "boneco", cores)
        }
    }
});
