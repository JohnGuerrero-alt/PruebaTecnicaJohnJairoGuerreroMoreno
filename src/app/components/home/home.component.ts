import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

//Declaro la variable M para poder acceder a los elementos del materialize  
declare const M: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor() {

   }

  ngOnInit(): void {
    //Inicializar el carousel del framework Materialize
    const elementosCarousel = document.querySelector('.carousel');
    M.Carousel.init(elementosCarousel, {

    });

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});

  }

}
