import { mao } from "../desktop/hotbar.js"
import { receber_item, espaco } from "../desktop/inventario.js"
import { fracasso, informar_vida, diminuir_vida, vida } from "../pedra/pedra.js"
import { machados_infos, picaretas_infos } from "../utils.js"

export function press_E(tipo, drop, ferramentas, identificacao, quantidade) {

    if (tipo === "minerio") {
        if (ferramentas.includes(mao()) && espaco()) {
            console.log(picaretas_infos[mao()])
            diminuir_vida(picaretas_infos[mao()])
            informar_vida(identificacao, vida)

            if (vida <= 0) {
                receber_item(drop, quantidade)
                document.getElementById(identificacao).remove()
            }
        } else {
            fracasso(identificacao)
        }
    }
    else if (tipo == "arvore") {
        if (espaco()) {
            console.log(machados_infos[mao()])
            if (ferramentas.includes(mao())) { diminuir_vida(machados_infos[mao()]) }
            else {diminuir_vida(2)}

            informar_vida(identificacao, vida)

            if (vida <= 0) {
                receber_item(drop, quantidade)
                document.getElementById(identificacao).remove()
            }
        } else {
            fracasso(identificacao)
        }
    }
}
