import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './api/api';
import { Observable } from 'rxjs';
import { Sistema } from '../models/Sistema';


@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  private apiURL: string = API.URL + 'sistemas'

  constructor(private http: HttpClient) { }

  listaXMarca(marca: string): Observable<any[]> {
    return this.http.get<Sistema[]>(this.apiURL + "/por/" + marca)
  }

  listaTotal(): Observable<any[]> {
    return this.http.get<Sistema[]>(this.apiURL + "/lista")
  }

  listaXTipo(esSistema: boolean): Observable<Sistema[]> {
    return this.http.get<Sistema[]>(this.apiURL + "/lista/tipo", {
      params: { esSistema }
    })
  }

  uno(id: number): Observable<Sistema> {
    return this.http.get<Sistema>(this.apiURL + '/uno/' + id);
  }

  nuevo(marca: Sistema): Observable<any> {
    return this.http.post(this.apiURL + '/nuevo', marca, {
      responseType: 'text'
    });
  }

  editar(id: number, marca: Sistema): Observable<any> {
    return this.http.put(this.apiURL + '/editar/' + id, marca, {
      responseType: 'text'
    });
  }
}

