export interface Pedido {

    id?: number;
    fecha_pedido?: string;
    provedor: string;
    via: string;
    n_pedido: string;
    n_factura: string;
    n_remito: string;
    monto: number;
    llego?: boolean;
    fecha_llegada?: string;
    estado?: string;
    responsable: string;
    observaciones?: string;
    clienteNombre: string;
}