import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowLieuPage } from './show-lieu.page';

describe('ShowLieuPage', () => {
  let component: ShowLieuPage;
  let fixture: ComponentFixture<ShowLieuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowLieuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
