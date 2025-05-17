import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/Producto';
import { Servicio } from 'src/app/models/Servicio';
import { DbService } from 'src/app/service/db.service';
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

  archivo: File | null = null;
  porcen: number = 0
  productos: Producto[] = []
  marcasUnicas: any[] = []
  marcaSelec: string = ''
  nuevosServicios: Servicio[] = []
  nuevosProductos: Producto[] = []
  nuevoServ: Servicio = {
    id: 0,
    tipo: '',
    nombre: '',
    precio: 0
  }
  nuevoProd: Producto = {
    id: 0,
    art: '',
    nombre: '',
    precio: 0,
    esTela: false,
    marca: { id: 0, marca: '' }
  };

  constructor(
    private productoService: ProductoService,
    private serviciosService: ServiciosService,
    private dbService: DbService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productoService.lista().subscribe((data) => {
      this.productos = data;

      // Extraer marcas únicas
      const marcasMap = new Map();
      data.forEach(producto => {
        marcasMap.set(producto.marca.id, producto.marca);
      });
      this.marcasUnicas = Array.from(marcasMap.values());
      console.log(this.marcasUnicas);

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
            console.error('Error:', error.error);
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
    }
  }

  agregarProd() {
    this.nuevosProductos.push({ ...this.nuevoProd });
    this.nuevoProd = { id: 0, art: '', nombre: '', precio: 0, esTela: false, marca: { id: 0, marca: '' } };
    console.log(this.nuevosProductos);
  }

  agregarServ() {
    this.nuevosServicios.push({ ...this.nuevoServ });
    this.nuevoServ = { id: 0, tipo: '', nombre: '', precio: 0 };
    console.log(this.nuevosProductos);
  }


  quitarProducto(index: number) {
    this.nuevosProductos.splice(index, 1);
  }

  quitarServicio(index: number) {
    this.nuevosServicios.splice(index, 1);
  }

  esValido(): boolean {
    return (this.nuevosProductos.length > 0);
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
  }
}
