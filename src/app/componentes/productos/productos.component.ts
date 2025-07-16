declare var bootstrap: any;

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { Producto } from 'src/app/models/Producto';
import { Resultado } from 'src/app/models/Resultado';
import { Servicio } from 'src/app/models/Servicio';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { DbService } from 'src/app/service/db.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;

  marcas: Marca[] = []

  resultado: Resultado | null = null;
  archivo: File | null = null;

  porcen: number = 0
  marcaSelec: string = ''

  nuevosProductos: Producto[] = []
  nuevoProd: Producto = {
    id: 0,
    art: '',
    nombre: '',
    precio: 0,
    esTela: false,
    marca: ''
  };
  nuevoServ: Servicio = {
    id: 0,
    tipo: '',
    nombre: '',
    precio: 0
  }

  constructor(
    private productoService: ProductoService,
    private serviciosService: ServiciosService,
    private cortinasEspService: CortinasEspService,
    private dbService: DbService,
    private marcaService: MarcaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.listaMarca()
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

  masivo() {
    if (this.porcen) {
      this.productoService.masivo(this.marcaSelec, this.porcen).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.porcen = 0
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

  archivoSelec(event: any) {
    this.archivo = event.target.files[0];
  }

  carga() {
    if (this.archivo) {
      this.dbService.cargarAcce(this.archivo).subscribe({
        next: (data: Resultado) => {
          this.resultado = data;
          console.log(data);

          if (data.errores.length > 0) {
            const modal = new bootstrap.Modal(document.getElementById('erroresModal')!);
            modal.show();
          } else {
            this.toastr.success('Carga completada correctamente', 'OK', {
              timeOut: 5000,
              positionClass: 'toast-bottom-center'
            });
          }
        },
        error: error => {
          this.toastr.error(error.error, 'ERROR', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    }
  }

  agregarProd() {
    this.nuevosProductos.push({ ...this.nuevoProd });
    this.nuevoProd = { id: 0, art: '', nombre: '', precio: 0, esTela: false, marca: '' };
    console.log(this.nuevosProductos);
  }

  quitarProducto(index: number) {
    this.nuevosProductos.splice(index, 1);
  }

  guardarProd() {
    this.productoService.nuevos(this.nuevosProductos).subscribe({
      next: data => {
        this.nuevosProductos = [];
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      },
      error: error => {
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  guardarServ() {
    this.serviciosService.nuevo(this.nuevoServ).subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      },
      error: error => {
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
    this.nuevoServ = { id: 0, tipo: '', nombre: '', precio: 0 };
  }

  esValido(): boolean {
    return (this.nuevosProductos.length > 0);
  }
}
