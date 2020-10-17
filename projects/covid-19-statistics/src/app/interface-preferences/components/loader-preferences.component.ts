import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { LoaderType } from '@covid19-statistics/loaders/models';

@Component({
  selector: 'covid19-loader-preferences',
  templateUrl: './loader-preferences.component.html',
  styleUrls: ['./loader-preferences.component.scss'],
})
export class LoaderPreferencesComponent {
  @Input() loaderType: LoaderType;
  @Output() loaderTypeChosen: EventEmitter<LoaderType> = new EventEmitter();

  loaderTypes = LoaderType;

  public changeLayoutType(change: MatRadioChange): void {
    this.loaderTypeChosen.emit(change.value);
  }
}
