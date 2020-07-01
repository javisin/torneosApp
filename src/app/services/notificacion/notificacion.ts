export interface Notificacion {
  idnotificacion: string;
  idcategoria: string;
  idpartido?: string;
  idvalidacion?: string;
  titulo: string;
  descripcion: string;
  estado: string;
  estadovalidacion?: string;
  timestamp: number;
  rdo1?: string;
  rdo2?: string;
  equipo1?: string;
  equipo2?: string;
}
