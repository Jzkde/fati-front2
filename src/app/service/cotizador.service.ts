import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { Producto } from '../models/Producto';
import { Cotizado } from '../models/Cotizado';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  private apiURL: string = API.URL + "cotizar"

  constructor(private http: HttpClient) { }

  cotizarSistemas(marca: string, telaN: string, alto: number, ancho: number, sistema: string): Observable<any> {
    const params = new HttpParams()
      .set('telaN', telaN)
      .set('alto', alto.toString())
      .set('ancho', ancho.toString())
      .set('sistema', sistema);
    return this.http.get(this.apiURL + `/sistemas/` + marca, { params });
  }
  cotizarTelas(telaN: string, ancho: number, prop: number, tipoConf: string, accesorios: Producto[]): Observable<Cotizado> {
    let params = new HttpParams()
      .set('telaN', telaN)
      .set('ancho', ancho.toString())
      .set('prop', prop.toString())
      .set('tipoConf', tipoConf);

    return this.http.post<Cotizado>(this.apiURL + "/telas", accesorios, { params });
  }
}