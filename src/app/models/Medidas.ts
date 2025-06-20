import { Cliente } from "./Cliente";

export class Medidas {

    id?: number;
    sistema: string;
    ancho: number;
    alto: number;
    comando: string;
    apertura: string;
    accesorios?: string;
    ambiente?: string;
    observaciones?: string;
    cliente: string;
    caida: string;
    fecha?: string;
    viejo?: string;
    comprado?: string;
    clienteClase?: Cliente;


    constructor(
        sistema: string,
        ancho: number,
        alto: number,
        comando: string,
        apertura: string,
        cliente: string,
        caida: string,
        accesorios?: string,
        ambiente?: string,
        observaciones?: string,
        clienteClase?: Cliente
    ) {
        this.sistema = sistema;
        this.ancho = ancho;
        this.alto = alto;
        this.comando = comando;
        this.apertura = apertura;
        this.accesorios = accesorios
        this.ambiente = ambiente
        this.observaciones = observaciones
        this.cliente = cliente
        this.caida = caida
        this.clienteClase = clienteClase;
    }
}