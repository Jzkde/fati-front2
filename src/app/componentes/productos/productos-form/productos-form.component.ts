import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { Producto } from 'src/app/models/Producto';
import { Servicio } from 'src/app/models/Servicio';
import { MarcaService } from 'src/app/service/marca.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  @ViewChild('lgModal2', { static: false }) lgModal2: any;

  marcasUnicas: any[] = []
  productos: Producto[] = []
  buscados: Producto[] = []
  servicios: any[] = []
  marcas: Marca[] = []
  prod = {
    id: 0,
    art: '',
    nombre: '',
    precio: 0,
    esTela: false,
    marca: ''
  }
  serv = {
    id: 0,
    nombre: ',',
    precio: 0,
    tipo: ',',
  }
  porcen!: number
  artSelec = ''
  marcaSelec = ''
  nombreSelec = ''
  nombreServSelec = ''

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

  constructor(
    private productoService: ProductoService,
    private serviciosService: ServiciosService,
    private marcaService: MarcaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {


    this.listaServ()
    this.filtro()
    this.listaMarca()
  }

  listaServ() {
    this.serviciosService.lista().subscribe((data) => {
      this.servicios = data,
        console.log(data);
    });
  }

  listaMarca(): void {
    this.marcaService.listaMarcasTipo(false).subscribe({
      next: data => {
        this.marcas = data
      },
      error: error => {
        console.log(error);
      }
    });
  }

  filtro() {
    this.productoService.filtro(this.busqueda).subscribe({
      next: data => {
        this.productos = data;

      },
      error: error => {
        console.warn(error.error);
        this.toastr.error(error.error, 'Error', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  filtrarServicios() {
    this.servicios = this.servicios.filter(s =>
      s.nombre.toLowerCase().includes(this.nombreServSelec.toLowerCase())
    );
  }

  filtroUno(id: number): void {
    this.productoService.filtroUno(id).subscribe({
      next: data => {
        this.prod = data;
        console.log(data);
      }
    })
  }

  unoServi(id: number): void {
    this.serviciosService.filtroUno(id).subscribe({
      next: data => {
        this.serv = data;
        console.log(data);
      }
    })
  }

  editar(id: number) {
    this.productoService.editar(this.prod.marca, id, this.prod).subscribe({
      next: data => {
        this.prod = {
          id: 0,
          art: '',
          nombre: '',
          precio: 0,
          esTela: false,
          marca: ''
        };
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        this.filtro();
      },
      error: error => {
        console.warn('Error al Modificar:', error);
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  editarServ(id: number) {
    this.serviciosService.editar(id, this.serv).subscribe({
      next: data => {
        this.serv = {
          id: 0,
          nombre: ',',
          precio: 0,
          tipo: ',',
        };
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        this.listaServ()
      },
      error: error => {
        console.warn('Error al Modificar:', error);
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  borrar(id: number): void {
    this.productoService.borrar(id).subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        this.filtro();
      },
      error: error => {
        console.warn('Error al eliminar:', error);
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  borrarServ(id: number): void {
    this.serviciosService.borrar(id).subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        this.listaServ()
      },
      error: error => {
        console.warn('Error al eliminar:', error);
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  masivo() {
    if (this.porcen) {
      this.serviciosService.masivo(this.porcen).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.porcen = 0
          this.listaServ()
        },
        error: error => {
          if (error.error == "No hay TELAS cargadas") {
            console.warn('Error:', error.error);
            this.toastr.error(error.error, 'ERROR', {
              timeOut: 5000,
              positionClass: 'toast-bottom-center'
            });
          } else {
            this.toastr.error("Proveedor NO seleccionado", 'ERROR', {
              timeOut: 5000,
              positionClass: 'toast-bottom-center'
            })
          };
        }
      });
    } else {
      this.toastr.error("Porcentaje NO especificado", 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-bottom-center'
      })
    }
  }
}
