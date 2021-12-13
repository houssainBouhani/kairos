import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicMaterialComponent } from './basic-material.component';

describe('BasicMaterialComponent', () => {
  let component: BasicMaterialComponent;
  let fixture: ComponentFixture<BasicMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
