import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatapointCardComponent } from './datapoint-card.component';

describe('DatapointCardComponent', () => {
  let component: DatapointCardComponent;
  let fixture: ComponentFixture<DatapointCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatapointCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatapointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
