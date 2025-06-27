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
  productos: Producto[] = []
  marcasUnicas: any[] = []
  marcasFiltradas: Marca[] = []
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
    marca: '' 
  };

  constructor(
    private productoService: ProductoService,
    private serviciosService: ServiciosService,
    private cortinasEspService: CortinasEspService,
    private dbService: DbService,
    private marcaService: MarcaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.filtrarMarcas()
  }

  marcasAQuitar() {
    this.cortinasEspService.listaTotal().subscribe((data) => {
      this.productos = data;

      // Extraer marcas únicas
      const marcasMap = new Map();
      data.forEach(marcaE => {
        marcasMap.set(marcaE.marca.id, marcaE.marca);
      });
      this.marcasUnicas = Array.from(marcasMap.values());
      console.log(this.marcasUnicas);

    });
  }

  filtrarMarcas(): void {
    this.listaMarcaTotal();    
    this.marcasAQuitar();   

    // Esperar a que ambas listas estén cargadas (idealmente usar forkJoin, aquí una forma simple si ya las tenés cargadas)
    setTimeout(() => {
      if (this.marcas && this.marcasUnicas) {
        const idsAExcluir = new Set(this.marcasUnicas.map(m => m.id));
        this.marcasFiltradas = this.marcas.filter(m => !idsAExcluir.has(m.id));

        console.log("Marcas finales (filtradas):", this.marcasFiltradas);
      }
    }, 500); // tiempo estimado para esperar que ambas listas se carguen
  }

  listaMarcaTotal(): void {
    this.marcaService.lista().subscribe({
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
    this.nuevoProd = { id: 0, art: '', nombre: '', precio: 0, esTela: false, marca:'' };
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
