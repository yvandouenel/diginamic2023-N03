import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInterface, TaskPostInterface } from '../interfaces/task-interface';
import { TaskComponent } from './task/task.component';
import { DataTasksService } from '../data-tasks.service';
import { FormTaskComponent } from './form-task/form-task.component';

@Component({
  selector: 'digi-todo-list',
  standalone: true,
  imports: [CommonModule, FormTaskComponent, TaskComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() data: string = '';
  errorMessage = '';

  tasks!: TaskInterface[];

  constructor(private dataTasksService: DataTasksService) {}

  ngOnInit(): void {
    // Souscription à l'observable issu de la requête http pour récupérer toutes les tâches
    this.dataTasksService.loadTasks().subscribe({
      next: (tasksFromHttpRequest) => {
        this.tasks = tasksFromHttpRequest.sort(
          (a, b) => Number(a.done) - Number(b.done)
        );
      },
      error: (error) => {
        console.error(
          `Erreur dans TodoListComponent loadTasks ${error.message}`
        );
      },
      complete: () => {
        console.log(`Observable issu de la loadTasks terminé `);
      },
    });
    this.dataTasksService.getFormValuesObservable().subscribe({
      next: (newTaskName) => {
        console.log(`newTaskName dans todo-list`, newTaskName);
        const newTaskPost: TaskPostInterface = {
          name: 'tmp',
          done: false,
          comment: '',
          ...newTaskName,
        };
        const newTaskLocal: TaskInterface = {
          id: 'tmp',
          ...newTaskPost,
        };
        // Ajout de la tâche en local pour pouvoir l'afficher dans le template sans attendre le retour du serveur
        this.tasks.push(newTaskLocal); // Méthode impure puisqu'elle modifie une propriété existante
        // Post de la tâche sur le serveur d'API REST
        this.dataTasksService.postTask(newTaskPost).subscribe({
          next: (newTaskFromServer: TaskInterface) => {
            console.log(`newTaskFromServer : `, newTaskFromServer);
            // Il s'agit maintenant de donner l'id provenant du serveur (json-server) à l'objet tâche local
            newTaskLocal.id = newTaskFromServer.id;
          },
          error: (error) => {
            console.error(`Erreur attrapée `, error.message);
            setTimeout(() => {
              this.tasks.pop(); // méthode impure puisqu'elle modifie une propriété existante
            }, 3000);
          },
        });
      },
      error: (error) => {
        console.error(
          `Erreur dans TodoListComponent getFormValuesObservable ${error.message}`
        );
      },
    });
  }
  handleDelete(taskId: string) {
    // Suppression locale
    this.tasks = this.tasks.filter((task) => task.id != taskId);
    // Suppression sur le serveur
    this.dataTasksService.deleteTasks(taskId).subscribe({
      next: (taskDeleted) => {
        console.log(`Tâche supprimée :`, taskDeleted);
      },
    });
  }
  sortTasks() {
    this.tasks.sort((a, b) => Number(a.done) - Number(b.done));
  }
}
