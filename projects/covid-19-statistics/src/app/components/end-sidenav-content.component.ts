import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatLegacyRadioChange as MatRadioChange } from '@angular/material/legacy-radio';
import { LoaderType } from '@covid19-statistics/loaders/models';

@Component({
  selector: 'covid19-end-sidenav-content',
  templateUrl: './end-sidenav-content.component.html',
  styleUrls: ['./end-sidenav-content.component.scss'],
})
export class EndSidenavContentComponent {
  @Input() loaderType: LoaderType;
  @Output() loaderTypeChosen: EventEmitter<LoaderType> = new EventEmitter();

  loaderTypes = LoaderType;

  public changeLayoutType(change: MatRadioChange): void {
    this.loaderTypeChosen.emit(change.value);
  }
}
