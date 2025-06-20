import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medidas } from 'src/app/models/Medidas';
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
  selectedMedidass: Medidas[] = [];
  medidasAgrupadas: { cliente: string, items: Medidas[] }[] = [];

  tel: string = ''
  direcc: string = ''

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
    estela: 'false',
    sistema: '',
    viejo: 'false',
    comprado: 'false'
  };

  constructor(
    private medidasService: MedidasService,
    private tallerService: TallerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filtro();
  }

  volver(): void {
    window.history.back();
  }

  filtro(): void {
    this.medidasService.filtro(this.busqueda).subscribe(
      data => {
        this.buscados = data;
        this.medidassCliente();
      },
      err => {
        console.error('Error al filtrar medidass:', err);
      }
    );
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
    } else {
      const index = this.selectedMedidass.indexOf(medidas);
      if (index > -1) {
        this.selectedMedidass.splice(index, 1);
      }
    }
    if (this.selectedMedidass.length > 0) {
      const cliente = this.selectedMedidass[0].clienteClase;
      this.tel = cliente?.telefono || '';
      this.direcc = cliente?.direccion || '';
      console.log(cliente);
    } else {
      // Si se deseleccionan todos, limpiar los campos
      this.tel = '';
      this.direcc = '';
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
    this.medidasService.generarPdf(this.tel, this.direcc, this.selectedMedidass).subscribe((response: Blob) => {
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
    }, error => {
      this.toastr.error(error.error, 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-bottom-center'
      });
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
            response => { },
            error => {
              console.error('Error al encargar tela:', error);
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
        console.error('Error al eliminar:', error);
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
        console.error('Error al eliminar:', error);
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
}