import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { UserService } from './services/api.service';


export interface PeriodicElement {
  name: string;
  email: string;
  age: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'test-toro';
  displayedColumns: string[] = ['name', 'email', 'age'];
  dataSource: any[] = [];

  constructor(private miServicio: UserService) { }

ngOnInit(): void {
    this.miServicio.getDatos().subscribe(datos => {
      this.dataSource = datos;
      console.log('Datos recibidos:', datos);
    }, error => {
      console.error('Error al obtener datos', error);
    });
  }
}
