import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {

  pedido: Pedido = {

    id: 0,
    fecha_pedido: '',
    provedor: '',
    via: '',
    n_pedido: '',
    n_factura: '',
    n_remito: '',
    monto: 0,
    llego: false,
    fecha_llegada: '',
    estado: '',
    responsable: '',
    clienteNombre: '',
    observaciones: '',
  }

  modoEdicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.toastr.clear();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
      this.pedidoService.uno(id).subscribe({
        next: data => this.pedido = data,
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/pedido/lista']);
        }
      });
    }
  }
  guardar(): void {
    const id = this.route.snapshot.params['id'];
    if (this.modoEdicion) {
      this.pedidoService.editar(id, this.pedido).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/pedido/lista']);
        },
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    } else {
      this.pedidoService.nuevo(this.pedido).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/pedido/lista']);
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
    this.pedidoService.borrar(id).subscribe({
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
