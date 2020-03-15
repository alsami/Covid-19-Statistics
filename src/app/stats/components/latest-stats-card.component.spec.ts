import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestStatsCardComponent } from './latest-stats-card.component';

describe('LatestStatsCardComponent', () => {
  let component: LatestStatsCardComponent;
  let fixture: ComponentFixture<LatestStatsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestStatsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestStatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
