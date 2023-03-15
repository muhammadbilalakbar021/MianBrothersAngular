import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListAccountsComponent } from './edit-list-accounts.component';

describe('EditListAccountsComponent', () => {
  let component: EditListAccountsComponent;
  let fixture: ComponentFixture<EditListAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
