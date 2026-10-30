import { boneco } from "./spr_player.js";
import { atualizar } from "../utils.js";
import { selecionar, atualizar_hotbar, mao } from "../desktop/hotbar.js";
import { press_F, interacao } from "../interacao/press_F.js"
const cores = {
    C: "cabelo",
    P: "pele",
    I: "olho",
    R: "roupa",
    K: "calca",
    A: "b-a",
    S: "b-s"
};

atualizar(boneco.frente[1], "boneco", cores)
let animacao = 0
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
let _fome = 10;
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

export function alimentar(nivel) {
    fome.valor += nivel
}
export function consultar_fome() {
    return fome.valor
}
let contador = 10
let gasto = 1000
async function gestor_fome() {
    setInterval(() => {

        if (contador == 0) {
            if (fome.valor == 0) { vida.valor -= 1 }
            else { fome.valor -= 1; }
            contador = 10
        }
        contador--
    }, gasto);
}
gestor_fome()

setInterval(() => {

    if (vida.valor == 0) {
        document.getElementById("boneco")?.remove();
        document.getElementById("morte").style.display = "flex"
    }
}, 1000);
document.getElementById("recomecar").addEventListener("click", () => {
    location.reload();
});

function porque() {
    atualizar(boneco.p, "boneco", cores)
    document.body.style.background = "rgb(73, 6, 6)"
    let m = document.createElement("img");
    m.src = "https://miro.medium.com/v2/resize:fit:720/format:webp/1*koUr4odA91ARVyQzpIQwjg.jpeg";

    document.body.appendChild(m);
}
let sequencia = []

document.addEventListener("keydown", (event) => {
    if (event.key === "e") { }
    else if (event.key == "f") { press_F(mao()) }
    else if (interacao) { }
    else {
        let bloqueado = 0
        const player = document.getElementById("boneco")
        
        let step = 10

        const player_left = Math.round(parseFloat(player.style.left) / 10) * 10;
        const player_top = Math.round(parseFloat(player.style.top) / 10) * 10;

        document.querySelectorAll(".objeto").forEach(entidade => {


            const entidade_left = Math.round(parseFloat(entidade.style.left) / 10) * 10;
            const entidade_top = Math.round(parseFloat(entidade.style.top) / 10) * 10;


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
        document.querySelectorAll(".entidade").forEach(entidade => {


            const entidade_left = Math.round(parseFloat(entidade.style.left) / 10) * 10;
            const entidade_top = Math.round(parseFloat(entidade.style.top) / 10) * 10;


            if (entidade.classList.contains("porco")) {
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
        });
        if (event.key >= 1 && event.key <= 8) {

            selecionar(event.key - 1)
            atualizar_hotbar()
        }

        if (event.key === "w") {
            if (parseInt(getComputedStyle(player).top) <= 0 || bloqueado == 30) { }
            else {
                player.style.top = (parseInt(getComputedStyle(player).top) - step) + "px";
                if (player.getBoundingClientRect().top <= window.innerHeight / 2) {
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
                if (player.getBoundingClientRect().top >= window.innerHeight / 2) {
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
                if (player.getBoundingClientRect().left <= window.innerWidth / 2) {
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
                if (player.getBoundingClientRect().left >= window.innerWidth / 2) {
                    window.scrollBy({
                        left: step,
                        behavior: "smooth"
                    });
                }
                atualizar(boneco.direita, "boneco", cores)
            }
        }

        sequencia.push(event.key)
        if (!['k', 'i', 'l'].includes(event.key) || sequencia.length > 4) { sequencia = [] }
        if (sequencia.join('') === 'kill') { porque() } else { document.body.style.backgroundColor = "rgba(9, 68, 1, 0.87)" }
    }
});
