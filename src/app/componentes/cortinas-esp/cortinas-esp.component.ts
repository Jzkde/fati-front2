import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CortEspeciales } from 'src/app/models/CortEspeciales';
import { Sistema } from 'src/app/models/Sistema';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-cortinas-esp',
  templateUrl: './cortinas-esp.component.html',
  styleUrls: ['./cortinas-esp.component.css']
})
export class CortinasEspComponent {

  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;

  archivo: File | null = null;
  marca: string = '';

  telas: CortEspeciales[] = [];
  nuevaTela: CortEspeciales = {
    id: 0,
    tela: '',
    precio: 0,
    esTela: false,
    sistema: Sistema.VACIO
  };

  porcen: number = 0;
  prod: any[] = []

  constructor(
    private cortinasEspService: CortinasEspService,
    private dbService: DbService,
    private toastr: ToastrService,
  ) { }

  archivoSelec(event: any) {
    this.archivo = event.target.files[0];
  }

  // Carga desde archivo
  carga() {
    if (this.archivo) {
      this.dbService.cargarSistemas(this.archivo).subscribe({
       next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        },
        error: error => {
          this.toastr.error(error.error, 'ERROR', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    }
  }

  agregar() {
    this.telas.push({ ...this.nuevaTela });
    this.nuevaTela = { id: 0, tela: '', precio: 0, esTela: false, sistema: Sistema.VACIO };
    console.log(this.telas);
  }

  quitarProducto(index: number) {
    this.telas.splice(index, 1);
  }

  esValido(): boolean {
    return (this.telas.length > 0 && this.marca !== '');
  }

  guardar() {
    this.prod = this.telas;
    this.cortinasEspService.nuevos(this.marca, this.prod).subscribe({
      next: (data) => {
        this.telas = [];
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      },
      error: error => {
        console.error('Error al guardar los datos:', error);
        this.toastr.error(error.error, 'Error', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  // Modificacion masiva de precios
  masivo() {
    if (this.porcen) {
      this.cortinasEspService.masivo(this.marca, this.porcen).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.porcen = 0
        },
        error: error => {
          if (error.error == "No hay TELAS cargadas") {
            console.error('Error:', error.error);
            this.toastr.error(error.error, 'ERROR', {
              timeOut: 5000,
              positionClass: 'toast-bottom-center'
            });
          } else {
            console.error('Error:', error);
            this.toastr.error("Proveedor NO seleccionado", 'ERROR', {
              timeOut: 5000,
              positionClass: 'toast-bottom-center'
            })
          };
        }
      });
    } else {
      this.toastr.error("Porcentaje NO especificado", 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-bottom-center'
      })
    }
  }
}
