import { Component } from '@angular/core';
import { ByTopicComponent } from "./by-topic/by-topic.component";
import { ByEntityComponent } from "./by-entity/by-entity.component";
import { ByEntityByThemeComponent } from "./by-entity-by-theme/by-entity-by-theme.component";
import { NgSwitch } from '@angular/common';
import { NgSwitchCase } from '@angular/common';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [ByTopicComponent, ByEntityComponent, ByEntityByThemeComponent, NgSwitch, NgSwitchCase]
})
export class SearchComponent {
  activeButton: string = 'hybrid';

  setActive(buttonId: string): void {
    this.activeButton = buttonId;

  }
}
