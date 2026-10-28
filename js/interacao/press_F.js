import { mao, remover } from "../desktop/hotbar.js";
import { receber_item, espaco, atualizar_inv } from "../desktop/inventario.js";
import { atualizar_table3x3 } from "../desktop/table3x3.js";
import { minerio } from "../itens/sprs/spr_minerio.js";
import { fracasso, informar_vida, diminuir_vida, vida } from "../pedra/pedra.js";
import { consultar_fome, alimentar } from "../player/player.js";
import { machados_infos, picaretas_infos } from "../utils.js";

export var interacao = false;
let luzAtiva = false;
export function press_F(item) {



    if (item == "tocha") {
        console.log(luzAtiva)
        luzAtiva = !luzAtiva
        console.log(luzAtiva)
        const boneco = document.getElementById("boneco");
        const tempo = document.getElementById("tempo");

        tempo.style.display = "block";
        tempo.style.pointerEvents = "none";

        function atualizarLuz() {
            const rect = boneco.getBoundingClientRect();

            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            const gradiente = `radial-gradient(
        circle 150px at ${x}px ${y}px,
        transparent 0%,
        transparent 10%,
        black 100%
    )`;

            tempo.style.maskImage = gradiente;
            tempo.style.webkitMaskImage = gradiente;
        }
        if (luzAtiva) { atualizarLuz() }
        console.log(luzAtiva)
        document.addEventListener("keydown", (event) => {
            if (luzAtiva) { atualizarLuz() }
            else {
                tempo.style.maskImage = "none";
                tempo.style.webkitMaskImage = "none";
            }
        });
    }
    if (item == "carne-porco-crua") {
        if (consultar_fome() != 10) {
            alimentar(1)
            remover()
        }

    }
    if (item == "craft-table") {

        interacao = !interacao;

        document.getElementById("table3x3").style.display =
            interacao ? "grid" : "none";

        document.getElementById("table3x3-result").style.display =
            interacao ? "grid" : "none";

        atualizar_inv();
    }
}