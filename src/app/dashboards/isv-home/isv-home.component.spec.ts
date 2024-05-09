import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsvHomeComponent } from './isv-home.component';

describe('IsvHomeComponent', () => {
  let component: IsvHomeComponent;
  let fixture: ComponentFixture<IsvHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsvHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IsvHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
