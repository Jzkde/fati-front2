import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { Medidas } from 'src/app/models/Medidas';
import { ClienteService } from 'src/app/service/cliente.service';
import { MedidasService } from 'src/app/service/medidas.service';
import { TallerService } from 'src/app/service/taller.service';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.css']
})
export class MedidasComponent implements OnInit {

  @ViewChild('lgModal2', { static: false }) lgModal2: any;
  buscados: any[] = [];
  listado: Medidas[] = [];
  selectedMedidass: Medidas[] = [];
  medidasAgrupadas: { cliente: string, items: Medidas[] }[] = [];
  clienteBuscado: Cliente = { nombre: '', direccion: '', telefono: '' };

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
    private medidasService: MedidasService,
    private tallerService: TallerService,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filtro();
  }

  buscarCliente(nombre: any): void {
    this.clienteService.buscar(nombre).subscribe({
      next: data => {
        this.clienteBuscado = data;
        console.log(this.clienteBuscado);

      },
      error: error => {
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  filtro(): void {
    this.medidasService.filtro(this.busqueda).subscribe({
      next: data => {
        this.buscados = data;
        this.medidassCliente();
        console.log(data);
      },
      error: error => {
        console.warn('Error al filtrar medidass:', error);
      }
    });
  }

  borrarFiltros(): void {
    this.busqueda.cliente = '',
      this.busqueda.comprado = '',
      this.busqueda.viejo = ''
    this.filtro();
  }

  resetfiltros(): void {
    this.busqueda.comprado = 'false',
      this.busqueda.viejo = 'false'
  }

  onMedidasSelect(medidas: Medidas, event: any): void {
    if (event.target.checked) {
      this.selectedMedidass.push(medidas);
      console.log('Medidas seleccionada:', medidas);

    } else {
      const index = this.selectedMedidass.indexOf(medidas);
      if (index > -1) {
        this.selectedMedidass.splice(index, 1);
      }
    }
    console.log(this.selectedMedidass);
  }

  enviarACotizador(medidas: Medidas): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ancho: medidas.ancho,
        alto: medidas.alto
      }
    };
    this.router.navigate(['/cotizar/sistemas'], navigationExtras);
  }

  generarYDescargarPdf() {
    this.medidasService.generarPdf(this.clienteBuscado.telefono, this.clienteBuscado.direccion, this.selectedMedidass).subscribe({
      next: (response: Blob) => {
        // Obtener el tipo de contenido desde la respuesta
        const contentType = response.type;

        // Determinar el nombre del archivo en función del tipo de contenido
        let archivoN = 'medidas.zip';
        if (contentType.includes('pdf')) {
          archivoN = 'medidas.pdf';
        }

        // Crear un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = archivoN;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        this.lgModal2.hide();
      }, error: error => {
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  medidassCliente(): void {
    const agrupados = new Map<string, Medidas[]>();
    this.buscados.forEach(medidas => {
      const cliente = medidas.cliente || 'Desconocido';
      if (!agrupados.has(cliente)) {
        agrupados.set(cliente, []);
      }
      agrupados.get(cliente)?.push(medidas);
    });

    this.medidasAgrupadas = Array.from(agrupados, ([cliente, items]) => ({
      cliente,
      items: items.sort((b, a) => {
        const fechaA = a.fecha ? new Date(a.fecha).getTime() : 0;
        const fechaB = b.fecha ? new Date(b.fecha).getTime() : 0;
        return fechaA - fechaB;
      })
    }));
  }

  comprar(id: number): void {
    this.medidasService.comprar(id).subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        const medidas = this.buscados.find(p => p.id === id);

        if (medidas && medidas.sistema === 'TELA' && medidas.comprado == false) {
          this.tallerService.mover(medidas).subscribe(
            error => {
              console.warn('Error al encargar tela:', error);
              this.toastr.error(error.error, 'ERROR', {
                timeOut: 5000,
                positionClass: 'toast-bottom-center'
              });
            }
          );
        }
        window.location.reload();
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

  borrar(id: number): void {
    this.medidasService.borrar(id).subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        this.filtro()
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
}