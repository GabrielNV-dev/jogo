let estacionado = 5; // minutos
let tempo = "dia";

tempo = tempo === "dia" ? "noite" : "dia";

let direcao = 1;
let intensidade = 0.00;

let locacao = setInterval(() => {
    document.getElementById("tempo").style.background =
        `rgba(0, 0, 0, ${intensidade})`;

    intensidade += direcao * 0.01;

    if (intensidade >= 0.850) {
        intensidade = 1;
        direcao = -1;
    }

    if (intensidade <= 0) {
        intensidade = 0;
        direcao = 1;
    }
}, 1000);
