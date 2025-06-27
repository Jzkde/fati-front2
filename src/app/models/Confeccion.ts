export interface Confeccion {

    id?: number;
    ancho: number;
    alto: number;
    apertura: string;
    accesorios: string;
    ambiente: string;
    observaciones: string;
    clienteNombre: string;
    fecha_pedido?: string;
    fecha_entrega?: string;
    estado?: string;
    llego?: boolean;
}