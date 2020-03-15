import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'covid19-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggle = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
