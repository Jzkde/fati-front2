import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
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
    llego: '',
    fecha_llegada: '',
    estado: '',
    cliente: '',
    responsable: '',
    tela: '',
    esTela: '',
    sistema: '',
    viejo: 'false',
    comprado: 'false',
    nombre: '',
    art: '',
    marca: ''
  };
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toastr.clear();
    this.filtro();
  }

  filtro(): void {
    this.clienteService.filtro(this.busqueda).subscribe({
      next: data => {
        this.clientes = data;

        console.log(data);
      },
      error: error => {
        console.warn('Error al filtrar medidass:', error);
      }
    });
  }
}
