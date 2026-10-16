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
    if (event.key === "e") { } else {
        let bloqueado = 0
        const player = document.getElementById("boneco")
        var posicao = player.getBoundingClientRect();
        let step = 10

        const player_left = Math.round(parseFloat(player.style.left) / 10) * 10;
        const player_top = Math.round(parseFloat(player.style.top) / 10) * 10;

        document.querySelectorAll(".objeto").forEach(entidade => {

            const rect2 = entidade.getBoundingClientRect();

            const entidade_left = Math.round(parseFloat(entidade.style.left) / 10) * 10;
            const entidade_top = Math.round(parseFloat(entidade.style.top) / 10) * 10;

            const distanciaX = rect2.left - posicao.right;
            const distanciaY = rect2.top - posicao.bottom;

            if (entidade.classList.contains("arvore")) {
                if (player_left + 20 >= entidade_left && player_top >= entidade_top && player_top <= entidade_top + 20 && player_left <= entidade_left && event.key == "d") { bloqueado = 10 }

                if (player_left >= entidade_left &&
                    player_left <= entidade_left + 20 &&
                    player_top >= entidade_top &&
                    player_top <= entidade_top + 20 &&
                    event.key == "a") {
                    bloqueado = 20;
                }

                if (player_top - 30 <= entidade_top &&
                    player_left <= entidade_left + 13 &&
                    player_left >= entidade_left - 13 &&
                    player_top - 30 >= entidade_top &&
                    event.key == "w") {
                    bloqueado = 30;
                }

                if (player_top + 10 >= entidade_top &&
                    player_left <= entidade_left + 13 &&
                    player_left >= entidade_left - 13 &&
                    player_top <= entidade_top &&
                    event.key == "s") {
                    bloqueado = 40;
                }
            }
            if (entidade.classList.contains("pedra")) {
                if (player_left + 20 >= entidade_left && 
                    player_top >= entidade_top && 
                    player_top <= entidade_top + 20 && 
                    player_left <= entidade_left && 
                    event.key == "d") { 
                        bloqueado = 10 
                    }

                if (player_left >= entidade_left &&
                    player_left <= entidade_left + 20 &&
                    player_top >= entidade_top &&
                    player_top <= entidade_top + 20 &&
                    event.key == "a") {
                    bloqueado = 20;
                }

                if (player_top - 30 <= entidade_top &&
                    player_left <= entidade_left + 13 &&
                    player_left >= entidade_left - 13 &&
                    player_top - 30 >= entidade_top &&
                    event.key == "w") {
                    bloqueado = 30;
                }

                if (player_top + 10 >= entidade_top &&
                    player_left <= entidade_left + 13 &&
                    player_left >= entidade_left - 13 &&
                    player_top <= entidade_top &&
                    event.key == "s") {
                    bloqueado = 40;
                }
            }
        });

        if (event.key >= 1 && event.key <= 8) {

            selecionar(event.key - 1)
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
    }
});
