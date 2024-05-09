import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datapoint-card',
  templateUrl: './datapoint-card.component.html',
  styleUrl: './datapoint-card.component.scss'
})
export class DatapointCardComponent {
  @Input() cardTitle?: string;
  @Input() dpTitle?: string;
  @Input() dpValue?: string;

}
