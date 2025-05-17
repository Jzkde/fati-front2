import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Confeccion } from '../models/Confeccion';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { Busqueda } from '../models/Busqueda';
import { Presupuesto } from '../models/Presupuesto';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  private apiURL: string = API.URL + "taller"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Confeccion[]>(this.apiURL + '/lista')
  }

  uno(id: number): Observable<Confeccion> {
    return this.httpClient.get<Confeccion>(this.apiURL + `/lista/${id}`);
  }

  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiURL + '/filtro', busqueda)
  }

  filtrouno(id: number): Observable<Confeccion[]> {
    return this.httpClient.get<Confeccion[]>(this.apiURL + `/filtro/${id}`);
  }

  nuevo(Confeccion: Confeccion): Observable<any> {
    return this.httpClient.post<Confeccion>(this.apiURL + `/nuevo/`, Confeccion)
  }

  editar(id: number, Confeccion: Confeccion): Observable<any> {
    return this.httpClient.put(this.apiURL + `/editar/${id}`, Confeccion)
  }

  borrar(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + `/borrar/${id}`, { responseType: 'text' });
  }

  mover(presupuesto: Presupuesto): Observable<any> {
    return this.httpClient.post(this.apiURL + `/mover/`, presupuesto);
  }

  entregar(id: number): Observable<any> {
    return this.httpClient.put(this.apiURL + `/actualizar/${id}`, {}, { responseType: 'text' });
  }

}
