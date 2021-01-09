import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Constantes } from '../modules/enviroment';
import { Usuario } from '../modules/usuario.interface';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  environment = Constantes;
  private _refresh$ = new Subject<void>();

  get refresh$() {
    return this._refresh$;
  }

  constructor(private http: HttpClient) {
  }

  actualizarDireccion(form: any, id: any) {
    let httpheaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(this.environment['0'].urlbase + id, form, { headers: httpheaders }).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  crearDireccion(form: Usuario): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.environment['0'].urlbase, form, { headers: httpHeaders }).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  eliminarDireccion(id: any) {
    const httpheaders = new HttpHeaders().set('Content-Type', 'application/json')
    const url = this.environment['0'].urlbase + id;
    return this.http.delete(url, { headers: httpheaders }).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  getAllDireccionByCorreo(correo: any): Observable<any> {
    const parametros = new HttpParams().set('correo', correo)
    const url = this.environment['0'].urlserver
    return this.http.get(url, { params: parametros });
  }

  getDireccionById(id: any) {
    const parametros = new HttpHeaders().set('Content-Type', 'application/json')
    const url = this.environment['0'].urleliminarDireccion + id;
    return this.http.get(url, { headers: parametros });
  }
}
