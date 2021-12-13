import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRessourcesComponent } from './add-ressources.component';

describe('AddRessourcesComponent', () => {
  let component: AddRessourcesComponent;
  let fixture: ComponentFixture<AddRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
