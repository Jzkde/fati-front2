import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { Sistema } from 'src/app/models/Sistema';
import { MarcaService } from 'src/app/service/marca.service';
import { SistemaService } from 'src/app/service/sistema.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {
  marcaSelec: string = ""
  marcas: Marca[] = [];
  sistemas: Sistema[] = [];
  columnasSistemas: Sistema[][] = [];

  constructor(
    private sistemaService: SistemaService,
    private marcaService: MarcaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.listaSistema()
  }

  listaSistema(): void {
    this.sistemaService.listaTotal().subscribe({
      next: data => {
        this.sistemas = data;
        this.organizarEnColumnas();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  organizarEnColumnas(): void {
    const size = 10;
    this.columnasSistemas = [];
    for (let i = 0; i < this.sistemas.length; i += size) {
      this.columnasSistemas.push(this.sistemas.slice(i, i + size));
    }
  }
}
