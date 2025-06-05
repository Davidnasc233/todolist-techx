import { Component, NgModule } from '@angular/core';
import { TodolistComponent } from '../components/todolist.component';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    Component,
    TodolistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [Component]
})
export class AppModule { }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodolistComponent],
  template: `<app-todolist></app-todolist>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
}
