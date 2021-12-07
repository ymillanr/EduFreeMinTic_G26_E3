import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programas-en-oferta',
  templateUrl: './programas-en-oferta.component.html',
  styleUrls: ['./programas-en-oferta.component.scss']
})
export class ProgramasEnOfertaComponent implements OnInit {

  listaProgramas = [
    {nombre: 'Medicina Veterinaria',
    descripcion: ''
    },
    {nombre: 'Química',
    descripcion: ''
    },
    {nombre: 'Física',
    descripcion: ''
    },
    {nombre: 'Arquitectura',
    descripcion: ''
    },
    {nombre: 'Biología',
    descripcion: ''
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
