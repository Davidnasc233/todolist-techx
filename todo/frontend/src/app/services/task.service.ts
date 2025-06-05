import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  taskName: string;
  done: boolean;
}

const API_URL = 'http://localhost:3000/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_URL);
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(API_URL, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${API_URL}/${id}`, task);
  }
}
