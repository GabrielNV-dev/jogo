import { mao } from "../desktop/hotbar.js";
import { receber_item, espaco, atualizar_inv } from "../desktop/inventario.js";
import { atualizar_table3x3 } from "../desktop/table3x3.js";
import { minerio } from "../itens/sprs/spr_minerio.js";
import { fracasso, informar_vida, diminuir_vida, vida } from "../pedra/pedra.js";
import { machados_infos, picaretas_infos } from "../utils.js";

export var interacao = false;

export function press_F(item) {
    if (item !== "craft-table") return;

    interacao = !interacao;

    document.getElementById("table3x3").style.display =
        interacao ? "grid" : "none";

    document.getElementById("table3x3-result").style.display =
        interacao ? "grid" : "none";

    atualizar_inv();
}