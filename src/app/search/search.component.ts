import { Component } from '@angular/core';
import { SourceComponent } from "./source/source.component";
import { TopicComponent } from "./topic/topic.component";
import { EntityComponent } from "./entity/entity.component";
import { NgSwitch } from '@angular/common';
import { NgSwitchCase } from '@angular/common';
@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [SourceComponent, TopicComponent, EntityComponent, NgSwitch, NgSwitchCase]
})
export class SearchComponent {
  activeButton: string = 'source';

  setActive(buttonId: string): void {
    this.activeButton = buttonId;

  }
}
