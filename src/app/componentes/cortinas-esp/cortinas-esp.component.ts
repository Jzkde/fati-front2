declare var bootstrap: any;

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CortEspeciales } from 'src/app/models/CortEspeciales';
import { Resultado } from 'src/app/models/Resultado';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-cortinas-esp',
  templateUrl: './cortinas-esp.component.html',
  styleUrls: ['./cortinas-esp.component.css']
})
export class CortinasEspComponent implements OnInit {

  
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;

  archivo: File | null = null;
  marca: string = '';
  sistemas!: any
  telas: CortEspeciales[] = [];
  nuevaTela: CortEspeciales = {
    id: 0,
    tela: '',
    precio: 0,
    esTela: false,
    marca: '',
    sistema: ''
  };
  resultado: Resultado | null = null;
  porcen: number = 0;
  prod: any[] = [];

  constructor(
    private cortinasEspService: CortinasEspService,
    private dbService: DbService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.listaSistemas()
  }

  archivoSelec(event: any): void {
    this.archivo = event.target.files[0];
  }

  listaSistemas() {
    this.cortinasEspService.listaSistemas().subscribe({
      next: data => {
        this.sistemas = data;
        console.log(this.sistemas);
      }
    })
  }

 carga(): void {
  if (this.archivo) {
    this.dbService.cargarSistemas(this.archivo).subscribe({
      next: (data: Resultado) => {
        this.resultado = data;
        console.log(data);

        if (data.errores.length > 0) {
          const modal = new bootstrap.Modal(document.getElementById('erroresModal')!);
          modal.show();
        } else {
          this.toastr.success('Carga completada correctamente', 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
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


  agregar(): void {
    this.telas.push({ ...this.nuevaTela });
    this.nuevaTela = { id: 0, tela: '',marca:'', precio: 0, esTela: false, sistema: '' };
    console.log(this.telas);
  }

  quitarProducto(index: number): void {
    this.telas.splice(index, 1);
  }

  esValido(): boolean {
    return (this.telas.length > 0 && this.marca !== '');
  }

  guardar(): void {
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

  masivo(): void {
    if (this.porcen) {
      this.cortinasEspService.masivo(this.marca, this.porcen).subscribe({
        next: (data) => {
          this.toastr.success(data, 'OK', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
          this.porcen = 0;
        },
        error: error => {
          const msg = error.error === "No hay TELAS cargadas"
            ? error.error
            : "Proveedor NO seleccionado";
          console.error('Error:', error);
          this.toastr.error(msg, 'ERROR', {
            timeOut: 5000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    } else {
      this.toastr.error("Porcentaje NO especificado", 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-bottom-center'
      });
    }
  }
}
