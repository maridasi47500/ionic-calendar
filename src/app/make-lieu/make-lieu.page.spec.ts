import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeLieuPage } from './make-lieu.page';

describe('MakeLieuPage', () => {
  let component: MakeLieuPage;
  let fixture: ComponentFixture<MakeLieuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakeLieuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
