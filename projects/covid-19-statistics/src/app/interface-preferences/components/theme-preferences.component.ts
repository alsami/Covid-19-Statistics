import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LayoutThemeType } from '@covid19-statistics/core/models';

@Component({
  selector: 'covid19-theme-preferences',
  templateUrl: './theme-preferences.component.html',
  styleUrls: ['./theme-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePreferencesComponent implements OnChanges {
  @Input() selectedTheme: LayoutThemeType;
  @Output() themeSelected: EventEmitter<LayoutThemeType> = new EventEmitter();

  public layoutThemeTypes = LayoutThemeType;

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedTheme === this.layoutThemeTypes.GreyLight);
  }

  public selected(theme: LayoutThemeType): boolean {
    console.log(theme, this.selectedTheme === theme);
    return this.selectedTheme === theme;
  }
}
