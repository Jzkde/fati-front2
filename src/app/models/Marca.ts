export class Marca {
    id?: number;
    marca: string;
  
    constructor(marca: string, id?: number) {
      this.marca = marca;
      this.id = id;
    }
  }