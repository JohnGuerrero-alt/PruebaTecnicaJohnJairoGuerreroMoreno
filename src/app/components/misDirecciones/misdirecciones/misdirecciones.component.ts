import { Component, OnInit } from '@angular/core';
import { DireccionesService} from '../../../services/direcciones.service';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import  {listaCiudades} from '../../../modules/listas';
import { Constantes} from '../../../modules/enviroment';
import { map, filter} from 'rxjs/operators'; 
import {pipe, of} from 'rxjs';


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


  constantes: any = Constantes;
  city: any = listaCiudades;
  comprobacion: any;
  correo: any;
  todo: any;
  public infor: any;
  value: any;
//private fb: FormBuilder

  myForm: FormGroup;  
  constructor( private direccionService: DireccionesService, private formulario: FormBuilder) {
    
    this.comprobar();
    this.inicializarFormulario();
    
    

   }



   //función para comprobar si hay direcciones o no 
  comprobar() {
    this.direccionService.getAllDirecciones().subscribe((datoo: any) => {


      this.todo = datoo.data['0'];
      this.todo = Array.of(this.todo);
      this.infor = this.todo;
      this.comprobacion = datoo.count;
        console.log('todo: ', this.todo)
        console.log('conversor: ', this.comprobacion);
      
        //comprobando que no hay direcciones inicialice el diseño a
        if(this.comprobacion==0){
          this.bItem = false;
          this.aItem = true;
          console.log('diseño a: ', this.aItem);
        } // si una o mas direcciones inicialice el diseño b
        else {
          this.bItem = true;
          this.aItem = false;
          console.log('diseño b: ', this.bItem);
          //ahora que detecte la ciudad

          console.log('ciudad: ', listaCiudades);  
          console.log('city: ' , this.city)
          console.log('pais: ', this.constantes['0'].pais)

        }
  
      });  

  }

  //funcion para inicializar  los datos que va recibir el item c-new address
  inicializarFormulario(){
    this.myForm = this.formulario.group({

      nombreEntrega: ['', Validators.required],
      direccion: [ '', Validators.required],
      detalle: ['', Validators.required],
      telefono1: [ '', Validators.required],
      telefono2: [null],
      ciudad: [ '', Validators.required],
      codigoPostal: ['', Validators.required],
      instruccionesEntrega: [''],
      pais: [this.constantes['0'].pais],
      _id: [''],
      correo: [this.constantes['0'].correo],
      departamento: [''],
      createdAt: [new Date().toISOString()]

    })
  }

  enviarDatos(value){
    console.log('city            :' , this.city);
    
    console.log(value);
    value = Array.of(value);
    console.log(' value.ciudad: ', value['0'].ciudad);
    console.log('ciudad.nom_mpio: ', this.city);
    value = value['0'];
    this.value = value;
    
    this.direccionService.crearDireccion().subscribe((datoo:any ) => {
      
    });


  }
 

  ngOnInit(): void {
    
  }

}
