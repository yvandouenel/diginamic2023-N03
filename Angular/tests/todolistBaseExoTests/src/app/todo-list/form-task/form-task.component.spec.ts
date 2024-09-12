import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaskComponent } from './form-task.component';
import { DataTasksService } from '../../data-tasks.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormTaskComponent', () => {
  let component: FormTaskComponent;
  let fixture: ComponentFixture<FormTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTaskComponent, HttpClientTestingModule],
      providers: [{ provide: DataTasksService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
