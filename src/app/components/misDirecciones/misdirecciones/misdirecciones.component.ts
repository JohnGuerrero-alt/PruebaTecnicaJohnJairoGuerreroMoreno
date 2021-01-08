import { Component, OnInit } from '@angular/core';
import { DireccionesService} from '../../../services/direcciones.service';
import {  FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import  {listaCiudades} from '../../../modules/listas';
import { Constantes} from '../../../modules/enviroment';
import { Usuario } from 'src/app/modules/usuario.interface';
import { Observable} from 'rxjs';
import {map , filter} from 'rxjs/operators';


//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-misdirecciones',
  templateUrl: './misdirecciones.component.html',
  styleUrls: ['./misdirecciones.component.css']
})
export class MisdireccionesComponent implements OnInit {

  

  aItem: boolean = false;
  bItem: boolean = false;
  cItem: boolean = false;


  city: any = listaCiudades;
  comprobacion: any;
  todo: any;
  value: any;
  info: any;


  //constantes para la correción

  direcciones : any;
  misDirecciones : any;
  environment: any = Constantes;


  //////////////////////////////





//private fb: FormBuilder
  myForm = new FormGroup({

    correo: new FormControl(''),
    pais: new FormControl(''),
    departamento: new FormControl(''),
    ciudad: new FormControl(''),
    telefono1: new FormControl(''),
    telefono2: new FormControl(''),
    nombreEntrega: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    detalle: new FormControl(''),
    instruccionesEntrega: new FormControl(''),
    createdAt: new FormControl('')

  });


  postId;

  constructor( private direccionService: DireccionesService, private formulario: FormBuilder) {
    
   this.buscarDirecciones();
    this.inicializarFormulario();
    

   }


   //buscar direcciones
  buscarDirecciones(){
    console.log('Constantes: ' , this.environment['0'].useremail);
    this.direccionService.getAllDireccionByCorreo(this.environment['0'].useremail).subscribe(
      data => this.mostrarRegistroDirecciones(data),
      error => console.error(error.statusText),
    );
  }


  mostrarRegistroDirecciones(dato:any){
    console.log('data: ', dato)
    if(dato.data !== null && dato.data !== undefined) {
      this.direcciones = dato.objeto;
      console.log('data.objeto: ',dato.data)
      
    }

    this.actualizarPantalla(dato.count);
    this.todo = dato.data;
  }

  actualizarPantalla(datos:any){
     //comprobando que no hay direcciones inicialice el diseño a
     if(datos==0){
      this.bItem = false;
      this.aItem = true;
      console.log('diseño a: ', this.aItem);
    } // si una o mas direcciones inicialice el diseño b
    else {
      this.bItem = true;
      this.aItem = false;
      console.log('diseño b: ', this.bItem);
    }


  }



  //funcion para inicializar  los datos que va recibir el item c-new address
  inicializarFormulario(){
    this.myForm = this.formulario.group({

      nombreEntrega: ['', Validators.required],
      direccion: [ '', Validators.required],
      detalle: ['', Validators.required],
      telefono1: [ '', Validators.required],
      telefono2: [null],
      ciudad: [ '2', ],
      codigoPostal: ['', Validators.required],
      instruccionesEntrega: [''],
      pais: [Constantes['0'].pais],
      correo: [Constantes['0'].correo],
      departamento: ['10'],
      createdAt: [new Date().toISOString()]

    })
  }

  
 enviarDatos(form: Usuario){
   console.log(form);
  this.direccionService.crearDireccion(form).subscribe( (dato :any) => {
    console.log('dato: ', dato );
  })
   
 }

  ngOnInit(): void {
  }

}
