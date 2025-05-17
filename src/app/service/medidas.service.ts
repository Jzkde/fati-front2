import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './api/api';
import { Presupuesto } from '../models/Presupuesto';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/Busqueda';

@Injectable({
  providedIn: 'root'
})
export class MedidasService {

  private apiURL: string = API.URL + "presupuesto/"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Presupuesto[]>(this.apiURL + 'lista')
  }

  uno(id: number): Observable<Presupuesto> {
    return this.httpClient.get<Presupuesto>(this.apiURL + `uno/${id}`);
  }

  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiURL + 'filtro', busqueda)
  }

  filtrouno(id: number): Observable<Presupuesto[]> {
    return this.httpClient.get<Presupuesto[]>(this.apiURL + `filtro/${id}`);
  }

  nuevo(presupuesto: Presupuesto): Observable<any> {
    return this.httpClient.post<Presupuesto>(this.apiURL + `nuevo/`, presupuesto)
  }

  editar(id: number, presupuesto: Presupuesto): Observable<any> {
    return this.httpClient.put(this.apiURL + `editar/${id}`, presupuesto)
  }

  borrar(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + `borrar/${id}`, { responseType: 'text' });
  }

  generarPdf(tel: string, direcc: string, presupuestos: any[]): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
    .set('tel', tel)
    .set('direcc', direcc)
    return this.httpClient.post(this.apiURL + 'pdf', presupuestos, {
      headers,
      responseType: 'blob',
      params
    });
  }

  descargarPdf(tel: string, direcc: string, presupuestos: any[]): void {
    this.generarPdf(tel, direcc, presupuestos).subscribe(blob => {
      const filename = 'presupuesto.zip';
      saveAs(blob, filename);
    });
  }

  comprar(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + `actualizar/${id}`);
  }
}

function saveAs(blob: Blob, archivoN: string) {
  throw new Error('Function not implemented.');
}

