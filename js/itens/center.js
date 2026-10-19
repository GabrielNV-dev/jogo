import { madeira_bruta } from "./sprs/spr_madeira_bruta.js"
import { pedra } from "./sprs/spr_pedra.js"
import { picareta } from "./sprs/spr_picareta.js"
import { minerio } from "./sprs/spr_minerio.js"
import { machado } from "./sprs/spr_machado.js"
import { espada } from "./sprs/spr_espada.js"
import { pao } from "./sprs/spr_pao.js"
import { pa } from "./sprs/spr_pa.js"
import { graveto } from "./sprs/spr_graveto.js"
import { madeira_refinada } from "./sprs/spr_madeira_refinada.js"
import { craft_table } from "./sprs/spr_craft-table.js"


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

function seletor_machado(item) {
    const copia = structuredClone(machado);
    copia.cores.V = item;
    return copia;
}

function seletor_espada(item) {
    const copia = structuredClone(espada);
    copia.cores.V = item;
    return copia;
}

function seletor_pa(item) {
    const copia = structuredClone(pa);
    copia.cores.V = item;
    return copia;
}

export const referencia = {
    "craft-table": craft_table,
    "madeira_bruta": madeira_bruta,
    "pedra-m": pedra,
    "pao": pao,
    "graveto": graveto,
    "madeira_refinada" : madeira_refinada,
    
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

    "machado-madeira": seletor_machado("machado-madeira"),
    "machado-pedra": seletor_machado("machado-pedra"),
    "machado-prata": seletor_machado("machado-prata"),
    "machado-ferro": seletor_machado("machado-ferro"),
    "machado-ouro": seletor_machado("machado-ouro"),
    "machado-diamante": seletor_machado("machado-diamante"),
    "machado-esmeralda": seletor_machado("machado-esmeralda"),
    "machado-rubi": seletor_machado("machado-rubi"),
    "machado-obamium": seletor_machado("machado-obamium"),

    "espada-madeira": seletor_espada("espada-madeira"),
    "espada-pedra": seletor_espada("espada-pedra"),
    "espada-prata": seletor_espada("espada-prata"),
    "espada-ferro": seletor_espada("espada-ferro"),
    "espada-ouro": seletor_espada("espada-ouro"),
    "espada-diamante": seletor_espada("espada-diamante"),
    "espada-esmeralda": seletor_espada("espada-esmeralda"),
    "espada-rubi": seletor_espada("espada-rubi"),
    "espada-obamium": seletor_espada("espada-obamium"),

    "pa-madeira": seletor_pa("pa-madeira"),
    "pa-pedra": seletor_pa("pa-pedra"),
    "pa-prata": seletor_pa("pa-prata"),
    "pa-ferro": seletor_pa("pa-ferro"),
    "pa-ouro": seletor_pa("pa-ouro"),
    "pa-diamante": seletor_pa("pa-diamante"),
    "pa-esmeralda": seletor_pa("pa-esmeralda"),
    "pa-rubi": seletor_pa("pa-rubi"),
    "pa-obamium": seletor_pa("pa-obamium"),

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