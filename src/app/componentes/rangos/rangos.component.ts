import { Component, OnInit } from '@angular/core';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { CortEspeciales } from 'src/app/models/CortEspeciales';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rangos',
  templateUrl: './rangos.component.html',
  styleUrls: ['./rangos.component.css']
})
export class RangosComponent implements OnInit {

  mecanismos: CortEspeciales[] = []
  busqueda = {
    id: 0,
    tela: '',
    esTela: 'false',
    sistema: '',
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
    comprado: '',
    nombre: '',
    art: '',
    marca: ''
  };
  constructor(
    private cortinasEspService: CortinasEspService,
    private toastr: ToastrService,

  ) {

  }

  ngOnInit(): void {
    this.filtro()
  }

  filtro(): void {
    this.cortinasEspService.filtro(this.busqueda).subscribe({
      next: data => {
        this.mecanismos = data;
        console.log(this.busqueda);

        if (data.length === 0) {
          this.toastr.error("No hay TELAS cargadas", 'ERROR', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      }
    })
  }
}
