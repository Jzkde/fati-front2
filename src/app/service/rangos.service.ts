import { Injectable } from '@angular/core';
import { API } from './api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rangos } from '../models/Rangos';

@Injectable({
  providedIn: 'root'
})
export class RangosService {

   private apiURL: string = API.URL + 'rangos'
 
   constructor(private http: HttpClient) { }
 
 lista(): Observable<any[]> {
    return this.http.get<Rangos[]>(this.apiURL + '/lista')
  }

}
