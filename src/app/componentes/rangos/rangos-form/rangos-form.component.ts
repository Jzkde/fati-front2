import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CortEspeciales } from 'src/app/models/CortEspeciales';
import { Marca } from 'src/app/models/Marca';
import { Sistema } from 'src/app/models/Sistema';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { MarcaService } from 'src/app/service/marca.service';
import { SistemaService } from 'src/app/service/sistema.service';

@Component({
  selector: 'app-rangos-form',
  templateUrl: './rangos-form.component.html',
  styleUrls: ['./rangos-form.component.css']
})
export class RangosFormComponent implements OnInit {

  marcas: Marca[] = []
  sistemas: Sistema[] = []
  marca: string = "";
  modoEdicion: boolean = false;
  mecanismo: CortEspeciales = {
    tela: '',
    precio: 0,
    marca: '',
    sistema: '',
    esTela: false,
    esAdicional: false,
    rangos: []
  };


  constructor(
    private cortinasEspService: CortinasEspService,
    private marcaService: MarcaService,
    private sistemasService: SistemaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }


  ngOnInit(): void {
    this.listaMarcas();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
      this.cortinasEspService.uno(id).subscribe({
        next: data => this.mecanismo = data,
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/sistemas/lista']);
        }
      });
      this.listaMarcas();
    }
  }

  listaMarcas() {
    this.marcaService.listaMarcasTipo(true).subscribe({
      next: data => {
        this.marcas = data;
        console.log(this.marcas);
      }
    });
  }

  listaSistemas() {
    this.sistemasService.listaXMarca(this.mecanismo.marca).subscribe({
      next: data => {
        this.sistemas = data;
        console.log(this.mecanismo.marca);

      }
    });
  }

  agregarRango() {
    this.mecanismo.rangos!.push({
      altoMin: 0,
      altoMax: 0,
      anchoMin: 0,
      anchoMax: 0,
      sistemaMin: 100,
      telaMin: 100
    });
  }

  eliminarRango(index: number) {
    this.mecanismo.rangos!.splice(index, 1);
  }

  guardar(): void {
    const id = this.route.snapshot.params['id'];
    if (this.modoEdicion) {
      this.cortinasEspService.editar(id, this.mecanismo).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/rangos/lista']);
        },
        error: error => {
          this.toastr.error(error.error, 'Error', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    } else {
      this.cortinasEspService.nuevo(this.mecanismo).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.router.navigate(['/rangos/lista']);
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
    this.cortinasEspService.borrar(id).subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        this.router.navigate(['/rangos/lista']);
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
