import { Component, OnDestroy, OnInit } from '@angular/core';
import { DireccionesService } from '../../../services/direcciones.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { listaCiudades } from '../../../modules/listas';
import { Constantes } from '../../../modules/enviroment';
import { Usuario } from 'src/app/modules/usuario.interface';
import { Observable, pipe, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';


//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-misdirecciones',
  templateUrl: './misdirecciones.component.html',
  styleUrls: ['./misdirecciones.component.css']
})
export class MisdireccionesComponent implements OnInit , OnDestroy{
  //habilitar o desabilitar cada item del diseño
  aItem: boolean = false;
  bItem: boolean = false;
  cItem: boolean = false;
  city: any = listaCiudades; //utilizado en el select del  misdirecciones.component.html
  todo: any;
  environment: any = Constantes;
  suscription: Subscription; //para realizar el refresh

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

  constructor(private direccionService: DireccionesService, private formulario: FormBuilder) {
    this.buscarDirecciones();
    this.inicializarFormulario();
    this.suscription = this.direccionService.refresh$.subscribe(() => {
      this.buscarDirecciones();
    })
  }

  buscarDirecciones() {
    console.log('Constantes: ', this.environment['0'].useremail);
    this.direccionService.getAllDireccionByCorreo(this.environment['0'].useremail)
      .subscribe(
        data => this.mostrarRegistroDirecciones(data),
        error => console.error(error.statusText),
      );
  }

  mostrarRegistroDirecciones(dato: any) {
    console.log('data: ', dato)
    if (dato.data !== null && dato.data !== undefined) {
      this.actualizarPantalla(dato.count);
        this.todo = dato.data; //guarda los datos en la variable que extraera los datos las cardview
    }
  }

  actualizarPantalla(datos: any) {
    console.log('datos.count ', datos);
    if (datos === 0) {
      this.bItem = false;
      this.aItem = true;
      console.log('diseño a: ', this.aItem);
    } 
    else {  // si una o mas direcciones inicialice el diseño b
      this.bItem = true;
      this.aItem = false;
      console.log('diseño b: ', this.bItem);
    }
  }
  
  inicializarFormulario() {//funcion para inicializar  los datos que va recibir el item c-new address
    this.myForm = this.formulario.group({
      _id: [],
      nombreEntrega: ['', Validators.required],
      direccion: ['', Validators.required],
      detalle: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: [null],
      ciudad: ['2',],
      codigoPostal: ['', Validators.required],
      instruccionesEntrega: [''],
      pais: [Constantes['0'].pais],
      correo: [Constantes['0'].correo],
      departamento: ['10'],
      createdAt: [new Date().toISOString()]
    })
  }

  enviarDatos(form: Usuario) {
    console.log(form);
    console.log(form._id);
    if (form._id === null) {
      this.direccionService.crearDireccion(form).subscribe((dato: any) => {
        console.log('dato: ', dato);
        Swal.fire({
          title: 'Envio de información',
          text: 'Se ha enviado la información exitosamente',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.cItem = false;
            this.bItem = true;
            this.myForm.reset();
          }
        })
      })
    }
    else {
      var nuevo_form = {
        "correo": form.correo,
        "pais": form.pais,
        "departamento": form.departamento,
        "ciudad": form.ciudad,
        "telefono1": form.telefono1,
        "telefono2": form.telefono2,
        "nombreEntrega": form.nombreEntrega,
        "codigoPostal": form.codigoPostal,
        "detalle": form.detalle,
        "instruccionesEntrega": form.instruccionesEntrega
      }
      this.direccionService.actualizarDireccion(nuevo_form, form._id).subscribe(
        (dato: any) => {
          console.log('dato actualizado: ', dato);
          Swal.fire({
            title: 'Actualización de la informacion',
            text: 'Se ha actualizado la información exitosamente',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.cItem = false;
              this.bItem = true;
              this.myForm.reset();
            }
          })
        }
      )
    }
  }

  exportarDatosDireccion(form: Usuario) {
    this.myForm.patchValue({
      "ciudad": form.ciudad,
      "pais": form.pais,
      "departamento": form.departamento,
      "correo": form.correo,
      "_id": form._id,
      "nombreEntrega": form.nombreEntrega,
      "direccion": form.direccion,
      "detalle": form.detalle,
      "telefono1": form.telefono1,
      "telefono2": form.telefono2,
      "codigoPostal": form.codigoPostal,
      "instruccionesEntrega": form.instruccionesEntrega
    })
    this.myForm.controls['direccion'].disable();
  }

  deleteDireccion(id: any, direccion: any) {
    console.log('borrar: ', id);
    Swal.fire({
      title: '¿ Deseas eliminar ' + direccion + ' ?',
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
          (dato: any) => {
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

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
