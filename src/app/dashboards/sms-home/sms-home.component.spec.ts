import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsHomeComponent } from './sms-home.component';

describe('SmsHomeComponent', () => {
  let component: SmsHomeComponent;
  let fixture: ComponentFixture<SmsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
