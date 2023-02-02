import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpaiementsComponent } from './adminpaiements.component';

describe('AdminpaiementsComponent', () => {
  let component: AdminpaiementsComponent;
  let fixture: ComponentFixture<AdminpaiementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpaiementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpaiementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
