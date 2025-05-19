import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Presupuesto } from 'src/app/models/Presupuesto';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { MedidasService } from 'src/app/service/medidas.service';

@Component({
  selector: 'app-presupuesto-form',
  templateUrl: './presupuesto-form.component.html',
  styleUrls: ['./presupuesto-form.component.css']
})
export class PresupuestoFormComponent implements OnInit {

  presupuesto: Presupuesto = {
    id: 0,
    sistema: '',
    ancho: 0,
    alto: 0,
    comando: 'NO_POSEE',
    apertura: 'NO_POSEE',
    clienteNombre: "",
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
        next: data => this.presupuesto = data,
        error: err => {
          this.toastr.error('Error al obtener las medidas');
          this.router.navigate(['/presupuesto/lista']);
        }
      });
    }
  }

  listaSistemas() {
    this.cortinasEspService.listaSistemas().subscribe({
      next: data => {
        this.sistemas = data;
        console.log(this.sistemas);
      }
    })
  }

  guardar(): void {
    const id = this.route.snapshot.params['id'];
    if (this.modoEdicion) {
      this.medidasService.editar(id, this.presupuesto).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/presupuesto/lista']);
        },
        error: err => {
          this.toastr.error(err.error);
          console.log(err);
        }
      });
    } else {
      this.medidasService.nuevo(this.presupuesto).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/presupuesto/lista']);
        },
        error: err => {
          this.toastr.error(err.error);
          console.log(err);
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
        console.error('Error al eliminar:', error.error);
        this.toastr.error("No se pudo eliminar el PRESUPUESTO", 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
}
