import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestStatsOverviewComponent } from './latest-stats-overview.component';

describe('LatestStats.OverviewComponent', () => {
  let component: LatestStatsOverviewComponent;
  let fixture: ComponentFixture<LatestStatsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestStatsOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestStatsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
