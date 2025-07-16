import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { Sistema } from 'src/app/models/Sistema';
import { MarcaService } from 'src/app/service/marca.service';
import { SistemaService } from 'src/app/service/sistema.service';

@Component({
  selector: 'app-sistema-form',
  templateUrl: './sistema-form.component.html',
  styleUrls: ['./sistema-form.component.css']
})
export class SistemaFormComponent implements OnInit {

  marcas: Marca[] = []

  modoEdicion: boolean = false;

  sistema: Sistema = {
    sistema: "",
    esSistema: null,
    marcas: []
  }

  constructor(
    private route: ActivatedRoute,
    private sistemasService: SistemaService,
    private marcaService: MarcaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
      this.sistemasService.uno(id).subscribe({
        next: data => this.sistema = data,
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/sistemas/lista']);
        }
      });
    }
  }

  guardar(): void {
    const id = this.route.snapshot.params['id'];
    if (this.modoEdicion) {
      this.sistemasService.editar(id, this.sistema).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/sistemas/lista']);
        },
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    } else {
      this.sistemasService.nuevo(this.sistema).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/sistemas/lista']);
        },
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    }
    console.log(this.sistema);
  }

  listaMarca(): void {
    this.marcaService.listaMarcasTipo(this.sistema.esSistema!).subscribe({
      next: data => {
        this.marcas = data
      },
      error: error => {
        console.log(error);
      }
    });
  }


  cambioEsSistema(): void {
    this.sistema.esSistema;
    this.listaMarca();
  }
}