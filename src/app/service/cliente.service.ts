import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { Cliente } from '../models/Cliente';
import { Busqueda } from '../models/Busqueda';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiURL: string = API.URL + 'cliente'

  constructor(private http: HttpClient) { }

   filtro(busqueda: Busqueda): Observable<any[]> {
      return this.http.post<any[]>(this.apiURL + '/filtro', busqueda)
    }

   uno(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.apiURL + '/uno/' + id);
  }

  buscar(clienteN: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.apiURL + '/buscar', {
      params: { clienteN }
    });
  }

  nuevo(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiURL + '/nuevo', cliente, {
      responseType: 'text'
    });
  }

  editar(id: number, Cliente: Cliente): Observable<any> {
    return this.http.put(this.apiURL + '/editar/' + id, Cliente, {
      responseType: 'text'
    });
  }

  borrar(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/borrar/' + id, {
      responseType: 'text'
    });
  }
}
