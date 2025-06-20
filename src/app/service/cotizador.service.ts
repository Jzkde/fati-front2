import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { Producto } from '../models/Producto';
import { Cotizado } from '../models/Cotizado';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  private apiURL: string = API.URL + 'cotizar'

  constructor(private http: HttpClient) { }

  cotizarSistemas(marca: string, telaN: string, alto: number, ancho: number, sistemaN: string): Observable<any> {
    return this.http.get(this.apiURL + '/sistemas/' + marca, {
      params: { telaN, alto, ancho, sistemaN }
    });
  }

  cotizarTelas(telaN: string, ancho: number, prop: number, tipoConf: string, accesorios: Producto[]): Observable<Cotizado> {
    return this.http.post<Cotizado>(this.apiURL + '/telas', accesorios, {
      params: { telaN, prop, ancho, tipoConf }
    });
  }
}