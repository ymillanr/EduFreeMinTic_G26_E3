import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { BackendService } from '../backend.service';

interface Programa {

  nombre: string;
  modalidad: string;
}

@Component({
  selector: 'app-programas-en-oferta',
  templateUrl: './programas-en-oferta.component.html',
  styleUrls: ['./programas-en-oferta.component.scss']
})
export class ProgramasEnOfertaComponent implements OnInit {

  listaProgramas: Programa[] = [];



  constructor(private servicioBackend: BackendService) {

    this.servicioBackend.getRequest('/programa-academicos').subscribe(
      {
        next: (data) => {
          console.log('Bien');
          this.listaProgramas = data;
        },
        error: (e) => {
          console.log('Error');
        },
        complete: () => {
          console.log('Completo');
        }
      });
  }



  ngOnInit(): void { }

}