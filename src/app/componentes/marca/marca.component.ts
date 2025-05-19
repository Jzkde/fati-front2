import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { ClienteService } from 'src/app/service/cliente.service';
import { MarcaService } from 'src/app/service/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  marcas: Marca[] = [];
  columnasMarcas: Marca[][] = [];

  constructor(
    private marcaService: MarcaService,
    private toastr: ToastrService,
  ) { }


  ngOnInit(): void {
    this.toastr.clear();
    this.lista();
  }

  lista(): void {
    this.marcaService.lista().subscribe({
      next: data => {
        this.marcas = data.sort((a, b) =>
          a.marca.toLowerCase().localeCompare(b.marca.toLowerCase())
        );
        this.organizarEnColumnas();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  organizarEnColumnas(): void {
    const size = 10;
    this.columnasMarcas = [];
    for (let i = 0; i < this.marcas.length; i += size) {
      this.columnasMarcas.push(this.marcas.slice(i, i + size));
    }
  }
}
