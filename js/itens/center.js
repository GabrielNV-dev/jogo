import {  } from "./sprs/spr_minerio.js"
import { madeira } from "./sprs/spr_madeira.js"
import { pedra } from "./sprs/spr_pedra.js"
import { picareta } from "./sprs/spr_picareta.js"

function seletor(item) {
    const copia = structuredClone(picareta);
    copia.cores.V = item;
    return copia;
}
export const referencia = {
    "diamante": diamante,
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
    "ferro": ferro
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