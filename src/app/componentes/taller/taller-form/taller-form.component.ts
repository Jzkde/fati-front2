import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Taller } from 'src/app/models/Taller';
import { TallerService } from 'src/app/service/taller.service';

@Component({
  selector: 'app-taller-form',
  templateUrl: './taller-form.component.html',
  styleUrls: ['./taller-form.component.css']
})
export class TallerFormComponent  implements OnInit {

  confeccion: Taller = {
    ancho: 0,
    alto: 0,
    apertura: '',
    accesorios: '',
    ambiente: '',
    observaciones: '',
    clienteNombre: '',
    fecha_pedido: '',
    fecha_entrega: '',
    estado: '',
    llego: false
  }

  modoEdicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tallerService: TallerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
      this.tallerService.uno(id).subscribe({
        next: data => this.confeccion = data,
        error: err => {
          this.toastr.error('Error al obtener la confección');
          this.router.navigate(['/taller/lista']);
        }
      });
    }
  }

  guardar(): void {
    const id = this.route.snapshot.params['id'];
    if (this.modoEdicion) {
      this.tallerService.editar(id, this.confeccion).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/taller/lista']);
        },
        error: err => {
          this.toastr.error('Error al actualizar');
          console.log(err);
        }
      });
    } else {
      this.tallerService.nuevo(this.confeccion).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/taller/lista']);
        },
        error: err => {
          this.toastr.error('Error al crear');
          console.log(err);
        }
      });
    }
  }
 borrar(id: number): void {
    this.tallerService.borrar(id).subscribe({
      next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
      },
     error: error => {
        console.error('Error al eliminar:', error.error);
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
 });
  }
}
