import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TaskService, Task } from 'app/services/task.service';


@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class TodolistComponent implements OnInit {
  taskService = inject(TaskService);
  tasks: Task[] = []
  editTask = '';
  editIndex = -1;

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((db: Task[]) => {
      this.tasks = db;
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
  
    const newTaskName = form.controls['task'].value.trim();
    const newTask = {
      taskName: newTaskName,
      done: false
    };
  
    this.taskService.addTask(newTask).subscribe({
      next: (createdTask) => {
        this.tasks.push(createdTask); // adiciona a resposta do backend ao array local
        form.resetForm(); // limpa o input
      },
      error: (err) => {
        console.error('Erro ao adicionar tarefa:', err);
      }
    });
  }
  

  startEdit(index: number) {
    this.editIndex = index;
    this.editTask = this.tasks[index].taskName;
  }
  
  saveEdit() {
    if (this.editIndex !== -1 && this.editTask.trim()) {
      const task = this.tasks[this.editIndex];
      const updatedTask = {
        ...task,
        taskName: this.editTask.trim()
      };
  
      this.taskService.startEdit(task.id, updatedTask).subscribe({
        next: (response) => {
          this.tasks[this.editIndex] = response; 
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Erro ao salvar edição:', err);
        }
      });
      if (this.editIndex !== null && this.editTask.trim()) {
        this.tasks[this.editIndex].taskName = this.editTask.trim();
        this.cancelEdit();
      }
    }
  }

  
  cancelEdit() {
    this.editIndex = -1;
    this.editTask = '';
  }
  

  removeTask(index: number) {
    const taskId = this.tasks[index].id;
    if (confirm(`Deseja apagar a tarefa "${this.tasks[index].taskName}"?`)) {
      this.taskService.removeTask(taskId).subscribe({
        next: () => {
          this.tasks.splice(index, 1); // Só remove localmente após sucesso no backend
        },
        error: (err) => {
          console.error('Erro ao apagar tarefa:', err);
        }
      });
    }
  }
  

  toggleDone(index: number) {
    const task = this.tasks[index];
    const updatedTask = { ...task, done: !task.done };
  
    this.taskService.startEdit(task.id, updatedTask).subscribe({
      next: (updated) => {
        this.tasks[index] = updated;
      },
      error: (err) => {
        console.error('Erro ao marcar tarefa como completa:', err);
      }
    });
    this.tasks[index].done = !this.tasks[index].done;
  }
  
}

