import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataTasksService } from '../../data-tasks.service';
import { of, throwError } from 'rxjs';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let dataTasksServiceSpy: jasmine.SpyObj<DataTasksService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataTasksService', ['patchTask']);

    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [{ provide: DataTasksService, useValue: spy }],
    }).compileComponents();
    dataTasksServiceSpy = TestBed.inject(
      DataTasksService
    ) as jasmine.SpyObj<DataTasksService>;
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle error in patchTask subscription', () => {
    const errorMessage = 'Error patching task';
    dataTasksServiceSpy.patchTask.and.returnValue(
      throwError(() => new Error(errorMessage))
    );

    const consoleSpy = spyOn(console, 'error');

    // mock task
    component.task = { id: '1', name: 'Test Task', done: false };

    // Call the method that triggers patchTask
    component.onButtonValidate();
    expect(consoleSpy).toHaveBeenCalled();

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const errorElement = compiled.querySelector('.error');
    expect(errorElement).toBeTruthy();
  });
});
