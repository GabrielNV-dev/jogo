import { remover } from "../desktop/hotbar.js";
import { atualizar_inv } from "../desktop/inventario.js";
import { tocha } from "../itens/sprs/spr_tocha.js";
import { consultar_fome, alimentar } from "../player/player.js";
import { aplicarSprite } from "../sprites.js";

export var interacao = false;

const tochas = [];
let quadroLuz = null;

const coresTocha = { ...tocha.cores };
delete coresTocha.N;

const RAIO_LUZ = 150;
const PE_TOCHA = 3;

export function CriarObject(sprit, x, y, cores, id) {
    const elemento = document.createElement("div");

    elemento.classList.add("objeto");
    elemento.style.position = "absolute";
    elemento.style.left = `${x}px`;
    elemento.style.top = `${y}px`;
    elemento.id = id;

    aplicarSprite(elemento, sprit, cores);

    document.body.appendChild(elemento);
    return elemento;
}

function posicaoDe(elemento) {
    const estilo = getComputedStyle(elemento);
    return { x: parseFloat(estilo.left), y: parseFloat(estilo.top) };
}

function atualizarLuz(agora) {
    const tempo = document.getElementById("tempo");
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    const luzes = [];

    tochas.forEach((t, i) => {
        const raio = RAIO_LUZ + Math.sin(agora / 110 + i) * 4 + Math.sin(agora / 37 + i * 2) * 2;
        const x = t.x - window.scrollX;
        const y = t.y - window.scrollY;

        if (x < -raio || x > largura + raio || y < -raio || y > altura + raio) return;

        luzes.push(`radial-gradient(circle ${raio}px at ${x}px ${y}px, transparent 0%, transparent 10%, black 100%)`);
    });

    const mascara = luzes.length ? luzes.join(",") : "linear-gradient(black, black)";

    tempo.style.maskImage = mascara;
    tempo.style.webkitMaskImage = mascara;
    tempo.style.maskComposite = "intersect";
    tempo.style.webkitMaskComposite = "source-in";

    quadroLuz = requestAnimationFrame(atualizarLuz);
}

function colocarTocha() {
    const boneco = document.getElementById("boneco");
    if (!boneco) return;

    const tempo = document.getElementById("tempo");
    tempo.style.display = "block";
    tempo.style.pointerEvents = "none";

    const pos = posicaoDe(boneco);
    const x = pos.x;
    const y = pos.y + PE_TOCHA;

    CriarObject(tocha.padrao, x, y, coresTocha, `tocha-${tochas.length}-${Date.now()}`);

    tochas.push({ x: x + 15, y: y + 12 });

    if (quadroLuz === null) {
        quadroLuz = requestAnimationFrame(atualizarLuz);
    }

    remover();
}

export function press_F(item) {

    if (item == "tocha") {
        colocarTocha();
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
