    import { mao } from "../desktop/hotbar.js"
    import { receber_item, espaco } from "../desktop/inventario.js"
    import { fracasso, informar_vida, diminuir_vida, vida } from "../pedra/pedra.js"
    import { picaretas } from "../utils.js"

    export function press_E(tipo, drop, ferramentas, identificacao) {
            if (tipo === "minerio") {
                if (ferramentas.includes(mao()) && espaco()) {
                    console.log(vida)
                    diminuir_vida(picaretas[mao()])
                    console.log(vida)
                    informar_vida(identificacao, vida)
                    if(vida <= 0){
                        console.log(receber_item(drop))
                        document.getElementById(identificacao).remove()
                    }
                } else {
                    fracasso(identificacao)
                }
            }
        }
