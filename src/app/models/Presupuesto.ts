import { Cliente } from "./Cliente";

export class Presupuesto {

    id?: number;
    sistema: string;
    ancho: number;
    alto: number;
    comando: string;
    apertura: string;
    accesorios?: string;
    ambiente?: string;
    observaciones?: string;
    clienteNombre: string;
    caida: string;
    fecha?: string;
    viejo?: string;
    comprado?: string;
    cliente?: Cliente;


    constructor(
        sistema: string,
        ancho: number,
        alto: number,
        comando: string,
        apertura: string,
        clienteNombre: string,
        caida: string,
        accesorios?: string,
        ambiente?: string,
        observaciones?: string,
        cliente?: Cliente
    ) {
        this.sistema = sistema;
        this.ancho = ancho;
        this.alto = alto;
        this.comando = comando;
        this.apertura = apertura;
        this.accesorios = accesorios
        this.ambiente = ambiente
        this.observaciones = observaciones
        this.clienteNombre = clienteNombre
        this.caida = caida
        this.cliente = cliente;
    }
}