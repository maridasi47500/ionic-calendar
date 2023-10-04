import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLieuPage } from './edit-lieu.page';

describe('EditLieuPage', () => {
  let component: EditLieuPage;
  let fixture: ComponentFixture<EditLieuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditLieuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
