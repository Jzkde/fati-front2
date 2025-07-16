declare var bootstrap: any;

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CortEspeciales } from 'src/app/models/CortEspeciales';
import { Marca } from 'src/app/models/Marca';
import { Resultado } from 'src/app/models/Resultado';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { DbService } from 'src/app/service/db.service';
import { MarcaService } from 'src/app/service/marca.service';
import { SistemaService } from 'src/app/service/sistema.service';

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
  adicional: boolean = false

  sistemas!: any
  telas: CortEspeciales[] = [];
  marcas: Marca[] = [];

  nuevaTela: CortEspeciales = {
    id: 0,
    tela: '',
    precio: 0,
    esTela: true,
    esAdicional: false,
    marca: '',
    sistema: ''
  };
  resultado: Resultado | null = null;
  porcen: number = 0;
  prod: any[] = [];

  constructor(
    private cortinasEspService: CortinasEspService,
    private sistemasService: SistemaService,
    private marcaService: MarcaService,
    private dbService: DbService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.listaSistemas()
    this.listaMarcas()
  }

  archivoSelec(event: any): void {
    this.archivo = event.target.files[0];
  }

  listaSistemas() {
    this.sistemasService.listaTotal().subscribe({
      next: data => {
        this.sistemas = data;
        console.log(this.sistemas);
      }
    })
  }

  listaMarcas() {
    this.marcaService.listaMarcasTipo(true).subscribe({
      next: data => {
        this.marcas = data;
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
  const nueva = {
    ...this.nuevaTela,
    marca: this.marca,
    esTela: !this.adicional,
    esAdicional: this.adicional
  };

  this.telas.push(nueva);

  this.nuevaTela = {
    id: 0,
    tela: '',
    marca: this.marca,
    precio: 0,
    esTela: !this.adicional,
    esAdicional: this.adicional,
    sistema: ''
  };

  console.log(this.telas);
  console.log(this.marca);
}


  quitarProducto(index: number): void {
    this.telas.splice(index, 1);
  }

  tieneMarca(): boolean {
    return this.marca !== ''
  }

  esValido(): boolean {
    return (this.telas.length > 0 && this.tieneMarca());
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
        console.warn('Error al guardar los datos:', error);
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
          console.warn('Error:', error);
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
