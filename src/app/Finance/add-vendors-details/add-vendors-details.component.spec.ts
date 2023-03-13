import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorsDetailsComponent } from './add-vendors-details.component';

describe('AddVendorsDetailsComponent', () => {
  let component: AddVendorsDetailsComponent;
  let fixture: ComponentFixture<AddVendorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendorsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVendorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
