import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import  {Constantes} from '../modules/enviroment';
import  { Usuario} from '../modules/usuario.interface';
import {ResponseI} from '../modules/estatus.interface';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  environment= Constantes;

  url = 'http://134.122.12.120/api/v1/direcciones?correo=prueba@rymenergia.com.co';
 
//prueba@rymenergia.com.co
//jjguerrerom@correo.udistrital.edu.co
  constructor( private http: HttpClient)  { 
  }

  getAllDirecciones(): Observable<any>{
    
    let headerr = new HttpHeaders().set('Content-Type', '	application/json')
    return this.http.get(this.environment['0'].urlgetAllDirecciones, {headers: headerr});  
  }

  
  crearDireccion(form:Usuario): Observable<any>{
    
     let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.environment['0'].urlcrearDireccion, form, {headers: httpHeaders});

  
  } 


  getAllDireccionByCorreo(correo:any){
    const parametros = new HttpParams().set('correo', correo)
    const url = this.environment['0'].urlserver //{{URL}/api/v1/direcciones
    return this.http.get(url, {params: parametros});
  }

}
