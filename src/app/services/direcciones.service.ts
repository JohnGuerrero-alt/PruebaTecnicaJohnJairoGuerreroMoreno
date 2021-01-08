import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable , Subject} from 'rxjs';
import  {Constantes} from '../modules/enviroment';
import  { Usuario} from '../modules/usuario.interface';
import {ResponseI} from '../modules/estatus.interface';
import { tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  environment= Constantes;

  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

  constructor( private http: HttpClient)  { 
  }

 
  crearDireccion(form:Usuario): Observable<any>{
    
     let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.environment['0'].urlcrearDireccion, form, {headers: httpHeaders}).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  
  } 

  eliminarDireccion(id:any){
    const httpheaders = new HttpHeaders().set('Content-Type', 'application/json')
    const url = this.environment['0'].urleliminarDireccion + id; 
    return this.http.delete(url, {headers: httpheaders});
  }


  getAllDireccionByCorreo(correo:any){
    const parametros = new HttpParams().set('correo', correo)
    const url = this.environment['0'].urlserver //{{URL}/api/v1/direcciones
    return this.http.get(url, {params: parametros});
  }

  getDireccionById(id:any){

    const url = this.environment['0'].urleliminarDireccion+id;
    
  }

}
