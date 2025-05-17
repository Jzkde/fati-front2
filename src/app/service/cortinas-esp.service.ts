import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { CortEspeciales } from '../models/CortEspeciales';
import { Busqueda } from '../models/Busqueda';

@Injectable({
  providedIn: 'root'
})
export class CortinasEspService {

  constructor(private http: HttpClient) { }

  private apiURL: string = API.URL + "cortespeciales"

  getTelas(marca: string, sistema: string): Observable<[]> {
    const url = `${this.apiURL}telas?marca=${marca}&sistema=${sistema}`;
    return this.http.get<[]>(this.apiURL + `/telas`, {
      params: { marca, sistema }
    });
  }

  getSistemas(marca: string, sistema: string): Observable<[]> {
    return this.http.get<[]>(this.apiURL + `/sistemas`, {
      params: { marca, sistema }
    });
  }

  nuevos(marca: string, telas: CortEspeciales[]): Observable<any> {
    let params = new HttpParams()
      .set('marca', marca)
    return this.http.post(this.apiURL + "/varios", telas, { params, responseType: 'text' });
  }

  masivo(marca: string, porcentaje: number): Observable<any> {
    const params = new HttpParams()
      .set('porcentaje', porcentaje.toString())
      .set('marca', marca);
    return this.http.put(this.apiURL + '/masivo', {}, { params, responseType: 'text' });
  }

  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/filtro', busqueda)
  }

  filtroUno(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + `/uno/${id}`);
  }

  editar(marca: string, id: number, prod: CortEspeciales): Observable<any> {
    let params = new HttpParams()
      .set('marca', marca)
    return this.http.put(this.apiURL + `/editar/${id}`,  prod , { params,   responseType: 'text' });
  }

  borrar(id: number): Observable<any> {
    return this.http.delete(this.apiURL + `/borrar/${id}`, { responseType: 'text' });
  }

}
