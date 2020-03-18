import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'covid19-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent {
  @Input() countriesOfInterest: string[] = [];

  @Output() linkClicked = new EventEmitter();
}
