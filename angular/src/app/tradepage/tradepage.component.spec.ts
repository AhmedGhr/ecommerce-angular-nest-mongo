import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradepageComponent } from './tradepage.component';

describe('TradepageComponent', () => {
  let component: TradepageComponent;
  let fixture: ComponentFixture<TradepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
