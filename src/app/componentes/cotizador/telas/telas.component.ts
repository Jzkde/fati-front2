import { Component, OnInit } from '@angular/core';
import { Cotizado } from 'src/app/models/Cotizado';
import { Producto } from 'src/app/models/Producto';
import { CotizadorService } from 'src/app/service/cotizador.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ServiciosService } from 'src/app/service/servicios.service';

interface ProductoSeleccionado {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-telas',
  templateUrl: './telas.component.html',
  styleUrls: ['./telas.component.css']
})
export class TelasComponent implements OnInit {

  productos: Producto[] = [];
  telas: Producto[] = [];
  accesorios: Producto[] = [];
  confecciones: any[] = [];
  cotizado: Cotizado | null = null;

  resultado: any;

  cotizaciones: any[] = [];
  sumatoria: number = 0;
  contador: number = 1;

  productosSeleccionados: ProductoSeleccionado[] = [];

  buscarTelaNombre = '';
  buscarTelaArt = '';
  buscarAccesorioNombre = '';
  buscarAccesorioArt = '';
  telaSeleccionada: Producto | null = null;
  accesorioSeleccionado: Producto | null = null;

  ancho = 0;
  prop = 0;
  tipoConfSeleccionado = '';

  constructor(
    private productoService: ProductoService,
    private cotizadorService: CotizadorService,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    this.productoService.lista().subscribe((data) => {
      this.productos = data;
      this.filtrarTelas();
      this.filtrarAccesorios();
      console.log(data);
    });
    this.serviciosService.getTipoServicio("confeccion").subscribe(
      data => this.confecciones = data,
    );
  }

  filtrarTelas() {
    this.telas = this.productos.filter(p =>
      p.esTela &&
      p.nombre.toLowerCase().includes(this.buscarTelaNombre.toLowerCase()) &&
      p.art.toLowerCase().includes(this.buscarTelaArt.toLowerCase())
    );
  }

  filtrarAccesorios() {
    this.accesorios = this.productos.filter(p =>
      !p.esTela &&
      p.nombre.toLowerCase().includes(this.buscarAccesorioNombre.toLowerCase()) &&
      p.art.toLowerCase().includes(this.buscarAccesorioArt.toLowerCase())
    );
  }

  quitarProducto(index: number) {
    this.productosSeleccionados.splice(index, 1);
  }

  cambiarCantidad(index: number, cantidad: number) {
    if (cantidad <= 0) {
      this.quitarProducto(index);
    } else {
      this.productosSeleccionados[index].cantidad = cantidad;
    }
  }

  expandirProductos(): Producto[] {
    const productosExpandidos: Producto[] = [];
    this.productosSeleccionados.forEach(item => {
      for (let i = 0; i < item.cantidad; i++) {
        productosExpandidos.push(item.producto);
      }
    });
    return productosExpandidos;
  }

  cotizar() {
    if (!this.telaSeleccionada || !this.tipoConfSeleccionado || this.ancho <= 0 || this.prop <= 0) {
      alert('Por favor completá todos los datos correctamente.');
      return;
    }

    const productosAEnviar = this.expandirProductos();

    this.cotizadorService.cotizarTelas(
      this.telaSeleccionada.nombre,
      this.ancho,
      this.prop,
      this.tipoConfSeleccionado,
      productosAEnviar
    )
      .subscribe({
        next: data => {
          this.cotizado = data;
          console.log(this.cotizado.precioConf);
        },
        error: error => {
          console.warn('Error en la cotización:', error.error);
          alert('Error: ' + error.error);
        }
      });
  }

  agregarAccesorioDesdeCuadro(acc: any) {
    // Buscamos si ya existe el accesorio en la lista
    const index = this.productosSeleccionados.findIndex(
      ps => ps.producto.id === acc.id
    );

    if (index >= 0) {
      // Si ya existe, aumentamos la cantidad en 1
      this.productosSeleccionados[index].cantidad++;
    } else {
      // Si no existe, lo agregamos con cantidad 1
      const nuevoProducto = {
        producto: acc,
        cantidad: 1,
      };
      this.productosSeleccionados.push(nuevoProducto);
    }
  }

  actualizarCantidad(index: number) {
    const prod = this.productosSeleccionados[index];
    if (prod.cantidad < 1) {
      prod.cantidad = 1; // evitar cantidades menores a 1
    }
  }

  agregarCotizacion(): void {
    if (this.cotizado?.total && typeof this.cotizado?.total === 'number') {
      const nuevaCotizacion = {
        contador: this.contador,
        monto: this.cotizado?.total,
      };
      this.cotizaciones.push(nuevaCotizacion);
      this.sumatoria += this.cotizado?.total;
      this.resultado = null;
      this.contador++;
      localStorage.setItem('cotizaciones', JSON.stringify(this.cotizaciones));
      localStorage.setItem('sumatoria', this.sumatoria.toString());
    }
  }

  eliminarCotizacion(index: number): void {
    const cotizacionEliminada = this.cotizaciones[index];

    if (cotizacionEliminada) {
      // restar el monto de la sumatoria
      this.sumatoria -= cotizacionEliminada.monto;

      // quitar la cotización de la lista
      this.cotizaciones.splice(index, 1);

      // opcional: reordenar los contadores
      this.cotizaciones.forEach((c, i) => c.contador = i + 1);

      // actualizar localStorage
      localStorage.setItem('cotizaciones', JSON.stringify(this.cotizaciones));
      localStorage.setItem('sumatoria', this.sumatoria.toString());
    }
  }

  borrar(): void {
    this.cotizaciones = [];
    this.sumatoria = 0;
    this.contador = 1;
    localStorage.removeItem('cotizaciones');
    localStorage.removeItem('sumatoria');
  }
}
