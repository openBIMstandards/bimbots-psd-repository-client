import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIdsComponent } from './create-ids.component';

describe('CreateIdsComponent', () => {
  let component: CreateIdsComponent;
  let fixture: ComponentFixture<CreateIdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
