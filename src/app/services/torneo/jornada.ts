import {Resultado} from './resultado';

export interface Jornada {
 jornada?: string;
 totaljornadas?: string;
 fase?: string;
 totalfases?: string;
 observacionesjornada?: string;
 modalidadvisual: string;
 resultados: Resultado[];
}
