import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakePaysPage } from './make-pays.page';

describe('MakePaysPage', () => {
  let component: MakePaysPage;
  let fixture: ComponentFixture<MakePaysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakePaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
