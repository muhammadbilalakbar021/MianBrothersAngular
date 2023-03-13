import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendorsComponent } from './edit-vendors.component';

describe('EditVendorsComponent', () => {
  let component: EditVendorsComponent;
  let fixture: ComponentFixture<EditVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVendorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
