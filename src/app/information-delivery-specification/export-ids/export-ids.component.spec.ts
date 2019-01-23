import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportIdsComponent } from './export-ids.component';

describe('ExportIdsComponent', () => {
  let component: ExportIdsComponent;
  let fixture: ComponentFixture<ExportIdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportIdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportIdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
