import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { DataTasksService } from '../../data-tasks.service';

@Component({
  selector: 'digi-form-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})
export class FormTaskComponent {
  taskName: string = '';
  constructor(private dataTasksService: DataTasksService) {}
  register(formTask: NgForm) {
    console.log(`Valeur du Formulaire soumis : `, formTask.value);
    if (formTask.value.name)
      this.dataTasksService.setFormValues(formTask.value);
    formTask.reset();
  }
}
