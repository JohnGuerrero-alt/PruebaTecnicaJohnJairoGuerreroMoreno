import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { MisdireccionesComponent} from './components/misDirecciones/misdirecciones/misdirecciones.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'direcciones', component: MisdireccionesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const app_routing = RouterModule.forRoot(routes, {useHash: true});
