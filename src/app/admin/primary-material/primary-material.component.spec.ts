import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryMaterialComponent } from './primary-material.component';

describe('PrimaryMaterialComponent', () => {
  let component: PrimaryMaterialComponent;
  let fixture: ComponentFixture<PrimaryMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
