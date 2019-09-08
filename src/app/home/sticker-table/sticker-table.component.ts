import { Component, ViewChild } from '@angular/core';

import { StickerListComponent } from './sticker-list/sticker-list.component';

@Component({
  selector: 'app-sticker-table',
  templateUrl: './sticker-table.component.html',
  styleUrls: ['./sticker-table.component.css']
})
export class StickerTableComponent {

  @ViewChild(StickerListComponent) stickerListComponent: StickerListComponent;

  saveStickers(): void {
    this.stickerListComponent.saveStickers();
  }

}
