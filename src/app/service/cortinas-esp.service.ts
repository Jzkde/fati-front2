import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  listaTotal(): Observable<any[]> {
    return this.http.get<[CortEspeciales]>(this.apiURL + '/lista/total', {
    });
  }

  telasPorMarca(marca: string, sistema: string, adicional: boolean): Observable<[]> {
    return this.http.get<[]>(this.apiURL + '/telas', {
      params: { marca, sistema, adicional }
    });
  }

  mecanismosPorMarca(marca: string, sistema: string): Observable<[]> {
    return this.http.get<[]>(this.apiURL + '/sistemas', {
      params: { marca, sistema }
    });
  }

  nuevos(marca: string, telas: CortEspeciales[]): Observable<any> {
    return this.http.post(this.apiURL + '/varios', telas, {
      params: { marca }, responseType: 'text'
    });
  }

  nuevo(mecanismo: CortEspeciales): Observable<any> {
    return this.http.post(this.apiURL + '/nuevo', mecanismo, {
      responseType: 'text'
    });
  }

  masivo(marca: string, porcentaje: number): Observable<any> {
    return this.http.put(this.apiURL + '/masivo', {}, {
      params: { porcentaje, marca }, responseType: 'text'
    });
  }

  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/filtro', busqueda)
  }

  uno(id: number): Observable<CortEspeciales> {
    return this.http.get<any>(this.apiURL + '/uno/' + id);
  }

  editar(id: number, prod: CortEspeciales): Observable<any> {
    return this.http.put(this.apiURL + '/editar/' + id, prod, {
      responseType: 'text'
    });
  }

  borrar(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/borrar/' + id, {
      responseType: 'text'
    });
  }
}
