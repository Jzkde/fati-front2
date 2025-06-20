import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './api/api';
import { Medidas } from '../models/Medidas';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/Busqueda';

@Injectable({
  providedIn: 'root'
})
export class MedidasService {

  private apiURL: string = API.URL + 'medidas'

  constructor(private http: HttpClient) { }

  lista(): Observable<any[]> {
    return this.http.get<Medidas[]>(this.apiURL + '/lista')
  }

  uno(id: number): Observable<Medidas> {
    return this.http.get<Medidas>(this.apiURL + '/uno/' + id);
  }

  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/filtro', busqueda)
  }

  filtrouno(id: number): Observable<Medidas[]> {
    return this.http.get<Medidas[]>(this.apiURL + '/filtro/' + id);
  }

  nuevo(medidas: Medidas): Observable<string> {
    return this.http.post(this.apiURL + '/nuevo', medidas, {
      responseType: 'text'
    });
  }


  editar(id: number, medidas: Medidas): Observable<any> {
    return this.http.put(this.apiURL + '/editar/' + id, medidas)
  }

  borrar(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/borrar/' + id, {
      responseType: 'text'
    });
  }

  generarPdf(tel: string, direcc: string, medidass: any[]): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiURL + '/pdf', medidass, {
      headers,
      responseType: 'blob',
      params: { tel, direcc }
    });
  }

  comprar(id: number): Observable<any> {
    return this.http.get(this.apiURL + '/actualizar/' + id);
  }

  descargarPdf(tel: string, direcc: string, medidass: any[]): void {
    this.generarPdf(tel, direcc, medidass).subscribe(blob => {
      const filename = 'medidas.zip';
      saveAs(blob, filename);
    });
  }
}

function saveAs(blob: Blob, archivoN: string) {
  throw new Error('Function not implemented.');
}

