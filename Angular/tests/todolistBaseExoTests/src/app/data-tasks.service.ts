import { Injectable } from '@angular/core';
import {
  TaskInterface,
  TaskPatchInterface,
  TaskPostInterface,
} from './interfaces/task-interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTasksService {
  constructor(private http: HttpClient) {}
  private formValues$ = new Subject<any>();
  private url = 'http://localhost:3000/tasks';

  deleteTasks(taskId: string): Observable<TaskInterface> {
    console.log(`Dans deleteTasks`);
    return this.http.delete<TaskInterface>(`${this.url}/${taskId}`);
  }

  loadTasks(): Observable<TaskInterface[]> {
    return this.http.get<Array<TaskInterface>>(this.url);
  }
  patchTask(
    taskId: string,
    propertiesToPatch: TaskPatchInterface
  ): Observable<TaskInterface> {
    console.log(`Dans patchTask`, propertiesToPatch);
    return this.http.patch<TaskInterface>(
      `${this.url}/${taskId}`,
      propertiesToPatch
    );
  }

  postTask(newTask: TaskPostInterface): Observable<TaskInterface> {
    console.log(`Dans postTask`, newTask);
    return this.http.post<TaskInterface>(this.url, newTask);
  }

  setFormValues(values: any) {
    this.formValues$.next(values);
  }
  getFormValuesObservable() {
    return this.formValues$.asObservable();
  }
}
