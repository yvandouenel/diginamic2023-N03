import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskInterface } from '../../interfaces/task-interface';
import { CommonModule } from '@angular/common';
import { DataTasksService } from '../../data-tasks.service';

@Component({
  selector: 'digi-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: TaskInterface;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() sortTasks = new EventEmitter<boolean>();
  errorMessage = '';

  constructor(private dataTasksService: DataTasksService) {}
  // Méthodes
  onButtonValidate() {
    console.log(`Dans onButtonValidate de task component`);
    this.task.done = !this.task.done;
    this.sortTasks.emit(true);
    this.dataTasksService
      .patchTask(this.task.id, { done: this.task.done })
      .subscribe({
        next: (taskPatched) => {
          console.log(`Tâche modidifée `, taskPatched);
        },
        error: (error) => {
          console.error(`Erreur lors de l'appel de patchTask `, error.message);
          this.errorMessage =
            'Problème lors de la modification de la tâche : ' + error.message;
          setTimeout(() => {
            this.task.done = !this.task.done;
          }, 3300);
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      });
  }
  /**
   * Emet une valeur (l'id de la tâche) lors d'un clic sur le bouton "supprimer"
   * @param {string} taskId
   * @return void
   */
  onButtonDelete(taskId: string) {
    console.log(`dans onButtonDelete `, taskId);
    this.deleteTask.emit(taskId);
  }
}
