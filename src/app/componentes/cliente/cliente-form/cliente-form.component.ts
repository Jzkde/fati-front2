import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente = {
    nombre: "",
    direccion: "",
    telefono: "",
  }

  modoEdicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
      this.clienteService.uno(id).subscribe({
        next: data => this.cliente = data,
        error: err => {
          this.toastr.error('Error al obtener el Cliente');
          this.router.navigate(['/cliente/lista']);
        }
      });
    }
  }

  guardar(): void {
    const id = this.route.snapshot.params['id'];
    if (this.modoEdicion) {
      this.clienteService.editar(id, this.cliente).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/cliente/lista']);
        },
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    } else {
      this.clienteService.nuevo(this.cliente).subscribe({
       next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/cliente/lista']);
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
    this.clienteService.borrar(id).subscribe({
      next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        this.router.navigate(['/cliente/lista']);
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