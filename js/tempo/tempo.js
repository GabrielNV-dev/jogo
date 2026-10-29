let estacionado = 5 //minutos
let tempo = "dia" / "noite"

function transicao(modo) {
    tempo = tempo == "dia" ? "noite" : "dia"
    let intensidade = tempo == "dia" ? 0.0 : 0.85

    let locacao = setInterval(() => {
        document.getElementById("tempo").style.background = `rgba(0, 0, 0, ${intensidade})`
        if (tempo == "dia") { intensidade += 0.1 } else { intensidade -= 0.1 }
        if (intensidade >= 0.85 || intensidade <= 0.0) {
            clearInterval(locacao);
        }
    }, 1000);
}

setInterval(() => {
    console.log("ee")
    transicao(tempo)
}, estacionado * 60 * 1000);