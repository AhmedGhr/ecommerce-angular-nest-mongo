import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproductuserComponent } from './updateproductuser.component';

describe('UpdateproductuserComponent', () => {
  let component: UpdateproductuserComponent;
  let fixture: ComponentFixture<UpdateproductuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateproductuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateproductuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
