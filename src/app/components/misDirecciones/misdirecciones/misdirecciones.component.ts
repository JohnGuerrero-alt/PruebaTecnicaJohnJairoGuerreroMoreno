import { Component, OnInit } from '@angular/core';
import { DireccionesService} from '../../../services/direcciones.service';
import {  FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import  {listaCiudades} from '../../../modules/listas';
import { Constantes} from '../../../modules/enviroment';
import { Usuario } from 'src/app/modules/usuario.interface';


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
  todo: any;
  value: any;



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

  constructor( private direccionService: DireccionesService, private formulario: FormBuilder) {
    
    this.comprobar();
    this.inicializarFormulario();
    console.log(this.constantes['0'].urlcrearDireccion);

    

   }



   //función para comprobar si hay direcciones o no 
  comprobar() {
    this.direccionService.getAllDirecciones().subscribe((datoo: any) => {


      this.todo = datoo.data['0'];
      this.todo = Array.of(this.todo);
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
      correo: [this.constantes['0'].correo],
      departamento: [''],
      createdAt: [new Date().toISOString()]

    })
  }

  enviarDatos(form: Usuario){
     this.direccionService.crearDireccion(form).subscribe( data => {
       console.log(data);
     })
    
  } 
    


  
 

  ngOnInit(): void {
  }

}
