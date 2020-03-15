import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLoaderOverlayComponent } from './component-loader-overlay.component';

describe('ComponentLoaderOverlayComponent', () => {
  let component: ComponentLoaderOverlayComponent;
  let fixture: ComponentFixture<ComponentLoaderOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLoaderOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLoaderOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
