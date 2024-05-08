import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarVolumeComponent } from './bar-volume.component';

describe('BarVolumeComponent', () => {
  let component: BarVolumeComponent;
  let fixture: ComponentFixture<BarVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarVolumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
