import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLotsComponent } from './add-lots.component';

describe('AddLotsComponent', () => {
  let component: AddLotsComponent;
  let fixture: ComponentFixture<AddLotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
