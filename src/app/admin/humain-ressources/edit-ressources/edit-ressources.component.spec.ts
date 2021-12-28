import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRessourcesComponent } from './edit-ressources.component';

describe('EditRessourcesComponent', () => {
  let component: EditRessourcesComponent;
  let fixture: ComponentFixture<EditRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
