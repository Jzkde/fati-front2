import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { Sistema } from 'src/app/models/Sistema';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { MarcaService } from 'src/app/service/marca.service';
import { SistemaService } from 'src/app/service/sistema.service';

@Component({
  selector: 'app-cortinas-esp-form',
  templateUrl: './cortinas-esp-form.component.html',
  styleUrls: ['./cortinas-esp-form.component.css']
})
export class CortinasEspFormComponent {

  buscados: any[] = [];
  marca: string = "";
  marca1: string = "";
  prod!: any;
  sistemas!: Sistema[];
  marcas: Marca[] = [];

  busqueda = {
    id: 0,
    tela: '',
    esTela: 'true',
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
    nombre: '',
    art: '',
    marca: ''
  };

  constructor(
    private cortinasEspService: CortinasEspService,
    private sistemaService: SistemaService,
    private marcaService: MarcaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.prod = {
      id: 0,
      tela: '',
      precio: 0,
      esTela: false,
      sistema: 'ROLLER'
    }
    this.toastr.clear();
    this.listaMarcas()
  }

  actualizarMarca(valor: string): void {
    this.busqueda.marca = valor;
    
    this.listaSistemas()
  }

  listaSistemas() {
    this.sistemaService.listaXMarca(this.marca1).subscribe({
      next: data => {
        this.sistemas = data;
        console.log(this.sistemas);
      }
    })
  }

  listaMarcas() {
    this.marcaService.listaMarcasTipo(true).subscribe({
      next: data => {
        this.marcas = data;
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
    this.cortinasEspService.editar(id, this.prod).subscribe({
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
        console.warn('Error al Modificar: ', error);
        console.log(this.prod);
        this.toastr.error(error.error , 'ERROR', {
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
        console.warn('Error al eliminar:', error);
        this.toastr.error(error.error, 'Error', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
}