import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeAppointmentPage } from './make-appointment.page';

describe('MakeAppointmentPage', () => {
  let component: MakeAppointmentPage;
  let fixture: ComponentFixture<MakeAppointmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakeAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
