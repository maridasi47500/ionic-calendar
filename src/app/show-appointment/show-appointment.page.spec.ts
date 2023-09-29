import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowAppointmentPage } from './show-appointment.page';

describe('ShowAppointmentPage', () => {
  let component: ShowAppointmentPage;
  let fixture: ComponentFixture<ShowAppointmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
