import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './api/api';
import { Pedido } from '../models/Pedido';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/Busqueda';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiURL: String = API.URL + "pedido/"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Pedido[]>(this.apiURL + 'lista')
  }

  uno(id: number): Observable<Pedido> {
    return this.httpClient.get<Pedido>(this.apiURL + `uno/${id}`);
  }

  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiURL + 'filtro', busqueda)
  }

  nuevo(pedido: Pedido): Observable<any> {
    return this.httpClient.post<Pedido>(this.apiURL + `nuevo`, pedido)
  }

  filtrouno(id: number): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(this.apiURL + `filtro/${id}`);
  }

  actualizar(id: number, llego: string): Observable<any> {
      let params = new HttpParams()
          .set('llego', llego)
    return this.httpClient.put(this.apiURL + `actualizar/${id}`,{}, { params });
  }

  editar(id: number, pedido: Pedido): Observable<any> {
    return this.httpClient.put(this.apiURL + `editar/${id}`, pedido)
  }

  borrar(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + `borrar/${id}`, { responseType: 'text' });
  }
}
