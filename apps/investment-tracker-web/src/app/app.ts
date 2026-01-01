import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [
    RouterModule,
    JsonPipe
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
