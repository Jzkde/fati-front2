import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { MarcaService } from 'src/app/service/marca.service';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css']
})
export class MarcaFormComponent implements OnInit {

  marca: Marca = {
    marca: ""
  }

  modoEdicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private marcaService: MarcaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
      this.marcaService.uno(id).subscribe({
        next: data => this.marca = data,
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/marca/lista']);
        }
      });
    }
  }

  guardar(): void {
    const id = this.route.snapshot.params['id'];
    if (this.modoEdicion) {
      this.marcaService.editar(id, this.marca).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/marca/lista']);
        },
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    } else {
      this.marcaService.nuevo(this.marca).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/marca/lista']);
        },
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    }
  }
  
  borrar(id: number): void {
    this.marcaService.borrar(id).subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      },
      error: error => {
        console.error('Error al eliminar:', error);
        this.toastr.error(error.error, 'Error', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
}