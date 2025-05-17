import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiURL: string = API.URL + "fati"

  constructor(private http: HttpClient) { }

  lista(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/lista')
  }

  getTipoServicio(tipo: string): Observable<[]> {
    return this.http.get<[]>(this.apiURL + '/lista/tipo', {
      params: { tipo }
    });
  }
  filtroUno(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + `/uno/${id}`);
  }
  editar(id: number, Cliente: Servicio): Observable<any> {
    return this.http.put(this.apiURL + `/editar/${id}`, Cliente, {
      responseType: 'text'
    });
  }
  borrar(id: number): Observable<any> {
    return this.http.delete(this.apiURL + `/borrar/${id}`, { responseType: 'text' });
  }
  nuevo(servicio: Servicio): Observable<any> {
    return this.http.post(this.apiURL + "/nuevo", servicio, { responseType: 'text' });
  }
}
