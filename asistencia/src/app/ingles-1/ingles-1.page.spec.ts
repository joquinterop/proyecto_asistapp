import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ingles1Page } from './ingles-1.page';

describe('Ingles1Page', () => {
  let component: Ingles1Page;
  let fixture: ComponentFixture<Ingles1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Ingles1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
