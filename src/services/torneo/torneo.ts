import {Categoria} from './categoria';

export interface Torneo {
  idTorneo: string;
  nombreTorneo: string;
  categorias: Categoria[];
}
