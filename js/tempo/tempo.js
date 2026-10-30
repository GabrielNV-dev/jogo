let tempo = "dia";

let direcao = 1;
let intensidade = 0;

setInterval(() => {
    const elemento = document.getElementById("tempo");

    elemento.style.background = `rgba(0, 0, 0, ${intensidade})`;

    intensidade += direcao * 0.001;

    if (intensidade >= 0.85) {
        intensidade = 0.85;
        direcao = -1;
    }

    if (intensidade <= 0) {
        intensidade = 0;
        direcao = 1;
    }
}, 10000);