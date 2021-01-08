import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import  {Constantes} from '../modules/enviroment';
import  { Usuario} from '../modules/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constantes: any = Constantes;

  url = 'http://134.122.12.120/api/v1/direcciones?correo=prueba@rymenergia.com.co';
 
//prueba@rymenergia.com.co
//jjguerrerom@correo.udistrital.edu.co
  constructor( private http: HttpClient)  { 
  }

  getAllDirecciones(): Observable<any>{
    
    let headerr = new HttpHeaders().set('Content-Type', '	application/json')
    return this.http.get(this.constantes['0'].urlgetAllDirecciones, {
      headers: headerr
    });  
  }

  crearDireccion(form:Usuario ): Observable<any>{
    return this.http.post(this.constantes['0'].urlcrearDireccion, form);
  }

}
