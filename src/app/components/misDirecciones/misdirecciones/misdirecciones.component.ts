import { Component, OnInit } from '@angular/core';
import { DireccionesService} from '../../../services/direcciones.service';
import {  FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import  {listaCiudades} from '../../../modules/listas';
import { Constantes} from '../../../modules/enviroment';
import { Usuario } from 'src/app/modules/usuario.interface';
import { Observable , pipe} from 'rxjs';
import { tap  } from 'rxjs/operators';
import Swal from 'sweetalert2';


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
  id : any = '5ff8025cf13759969f51b082';


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
    this.direccionService.getAllDireccionByCorreo(this.environment['0'].useremail)
    .subscribe(
      data => this.mostrarRegistroDirecciones(data),
      error => console.error(error.statusText),
    );
  }

  mostrarRegistroDirecciones(dato:any){
    console.log('data: ', dato)
    if(dato.data !== null && dato.data !== undefined) {
      this.actualizarPantalla(dato.count);
      //guarda los datos en la variable que extraera los datos las cardview
      this.todo = dato.data;
    }
  }

  actualizarPantalla(datos:any){
     //comprobando que no hay direcciones inicialice el diseño a
     if(datos.count==0){
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

      _id: [],
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
    Swal.fire({
      title : 'Envio de información',
      text : 'Se ha enviado la información exitosamente',
      icon: 'success',
      confirmButtonText : 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cItem = false;
        this.bItem = true;
      }
    })
    
  })
  this.buscarDirecciones();

 }

 deleteDireccion(id: any , direccion:any){
   console.log('borrar: ', id);

   Swal.fire({
    title: '¿ Deseas eliminar '+ direccion + ' ?',
    text: "Una vez eliminado, no podrás obtenerlo de nuevo",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.direccionService.eliminarDireccion(id).subscribe( 
        (dato:any) => {
         console.log(dato);
        } 
        );
      Swal.fire(
        'Borrado!',
        'La dirección ha sido borrada',
        'success'
      )
      this.bItem = true;
    }
  })
 }

 editDireciones(){
   document.getElementById('agregareditar').innerHTML = "Editar dirección";
 }




  ngOnInit(): void {
  }

}
