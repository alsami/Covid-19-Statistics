import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatLegacyRadioChange as MatRadioChange } from '@angular/material/legacy-radio';
import { LoaderType } from '@covid19-statistics/loaders/models';

@Component({
  selector: 'covid19-loader-preferences',
  templateUrl: './loader-preferences.component.html',
  styleUrls: ['./loader-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderPreferencesComponent {
  @Input() loaderType: LoaderType;
  @Output() loaderTypeChosen: EventEmitter<LoaderType> = new EventEmitter();

  loaderTypes = LoaderType;

  public changeLayoutType(change: MatRadioChange): void {
    this.loaderTypeChosen.emit(change.value);
  }
}
