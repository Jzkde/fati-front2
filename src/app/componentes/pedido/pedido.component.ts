import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  llego: string = ''
  pedidos: Pedido[] = [];
  buscados: any[] = [];

  busqueda = {
    pasaron: '',
    fecha_pedidoDesde: '',
    fecha_pedidoHasta: '',
    provedor: '',
    via: '',
    n_pedido: '',
    n_factura: '',
    n_remito: '',
    llego: 'false',
    fecha_llegada: '',
    estado: '',
    cliente: '',
    responsable: '',
    tela: '',
    esTela: '',
    sistema: '',
    comprado: '',
     nombre: '',
    art: '',
    marca: ''
  };

  constructor(
    private pedidoService: PedidoService,
    private toastr: ToastrService,
  ) { }

  alerts = this.buscados;
  fechaActual = Date.now()

  ngOnInit(): void {
    this.filtro();
  }

  volver(): void {
    window.history.back();
  }
  
  parse(a: string) {
    Date.parse(a)
  }

  filtro(): void {
    this.toastr.clear();

    this.pedidoService.filtro(this.busqueda).subscribe({
      next: data => {
        this.buscados = data;
        this.buscados.forEach(pedido => {
          const fechapedido = Date.parse(pedido.fecha_pedido)
          const pasaron = Math.floor((this.fechaActual - fechapedido) / (1000 * 60 * 60 * 24))
          pedido.pasaron = pasaron
          if (pasaron > 20 && !pedido.llego) {
            this.toastr.error('ID: ' + pedido.id + ' - Para: ' + pedido.clienteNombre, 'Pasaron ' + pedido.pasaron + ' Dias desde el pedido', {
              disableTimeOut: true,
              positionClass: 'toast-bottom-right',
            });
          }
        })
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  borrarFiltros(): void {
    this.busqueda.fecha_pedidoDesde = '',
      this.busqueda.fecha_pedidoHasta = '',
      this.busqueda.provedor = '',
      this.busqueda.via = '',
      this.busqueda.n_pedido = '',
      this.busqueda.n_factura = '',
      this.busqueda.n_remito = '',
      this.busqueda.llego = '',
      this.busqueda.fecha_llegada = '',
      this.busqueda.estado = '',
      this.busqueda.cliente = '',
      this.busqueda.responsable = ''
    this.filtro();
  }

  actualizar(id: number): void {
    this.pedidoService.actualizar(id).subscribe({
      next: data => {
        this.pedidos = data;
      },
      error: error => {
        console.log(error);
      }
    });
    window.location.reload();
  }
}