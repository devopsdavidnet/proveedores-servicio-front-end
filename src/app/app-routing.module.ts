import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarProveedorComponent } from './registrar-proveedor/registrar-proveedor.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 {path: '', component:HomeComponent},
 {path: 'register', component: RegistrarProveedorComponent},
 {path: '**',redirectTo:''},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
