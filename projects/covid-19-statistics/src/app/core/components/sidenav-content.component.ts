import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'covid19-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavContentComponent implements OnChanges {
  public version = environment.version;

  public dragging = false;

  @Input() countriesOfInterest: string[] = [];
  @Output() countriesOfInterestOrdered: EventEmitter<
    string[]
  > = new EventEmitter<string[]>();

  @Output() linkClicked = new EventEmitter();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.countriesOfInterest) {
      this.countriesOfInterest = changes.countriesOfInterest.currentValue?.slice();
    }
  }

  public countryOfInterestOrdered($event: CdkDragDrop<any>): void {
    moveItemInArray(
      this.countriesOfInterest,
      $event.previousIndex,
      $event.currentIndex
    );
    this.countriesOfInterestOrdered.emit(this.countriesOfInterest);
  }
}
