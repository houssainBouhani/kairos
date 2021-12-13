import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumainRessourcesComponent } from './humain-ressources.component';

describe('HumainRessourcesComponent', () => {
  let component: HumainRessourcesComponent;
  let fixture: ComponentFixture<HumainRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumainRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumainRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
