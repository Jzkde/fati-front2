import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './api/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }
  private apiDb: string = API.URL + "db"

  cargarSistemas(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.apiDb + "/carga/sistemas", formData, { responseType: 'text' });
  }

  cargarAcce(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.apiDb + "/carga/acce", formData, { responseType: 'text' });
  }

  exportarDb() {
    return this.http.get(this.apiDb + '/backup', { responseType: 'text' });
  }

  asociar() {
    return this.http.get(API.URL + 'asociar', { responseType: 'text' });
  }

}
