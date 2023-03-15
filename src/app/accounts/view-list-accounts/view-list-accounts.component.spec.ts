import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListAccountsComponent } from './view-list-accounts.component';

describe('ViewListAccountsComponent', () => {
  let component: ViewListAccountsComponent;
  let fixture: ComponentFixture<ViewListAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
