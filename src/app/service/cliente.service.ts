import { Injectable } from '@angular/core';
import { API } from './api/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiURL: string = API.URL + "cliente"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Cliente[]>(this.apiURL + '/lista')
  }

  uno(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.apiURL + `/uno/${id}`);
  }

  buscar(clienteN: string): Observable<any> { 
    const params = new HttpParams()
      .set('telaN', clienteN)
    return this.httpClient.get(this.apiURL + `/buscar`, { params });
  }

  nuevo(cliente: Cliente): Observable<any> {
    return this.httpClient.post(this.apiURL + `/nuevo`, cliente, {
      responseType: 'text'
    });
  }
  editar(id: number, Cliente: Cliente): Observable<any> {
    return this.httpClient.put(this.apiURL + `/editar/${id}`, Cliente, {
      responseType: 'text'
    });
  }

  borrar(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + `/borrar/${id}`, { responseType: 'text' });
  }
}
