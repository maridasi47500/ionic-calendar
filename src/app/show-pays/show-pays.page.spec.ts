import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowPaysPage } from './show-pays.page';

describe('ShowPaysPage', () => {
  let component: ShowPaysPage;
  let fixture: ComponentFixture<ShowPaysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowPaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
