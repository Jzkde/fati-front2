import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';

@Component({
  selector: 'app-cortinas-esp-form',
  templateUrl: './cortinas-esp-form.component.html',
  styleUrls: ['./cortinas-esp-form.component.css']
})
export class CortinasEspFormComponent {

  buscados: any[] = [];
  marca: string = "";
  prod!: any;
  sistemas!: any[];

  busqueda = {
    id: 0,
    tela: '',
    estela: 'false',
    sistema: '',
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
    comprado: '',
    marca: ''
  };


  constructor(
    private cortinasEspService: CortinasEspService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toastr.clear();

    this.prod = {
      id: 0,
      tela: '',
      precio: 0,
      esTela: false,
      sistema: 'ROLLER'
    }
    this.listaSistemas()
  }

  actualizarMarca(valor: string): void {
    this.busqueda.marca = valor;
  }

  listaSistemas() {
    this.cortinasEspService.listaSistemas().subscribe({
      next: data => {
        this.sistemas = data;
        console.log(this.sistemas);
      }
    })
  }

  filtro(): void {
    this.cortinasEspService.filtro(this.busqueda).subscribe({
      next: data => {
        this.buscados = data;
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


  filtroUno(id: number): void {
    this.cortinasEspService.uno(id).subscribe({
      next: data => {
        this.prod = data;
      }
    })
  }

  editar(id: number) {
    this.cortinasEspService.editar(this.marca, id, this.prod).subscribe({
      next: (data) => {
        this.prod = { id: 0, tela: '', precio: 0, esTela: false, sistema: 'ROLLER' };
        this.filtro();
        console.log(this.prod);

        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      },
      error: error => {
        console.error('Error al Modificar:', error);
        console.log(this.prod);

        this.toastr.error(error.error + "con ID: ", 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  borrar(id: number): void {
    this.cortinasEspService.borrar(id).subscribe({
      next: data => {
        console.log('Tela eliminada:', data);
        this.filtro();
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      },
      error: error => {
        console.error('Error al eliminar:', error);
        this.toastr.error(error.error, 'Error', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
}