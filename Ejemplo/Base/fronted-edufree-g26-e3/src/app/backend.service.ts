import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  deleteRequest(controlador: string, id: string): Observable<any> {

    const url = this.rutaRaiz + '/' + controlador + '/' + id;
    return this.http.delete(
      url,
      {
        headers: { 'content-type': 'application/json' }
      });
  }

  rutaRaiz = 'http://localhost:3000/';
  token = '';

  constructor(private http: HttpClient) {

    const tk = localStorage.getItem('tk');

    if (tk) {
      this.token = tk;
    }

   }

  getRequest(controlador: string): Observable<any> {
    return this.http.get(
      this.rutaRaiz + '/' + controlador,
      {
        headers: { 'Authorization': `Bearer ${this.token}` }
      }

    );
  }

  postRequest(controlador: string, datos: string): Observable<any> {

    const url = this.rutaRaiz + controlador;
    return this.http.post(
      url,
      datos, {
      headers: { 'content-type': 'application/json' }
    });
  }

  patchRequest(controlador: string, id:string, datos: string): Observable<any> {

    const url = this.rutaRaiz + controlador + '/' + id;	
    return this.http.patch(
      url,
      datos, {
      headers: { 'content-type': 'application/json' }
    });
  }

autenticar(credenciales: string): Observable < any > {
  // const filter = '{"where":' + credenciales + '}';
  // const filterencode = encodeURIComponent(filter);
  // return this.http.get(this.rutaRaiz + '/usuarios?filter=' + filterencode);


  return this.http.post(

    this.rutaRaiz + '/autenticar',
    credenciales,
   {
      headers: { 'content-type': 'application/json' }
    }

  );
}
}
