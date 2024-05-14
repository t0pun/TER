import { Component } from '@angular/core';
import { ByTopicComponent } from "./by-topic/by-topic.component";
import { ByEntityComponent } from "./by-entity/by-entity.component";
import { ByEntityByTopicComponent } from "./by-entity-by-topic/by-entity-by-topic.component";
import { NgSwitch } from '@angular/common';
import { NgSwitchCase } from '@angular/common';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [ByTopicComponent, ByEntityComponent, ByEntityByTopicComponent, NgSwitch, NgSwitchCase, NavigationBarComponent]
})
export class SearchComponent {
  activeButton: string = 'entity-topic';

  setActive(buttonId: string): void {
    this.activeButton = buttonId;
  }
}
