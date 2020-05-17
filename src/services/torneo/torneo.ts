export interface Torneo {
  idTorneo: string;
  nombreTorneo: string;
  categorias: {idcategoria: string, nombrecategoria: string}[];
}
