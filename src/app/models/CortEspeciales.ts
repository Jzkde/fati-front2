import { Rangos } from "./Rangos";

export interface CortEspeciales {

  id?: number;
  tela: string;
  precio: number;
  esTela: boolean;
  esAdicional: boolean;
  sistema: string;
  marca: string;
  rangos?: Rangos []
}