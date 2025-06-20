import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Taller } from 'src/app/models/Taller';
import { TallerService } from 'src/app/service/taller.service';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {
  confeccionesAgrupadas: { cliente: string, items: Taller[] }[] = [];

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
    estela: 'false',
    sistema: '',
    viejo: 'false',
    comprado: 'false'
  };

  constructor(
    private tallerService: TallerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toastr.clear();
    this.filtro();
  }

  volver(): void {
    window.history.back();
  }

  filtro(): void {
    this.tallerService.filtro(this.busqueda).subscribe(
      data => {
        this.buscados = data;
        this.confeccionesCliente();
        this.resetfiltros()
      },
      err => {
        console.error('Error al filtrar confecciones:', err);
      }
    );
  }

  borrarFiltros(): void {
    this.busqueda.cliente = ''
    this.busqueda.comprado = ''
    this.busqueda.viejo = ''
    this.busqueda.llego = ''
    this.filtro();
  }

  resetfiltros(): void {
    this.busqueda.comprado = 'false',
      this.busqueda.viejo = 'false'
  }

  confeccionesCliente(): void {
    const agrupados = new Map<string, Taller[]>();
    this.buscados.forEach(taller => {
      const cliente = taller.cliente || 'Desconocido';
      if (!agrupados.has(cliente)) {
        agrupados.set(cliente, []);
      }
      agrupados.get(cliente)?.push(taller);
    });
    this.confeccionesAgrupadas = Array.from(agrupados, ([cliente, items]) => ({ cliente, items }));
  }
  entregar(id: number) {
    this.tallerService.entregar(id).subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    })
    this.filtro
  }
}