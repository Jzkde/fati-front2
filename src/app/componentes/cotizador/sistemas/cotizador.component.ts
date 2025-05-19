import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CortinasEspService } from 'src/app/service/cortinas-esp.service';
import { CotizadorService } from 'src/app/service/cotizador.service';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
})
export class CotizadorComponent implements OnInit {
  marca: string = '';

  sistema: string = '';
  precioSistema: number = 0;

  mecanismos: any[] = [];
  mecanismoN: string = '';

  telas: any[] = [];
  telaN: string = '';
  precioTela: number = 0;

  alto: number = 0;
  ancho: number = 0;

  colocaciones: any[] = [];
  colocN: string = '';
  precioColoc: number = 0;

  adicionales: any[] = [];
  adicional: number = 0;

  area: number = 0;

  resultado: any;

  cotizaciones: any[] = [];
  sumatoria: number = 0;
  contador: number = 1;

  error: string = "";

  constructor(
    private cotizadorService: CotizadorService,
    private cortEspecialesService: CortinasEspService,
    private serviciosService: ServiciosService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.ancho = +params['ancho'] || 0;
      this.alto = +params['alto'] || 0;
    });
  }

  ngOnInit(): void {
    const savedCotizaciones = localStorage.getItem('cotizaciones');
    const savedSumatoria = localStorage.getItem('sumatoria');

    if (savedCotizaciones) {
      this.cotizaciones = JSON.parse(savedCotizaciones);
    }

    if (savedSumatoria) {
      this.sumatoria = parseFloat(savedSumatoria);
    }
  }

  onMarca(): void {
    this.sistema = "";
  }

  onTelaChange() {
    const selectedTela = this.telas.find(t => t.tela === this.telaN);
    this.precioTela = selectedTela ? selectedTela.precio : 0;
  }

  onColocChange() {
    const coloc = this.colocaciones.find(c => c.nombre === this.colocN);
    this.precioColoc = coloc ? coloc.precio : 0;
    console.log(this.colocaciones);

  }

  onMecanismoChange() {
    const selectedMecanismo = this.mecanismos.find(m => m.tela === this.mecanismoN);
    this.precioSistema = selectedMecanismo ? selectedMecanismo.precio : 0;
  }

  onSistema(): void {
    this.telaN = '';
    this.mecanismoN = '';
    this.telas = [];
    this.mecanismos = [];
    this.precioTela = 0;
    this.precioSistema = 0;
    this.resultado = null;
    this.error = "";

    if (this.sistema) {
      this.serviciosService.getTipoServicio("COLOCACION").subscribe({
        next: (data) => {
          this.colocaciones = data;
        },
        error: error => {
          this.error = 'Error al cargar las colocaciones';
          this.colocaciones = [];
        }
      });
      this.cargarDatos();
    }
  }

  cargarDatos(): void {
    this.cortEspecialesService.telasPorMarca(this.marca, this.sistema).subscribe({
      next: (data) => {
        this.telas = data;
      },
      error: error => {
        console.log(error.error);
         this.toastr.error(error.error, 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-bottom-center'
      });

        this.error = 'Error al cargar las telas disponibles';
        this.telas = [];
      }
    });
    this.cortEspecialesService.sistemasPorMarca(this.marca, this.sistema).subscribe({
      next: (data) => {
        this.mecanismos = data;
      },
      error: error => {
        this.error = error.error;
        this.mecanismos = [];
      }
    });
    this.cortEspecialesService.sistemasPorMarca(this.marca, "adicional").subscribe({
      next: (data) => {
        this.adicionales = data;
      },
      error: error => {
        this.error =error.error;;
        this.adicionales = [];
      }
    });
  }

  cotizar(): void {
    const area = this.calcularArea();

    this.cotizadorService.cotizarSistemas(this.marca, this.telaN, this.alto, this.ancho, this.sistema)
      .subscribe({
        next: (data) => {
          this.resultado = data + this.precioColoc + this.adicional;
          this.error = "";
        },
        error: error => {
          this.resultado = null;
          this.error = error.error.text;
        }
      });
  }


  calcularArea(): number {
    return this.alto * this.ancho / 10000;
  }

  agregarCotizacion(): void {
    if (this.resultado && typeof this.resultado === 'number') {
      const nuevaCotizacion = {
        contador: this.contador,
        monto: this.resultado,
      };
      this.cotizaciones.push(nuevaCotizacion);
      this.sumatoria += this.resultado;
      this.resultado = null;
      this.contador++;
      localStorage.setItem('cotizaciones', JSON.stringify(this.cotizaciones));
      localStorage.setItem('sumatoria', this.sumatoria.toString());
    }
  }

  borrar(): void {
    this.cotizaciones = [];
    this.sumatoria = 0;
    this.contador = 1;
    localStorage.removeItem('cotizaciones');
    localStorage.removeItem('sumatoria');
  }
}
