import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentFailedComponent } from './recent-failed.component';

describe('RecentFailedComponent', () => {
  let component: RecentFailedComponent;
  let fixture: ComponentFixture<RecentFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentFailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
