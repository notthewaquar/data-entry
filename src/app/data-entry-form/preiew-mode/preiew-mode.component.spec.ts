import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreiewModeComponent } from './preiew-mode.component';

describe('PreiewModeComponent', () => {
  let component: PreiewModeComponent;
  let fixture: ComponentFixture<PreiewModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreiewModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreiewModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
