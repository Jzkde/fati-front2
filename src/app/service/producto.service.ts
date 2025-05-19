import { Injectable } from '@angular/core';
import { API } from './api/api';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/Producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private apiURL: string = API.URL + 'prod'

  constructor(private http: HttpClient) { }

  lista(): Observable<any[]> {
    return this.http.get<Producto[]>(this.apiURL + '/lista/total')
  }

  filtroUno(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.apiURL + '/uno/' + id);
  }

  editar(marca: string, id: number, prod: Producto): Observable<any> {
    return this.http.put(this.apiURL + '/editar/' + id, prod, {
      params: { marca }, responseType: 'text'
    });
  }

  borrar(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/borrar/' + id, {
      responseType: 'text'
    });
  }

  masivo(marca: string, porcentaje: number): Observable<any> {
    return this.http.put(this.apiURL + '/masivo', {}, {
      params: { porcentaje, marca }, responseType: 'text'
    });
  }

  nuevos(productos: Producto[]): Observable<any> {
    return this.http.post(this.apiURL + '/varios', productos, {
      responseType: 'text'
    });
  }
}
