import { Injectable } from '@angular/core';
import { API } from './api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private apiURL: string = API.URL + "marca"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Marca[]>(this.apiURL + '/lista')
  }

  uno(id: number): Observable<Marca> {
    return this.httpClient.get<Marca>(this.apiURL + `/uno/${id}`);
  }

  nuevo(marca: Marca): Observable<any> {
    return this.httpClient.post(this.apiURL + `/nuevo`, marca, {
      responseType: 'text'
    });
  }

  editar(id: number, marca: Marca): Observable<any> {
    return this.httpClient.put(this.apiURL + `/editar/${id}`, marca, {
      responseType: 'text'
    });
  }
    borrar(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + `/borrar/${id}`, { responseType: 'text' });
  }
}
