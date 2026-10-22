import { mao } from "../desktop/hotbar.js"
import { receber_item, espaco } from "../desktop/inventario.js"
import { espada } from "../itens/sprs/spr_espada.js"
import { minerio } from "../itens/sprs/spr_minerio.js"
import { fracasso, informar_vida, diminuir_vida, vida } from "../pedra/pedra.js"
import { espada_infos, machados_infos, picaretas_infos } from "../utils.js"

export function press_E(tipo, drop, ferramentas, identificacao, quantidade) {

    if (tipo == "porco") {
        var vida_entidades = document.getElementById(identificacao).dataset.id;
        
        if (ferramentas.includes(mao())) { vida_entidades = vida_entidades - espada_infos[mao()]}
            else { vida_entidades = vida_entidades - 3 }
        
        informar_vida(identificacao, vida_entidades)

        document.getElementById(identificacao).dataset.id = vida_entidades

        if (vida_entidades <= 0) {
            document.getElementById(identificacao).remove()
            receber_item(drop, quantidade)
        }

    }

    if (tipo === "minerio") {
        if (ferramentas.includes(mao()) && espaco()) {
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

            if (ferramentas.includes(mao())) { diminuir_vida(machados_infos[mao()]) }
            else { diminuir_vida(2) }

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
