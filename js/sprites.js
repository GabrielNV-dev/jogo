const infoClasse = new Map();
const cacheSprites = new WeakMap();
let tamanhoPixel = null;

function lerPixel() {
    if (tamanhoPixel === null) {
        const el = document.createElement("div");
        el.className = "pixel";
        el.style.position = "absolute";
        el.style.visibility = "hidden";
        document.body.appendChild(el);
        tamanhoPixel = parseFloat(getComputedStyle(el).width) || 3;
        el.remove();
    }
    return tamanhoPixel;
}

function lerClasse(classe) {
    let info = infoClasse.get(classe);
    if (!info) {
        const el = document.createElement("div");
        el.className = `pixel ${classe}`;
        el.style.position = "absolute";
        el.style.visibility = "hidden";
        document.body.appendChild(el);
        const estilo = getComputedStyle(el);
        const z = parseInt(estilo.zIndex, 10);
        info = { cor: estilo.backgroundColor, z: Number.isNaN(z) ? 0 : z };
        el.remove();
        infoClasse.set(classe, info);
    }
    return info;
}

function gerarCamadas(sprit, cores) {
    const altura = sprit.length;
    const largura = Math.max(...sprit.map(linha => linha.length));
    const porZ = new Map();

    sprit.forEach((linha, y) => {
        for (let x = 0; x < linha.length; x++) {
            const classe = cores[linha[x]];
            if (!classe) continue;
            const { cor, z } = lerClasse(classe);
            let camada = porZ.get(z);
            if (!camada) {
                const canvas = document.createElement("canvas");
                canvas.width = largura;
                canvas.height = altura;
                camada = { z, canvas, ctx: canvas.getContext("2d") };
                porZ.set(z, camada);
            }
            camada.ctx.fillStyle = cor;
            camada.ctx.fillRect(x, y, 1, 1);
        }
    });

    const camadas = [...porZ.values()]
        .sort((a, b) => a.z - b.z)
        .map(({ z, canvas }) => ({ z, url: `url(${canvas.toDataURL()})` }));

    return { largura, altura, camadas };
}

function obterSprite(sprit, cores) {
    let porCores = cacheSprites.get(sprit);
    if (!porCores) {
        porCores = new WeakMap();
        cacheSprites.set(sprit, porCores);
    }
    let resultado = porCores.get(cores);
    if (!resultado) {
        resultado = gerarCamadas(sprit, cores);
        porCores.set(cores, resultado);
    }
    return resultado;
}

export function aplicarSprite(elemento, sprit, cores) {
    const { largura, altura, camadas } = obterSprite(sprit, cores);
    const pixel = lerPixel();

    elemento.style.width = `${largura * pixel}px`;
    elemento.style.height = `${altura * pixel}px`;

    let divs = [...elemento.querySelectorAll(":scope > .camada")];

    if (divs.length !== camadas.length) {
        divs.forEach(div => div.remove());
        divs = camadas.map(() => {
            const div = document.createElement("div");
            div.className = "camada";
            div.style.position = "absolute";
            div.style.left = "0";
            div.style.top = "0";
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.pointerEvents = "none";
            div.style.backgroundSize = "100% 100%";
            div.style.imageRendering = "pixelated";
            elemento.appendChild(div);
            return div;
        });
    }

    camadas.forEach((camada, i) => {
        const div = divs[i];
        if (div._url !== camada.url) {
            div.style.backgroundImage = camada.url;
            div._url = camada.url;
        }
        if (div._z !== camada.z) {
            div.style.zIndex = camada.z;
            div._z = camada.z;
        }
    });
}

export function trocarSprite(id, sprit, cores) {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    aplicarSprite(elemento, sprit, cores);
}
