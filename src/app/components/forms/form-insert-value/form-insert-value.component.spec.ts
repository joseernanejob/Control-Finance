import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInsertValueComponent } from './form-insert-value.component';

describe('FormInsertValueComponent', () => {
  let component: FormInsertValueComponent;
  let fixture: ComponentFixture<FormInsertValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInsertValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormInsertValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
