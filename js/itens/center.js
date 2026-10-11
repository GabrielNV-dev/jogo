import {  } from "./sprs/spr_minerio.js"
import { madeira } from "./sprs/spr_madeira.js"
import { pedra } from "./sprs/spr_pedra.js"
import { picareta } from "./sprs/spr_picareta.js"
import { minerio } from "./sprs/spr_minerio.js"

function seletor(item) {
    const copia = structuredClone(picareta);
    copia.cores.V = item;
    return copia;
}

function seletor_minerio(item) {
    const copia = structuredClone(minerio);
    copia.cores.C = item;
    return copia;
}

export const referencia = {
    "madeira": madeira,
    "pedra-m": pedra,
    "picareta-madeira": seletor("picareta-madeira"),
    "picareta-pedra": seletor("picareta-pedra"),
    "picareta-prata": seletor("picareta-prata"),
    "picareta-ferro": seletor("picareta-ferro"),
    "picareta-ouro": seletor("picareta-ouro"),
    "picareta-diamante": seletor("picareta-diamante"),
    "picareta-esmeralda": seletor("picareta-esmeralda"),
    "picareta-rubi": seletor("picareta-rubi"),
    "picareta-obamium": seletor("picareta-obamium"),

    "ferro": seletor_minerio("minerio-ferro"),
    "diamante": seletor_minerio("minerio-diamante"),
    "ouro": seletor_minerio("minerio-ouro"),
    "carvao": seletor_minerio("minerio-carvao"),
    "rubi": seletor_minerio("minerio-rubi"),
    "obamium": seletor_minerio("minerio-obamium"),
    "prata": seletor_minerio("minerio-prata"),
    "esmeralda": seletor_minerio("minerio-esmeralda"),
    
}
export const nada = {
    padrao: [
        "NNNNNNNNNN",
        "NNNNNNNNNN",
        "NNNNNNNNNN",
        "NNNNNNNNNN",
        "NNNNNNNNNN",
        "NNNNNNNNNN",
        "NNNNNNNNNN",
        "NNNNNNNNNN",
        "NNNNNNNNNN",
        "NNNNNNNNNN",
    ]
}