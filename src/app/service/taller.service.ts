import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Confeccion } from '../models/Confeccion';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { Busqueda } from '../models/Busqueda';
import { Medidas } from '../models/Medidas';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  private apiURL: string = API.URL + 'taller'

  constructor(private http: HttpClient) { }

  lista(): Observable<any[]> {
    return this.http.get<Confeccion[]>(this.apiURL + '/lista')
  }

  uno(id: number): Observable<Confeccion> {
    return this.http.get<Confeccion>(this.apiURL + '/lista/' + id);
  }

  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/filtro', busqueda)
  }

  filtrouno(id: number): Observable<Confeccion[]> {
    return this.http.get<Confeccion[]>(this.apiURL + '/filtro/' + id);
  }

  nuevo(Confeccion: Confeccion): Observable<any> {
    return this.http.post<Confeccion>(this.apiURL + '/nuevo', Confeccion)
  }

  editar(id: number, Confeccion: Confeccion): Observable<any> {
    return this.http.put(this.apiURL + '/editar/' + id, Confeccion)
  }

  borrar(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/borrar/' + id, {
      responseType: 'text'
    });
  }

  mover(medidas: Medidas): Observable<any> {
    return this.http.post(this.apiURL + '/mover/', medidas);
  }

  entregar(id: number): Observable<any> {
    return this.http.put(this.apiURL + '/actualizar/' + id, {}, {
      responseType: 'text'
    });
  }
}
