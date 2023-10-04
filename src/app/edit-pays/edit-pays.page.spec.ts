import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPaysPage } from './edit-pays.page';

describe('EditPaysPage', () => {
  let component: EditPaysPage;
  let fixture: ComponentFixture<EditPaysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
