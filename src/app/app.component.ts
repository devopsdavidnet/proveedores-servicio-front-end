import { Component } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout' ;
import {ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proveedores-front-end';
   @ViewChild(MatSidenav)
   sidenav!:MatSidenav;
   isMobil=true;

   constructor(private observer:BreakpointObserver){}

   


   

}
