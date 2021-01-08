import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//importar rutas
import { app_routing} from './app-routing.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navBar/navbar/navbar.component';
import { MisdireccionesComponent } from './components/misDirecciones/misdirecciones/misdirecciones.component';
import { HttpClientModule } from '@angular/common/http';
import { DireccionesService}  from './services/direcciones.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MisdireccionesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    app_routing, // agrego la ruta del routing para los dos componentes home y misDirecciones
    HttpClientModule, //agrego el modulo para que sea reconocido
    ReactiveFormsModule
    
  ],
  providers: [DireccionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
