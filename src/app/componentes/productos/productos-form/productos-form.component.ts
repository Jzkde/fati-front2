import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { Producto } from 'src/app/models/Producto';
import { Servicio } from 'src/app/models/Servicio';
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
  servs: any[] = []
  serv!: Servicio
  prod!: Producto
  artSelec = ''
  marcaSelec = ''
  nombreSelec = ''
  nombreServSelec = ''


  constructor(
    private productoService: ProductoService,
    private serviciosService: ServiciosService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.prod = {
      id: 0,
      art: '',
      nombre: '',
      precio: 0,
      esTela: false,
      marca: { id: 0, marca: '' }
    }
    this.serv = {
      id: 0,
      nombre: ',',
      precio: 0,
      tipo: ',',
    }
    this.serviciosService.lista().subscribe((data) => {
      this.servicios = data,
        console.log(data);
    });
    this.filtro()

  }
  filtro() {
    this.productoService.lista().subscribe((data) => {
      this.productos = data;
      // Extraer marcas únicas
      const marcasMap = new Map();
      data.forEach(producto => {
        marcasMap.set(producto.marca.id, producto.marca);
      });
      this.marcasUnicas = Array.from(marcasMap.values());
      this.filtrarProductos();
      this.filtrarServicios();
      console.log(data);
    });
    this.serviciosService.lista().subscribe((data) => {
      this.servicios = data,
        console.log(data);
    });
  }

  filtrarProductos() {
    this.buscados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.nombreSelec.toLowerCase()) &&
      p.art.toLowerCase().includes(this.artSelec.toLowerCase()) &&
      p.marca.marca.toLowerCase().includes(this.marcaSelec.toLowerCase())
    );
  }

  filtrarServicios() {
    this.servs = this.servicios.filter(s =>
      s.nombre.toLowerCase().includes(this.nombreServSelec.toLowerCase())
    );
  }

  filtroUno(id: number): void {
    this.productoService.filtroUno(id).subscribe(
      data => {
        this.prod = data;
        console.log(data);
      }
    )
  }
  unoServi(id: number): void {
    this.serviciosService.filtroUno(id).subscribe(
      data => {
        this.serv = data;
        console.log(data);
      }
    )
  }
  editar(id: number) {
    this.productoService.editar(this.prod.marca.marca, id, this.prod).subscribe({
      next: data => {
        this.prod = {
          id: 0,
          art: '',
          nombre: '',
          precio: 0,
          esTela: false,
          marca: { id: 0, marca: '' }
        };
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        this.filtro();
      },
      error: error => {
        console.error('Error al Modificar:', error);
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
        this.filtro();
      },
      error: error => {
        console.error('Error al Modificar:', error);
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
        console.error('Error al eliminar:', error);
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
        this.filtro();
      },
    error:  error => {
        console.error('Error al eliminar:', error);
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
  });
  }
}
