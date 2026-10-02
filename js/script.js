var boneco = [
    "   CCCC   ",
    "  CCCCCC  ",
    "  PPPPPP  ",
    "  PCPPCP  ",
    "  PPPPPP  ",
    "    PP    ",
    "  PRRRRP  ",
    "  PRRRRP  ",
    "  RRRRRR  ",
    "  KK  KK  ",
    "  KK  KK  ",
];
const cores = {
    C: "cabelo",
    P: "pele",
    R: "roupa",
    K: "calca",
    F: "folhac",
    O: "folhas",
    T: "tronco"
};
var arvore = [
    "  FFFFFF  ",
    " FFFFFFFF ",
    " FFFFFFFF ",
    " FFFFFFFF ",
    " OOOOOOOO ",
    "    TT    ",
    "    TT    ",
    "    TT    ",
    "    TT    ",
    "    TT    ",
];
function atualizar() {s
    const elemento = document.getElementById("boneco");
    elemento.innerHTML = ""
    boneco.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");
            div.classList.add("pixel");

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });
}
function atualizar_arvore() {
    const elemento = document.getElementById("arvore");
    elemento.innerHTML = ""
    arvore.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");
            div.classList.add("pixel");

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });
}
atualizar()
atualizar_arvore()
document.addEventListener("keydown", (event) => {
    player = document.getElementById("boneco")
    let step = 50
    if (event.key === "w") {
        player.style.marginTop = (parseInt(getComputedStyle(player).marginTop) - step) + "px";
        boneco = [
            "   CCCC   ",
            "  CCCCCC  ",
            "  PPPPPP  ",
            "  PPPPPP  ",
            "  PPPPPP  ",
            "    PP    ",
            "  RRRRRR  ",
            "  RRRRRR  ",
            "  RRRRRR  ",
            "  KK  KK  ",
            "  KK  KK  ",
        ];
        atualizar()
    }
    if (event.key === "s") {
        player.style.marginTop = (parseInt(getComputedStyle(player).marginTop) + step) + "px";
        boneco = [
            "   CCCC   ",
            "  CCCCCC  ",
            "  PPPPPP  ",
            "  PCPPCP  ",
            "  PPPPPP  ",
            "    PP    ",
            "  PRRRRP  ",
            "  PRRRRP  ",
            "  RRRRRR  ",
            "  KK  KK  ",
            "  KK  KK  ",
        ];
        atualizar()
    }
    if (event.key === "a") {
        player.style.marginLeft = (parseInt(getComputedStyle(player).marginLeft) - step) + "px";
        boneco = [
            "    C     ",
            "    CC    ",
            "    PP    ",
            "    CP    ",
            "    PP    ",
            "    PP    ",
            "    RR    ",
            "    RR    ",
            "    RR    ",
            "    KK    ",
            "    KK    ",
        ];
        
        atualizar()
    }
    if (event.key === "d") {
        player.style.marginLeft = (parseInt(getComputedStyle(player).marginLeft) + step) + "px";
         boneco = [
            "    C     ",
            "    CC    ",
            "    PP    ",
            "    PC    ",
            "    PP    ",
            "    PP    ",
            "    RR    ",
            "    RR    ",
            "    RR    ",
            "    KK    ",
            "    KK    ",
        ];
        atualizar()
    }
});

