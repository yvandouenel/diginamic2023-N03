import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { DataTasksService } from '../data-tasks.service';
import { of, throwError } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let dataTasksServiceSpy: jasmine.SpyObj<DataTasksService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataTasksService', [
      'loadTasks',
      'getFormValuesObservable',
    ]);

    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [{ provide: DataTasksService, useValue: spy }],
    }).compileComponents();

    dataTasksServiceSpy = TestBed.inject(
      DataTasksService
    ) as jasmine.SpyObj<DataTasksService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render <h1> tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1')).toBeTruthy();
  });

  it('should contain "TODOLIST" in <h1> tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    const h1Element = compiled.querySelector('h1');
    expect(h1Element.textContent).toContain('TODOLIST');
  });
  it('should not contain tag with class error', () => {
    const compiled = fixture.debugElement.nativeElement;
    const errorElement = compiled.querySelector('.error');
    expect(errorElement).not.toBeTruthy();
  });

  it('should handle error in loadTasks subscription', () => {
    const errorMessage = 'Error loading tasks';
    dataTasksServiceSpy.loadTasks.and.returnValue(
      throwError(() => new Error(errorMessage))
    );
    dataTasksServiceSpy.getFormValuesObservable.and.returnValue(of(null));

    const consoleSpy = spyOn(console, 'error');

    fixture.detectChanges(); // This triggers ngOnInit
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      `Erreur dans TodoListComponent loadTasks ${errorMessage}`
    );
    expect(component.tasks).toBeUndefined();
    const compiled = fixture.debugElement.nativeElement;
    const errorElement = compiled.querySelector('.error');
    expect(errorElement).toBeTruthy();
  });
});
