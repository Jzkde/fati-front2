import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medidas } from 'src/app/models/Medidas';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { MedidasService } from 'src/app/service/medidas.service';
import { SistemaService } from 'src/app/service/sistema.service';

@Component({
  selector: 'app-medidas-form',
  templateUrl: './medidas-form.component.html',
  styleUrls: ['./medidas-form.component.css']
})
export class MedidasFormComponent implements OnInit {

  medidas: Medidas = {
    id: 0,
    sistema: '',
    ancho: 0,
    alto: 0,
    comando: 'NO_POSEE',
    apertura: 'NO_POSEE',
    cliente: "",
    accesorios: '',
    ambiente: '',
    observaciones: '',
    fecha: '',
    caida: ''
  }
  sistemas!: any
  modoEdicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private medidasService: MedidasService,
    private sistemasService: SistemaService,
    private toastr: ToastrService,
    private router: Router,
    private cortinasEspService: CortinasEspService
  ) { }

  ngOnInit(): void {
    this.toastr.clear();
    this.listaSistemas()
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
      this.medidasService.uno(id).subscribe({
        next: data => this.medidas = data,
        error: () => {
          this.toastr.error('Error al obtener las medidas');
          this.router.navigate(['/medidas/lista']);
        }
      });
    }
  }

  listaSistemas() {
    this.sistemasService.listaXTipo(true).subscribe({
      next: data => {
        this.sistemas = data;
      }
    });
  }

  guardar(): void {
    const id = this.route.snapshot.params['id'];
    if (this.modoEdicion) {
      this.medidasService.editar(id, this.medidas).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          console.log(data);

          this.router.navigate(['/medidas/lista']);
        },
        error: error => {
          this.toastr.error(error.error);
          console.log(error);
        }
      });
    } else {
      this.medidasService.nuevo(this.medidas).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/medidas/lista']);
        },
        error: error => {
          this.toastr.error(error.error);
          console.log(error);
        }
      });
    }
  }

  borrar(id: number): void {
    this.medidasService.borrar(id).subscribe({
      next: data => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      },
      error: error => {
        console.warn('Error al eliminar:', error.error);
        this.toastr.error("No se pudo eliminar las MEDIDAS", 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
}
