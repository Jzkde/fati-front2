import { Injectable } from '@angular/core';
import { API } from './api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private apiURL: string = API.URL + 'marca'

  constructor(private http: HttpClient) { }

  lista(): Observable<any[]> {
    return this.http.get<Marca[]>(this.apiURL + '/lista')
  }

  listaMarcasTipo(esSistema: boolean): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiURL + '/sistema', {
      params: { esSistema: esSistema.toString() }
    });
  }

  uno(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.apiURL + '/uno/' + id);
  }

  nuevo(marca: Marca): Observable<any> {
    return this.http.post(this.apiURL + '/nuevo', marca, {
      responseType: 'text'
    });
  }

  editar(id: number, marca: Marca): Observable<any> {
    return this.http.put(this.apiURL + '/editar/' + id, marca, {
      responseType: 'text'
    });
  }

  borrar(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/borrar/' + id, {
      responseType: 'text'
    });
  }
}
