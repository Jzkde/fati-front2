export class CortEspeciales {
  id?: number;
  tela: string;
  precio: number;
  esTela: boolean;
  sistema: string;
  marca: string;

  constructor(
    tela: string,
    precio: number,
    esTela: boolean,
    sistema: string,
    marca: string,
    id?: number
  ) {
    this.tela = tela;
    this.precio = precio;
    this.esTela = esTela;
    this.sistema = sistema;
    this.marca = marca;
    this.id = id;
  }
}