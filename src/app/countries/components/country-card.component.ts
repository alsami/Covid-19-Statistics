import { Component, Input, OnInit } from '@angular/core';
import { CountryStats } from '@covid19/countries/models';

@Component({
  selector: 'covid19-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent implements OnInit {
  @Input() countryStats: CountryStats;

  constructor() {}

  ngOnInit(): void {}
}
