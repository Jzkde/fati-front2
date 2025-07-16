import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CortEspeciales } from 'src/app/models/CortEspeciales';
import { Marca } from 'src/app/models/Marca';
import { Producto } from 'src/app/models/Producto';
import { Servicio } from 'src/app/models/Servicio';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  marcas: Marca[] = [];
  colocacion: Servicio[] = [];
  confeccion: Servicio[] = [];
  productos: Producto[] = [];
  cortEsp: CortEspeciales[] = []

  constructor(
    private marcaService: MarcaService,
    private serviciosService: ServiciosService,
    private productoService: ProductoService,
    private cortinasEspService: CortinasEspService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.listaMarcas()
    this.listaColocacion()
    this.listaConfeccion()
    this.listaProductos()
    this.listaCortEspec()
  }

  listaMarcas(): void {
    this.marcaService.lista().subscribe({
      next: data => {
        this.marcas = data;
      },
      error: error => {
        let mensaje = '';

        if (typeof error.error === 'string') {
          mensaje = error.error;
          console.warn(error.error);
        } else {
          mensaje = 'No se pudo conectar con el servidor.';
          console.warn('No se pudo conectar con el servidor.');
        }

        this.toastr.warning(mensaje, '', {
          timeOut: 0,
          extendedTimeOut: 0,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  listaColocacion(): void {
    this.serviciosService.getTipoServicio("colocacion").subscribe({
      next: data => {
        this.colocacion = data
      },
     error: error => {
      let mensaje = '';

      if (typeof error.error === 'string') {
        mensaje = error.error;
        console.warn(error.error);
      } else {
        mensaje = 'No se pudo conectar con el servidor.';
        console.warn('No se pudo conectar con el servidor.');
      }

      this.toastr.warning(mensaje, '', {
        timeOut: 0,
        extendedTimeOut: 0,
        positionClass: 'toast-bottom-center'
      });
    }
  });
}

  listaConfeccion(): void {
    this.serviciosService.getTipoServicio("confeccion").subscribe({
      next: data => {
        this.confeccion = data
      },
      error: error => {
      let mensaje = '';

      if (typeof error.error === 'string') {
        mensaje = error.error;
        console.warn(error.error);
      } else {
        mensaje = 'No se pudo conectar con el servidor.';
        console.warn('No se pudo conectar con el servidor.');
      }

      this.toastr.warning(mensaje, '', {
        timeOut: 0,
        extendedTimeOut: 0,
        positionClass: 'toast-bottom-center'
      });
    }
  });
}

  listaProductos(): void {
    this.productoService.lista().subscribe({
      next: data => {
        this.productos = data
      },
       error: error => {
      let mensaje = '';

      if (typeof error.error === 'string') {
        mensaje = error.error;
        console.warn(error.error);
      } else {
        mensaje = 'No se pudo conectar con el servidor.';
        console.warn('No se pudo conectar con el servidor.');
      }

      this.toastr.warning(mensaje, '', {
        timeOut: 0,
        extendedTimeOut: 0,
        positionClass: 'toast-bottom-center'
      });
    }
  });
}

  listaCortEspec(): void {
    this.cortinasEspService.listaTotal().subscribe({
      next: data => {
        this.cortEsp = data
      },
      error: error => {
      let mensaje = '';

      if (typeof error.error === 'string') {
        mensaje = error.error;
        console.warn(error.error);
      } else {
        mensaje = 'No se pudo conectar con el servidor.';
        console.warn('No se pudo conectar con el servidor.');
      }

      this.toastr.warning(mensaje, '', {
        timeOut: 0,
        extendedTimeOut: 0,
        positionClass: 'toast-bottom-center'
      });
    }
  });
}
}
