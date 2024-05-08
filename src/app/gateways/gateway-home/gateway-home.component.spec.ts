import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayHomeComponent } from './gateway-home.component';

describe('GatewayHomeComponent', () => {
  let component: GatewayHomeComponent;
  let fixture: ComponentFixture<GatewayHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
