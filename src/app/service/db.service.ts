import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './api/api';
import { Observable } from 'rxjs';
import { Resultado } from '../models/Resultado';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  private apiURL: string = API.URL + 'db'

  cargarSistemas(file: File): Observable<Resultado> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Resultado>(this.apiURL + '/carga/sistemas', formData);
  }

  cargarAcce(file: File): Observable<Resultado> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Resultado>(this.apiURL + '/carga/acce', formData);
  }

  exportarDb() {
    return this.http.get(this.apiURL + '/backup', {
      responseType: 'text'
    });
  }

  asociar() {
    return this.http.get(API.URL + 'asociar', {
      responseType: 'text'
    });
  }
}
