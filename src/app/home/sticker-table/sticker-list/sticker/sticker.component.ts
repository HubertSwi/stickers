import { AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output} from '@angular/core';
import { Subject } from 'rxjs';

import { Sticker } from '../../../../models/sticker.model';
import { SessionService } from '../../../../services/session/session.service';
import { HttpStickersService } from '../../../../services/http/http.stickers.service';
import { LoggingService } from '../../../../services/utils/logging.service';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements AfterContentInit, OnInit {

  @Input() stickerItem: Sticker;
  xpos: number;
  ypos: number;

  saveInputChanges = new Subject<string>();
  timer;

  @Output() deleteStickerEmitter = new EventEmitter<number>();

  constructor(
    private sessionService: SessionService,
    private httpStickersService: HttpStickersService,
    private loggingService: LoggingService,
  ) { }

  ngAfterContentInit(): void {
    this.xpos = +this.stickerItem.xcord;
    this.ypos = +this.stickerItem.ycord;
  }

  ngOnInit(): void {
    this.saveInputChanges.asObservable().subscribe(
      changedText => {
        this.stickerItem.text = changedText;

        clearTimeout(this.timer);

        this.timer = setTimeout( () => {
          this.httpStickersService.sendSaveSticker(this.stickerItem);
        }, 2000);
      }
    );
  }

  onDeleteSticker() {
    this.loggingService.info('Removed stricker id: ', this.stickerItem.id);
    this.deleteStickerEmitter.emit(this.stickerItem.id);
  }
}
