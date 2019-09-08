import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { Sticker } from '../../../models/sticker.model';
import { AddStickerService } from '../../../services/utils/add-sticker.service';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpService } from '../../../services/http/http.service';
import { StickersActions } from '../../../services/http/action.enum';
import { APP_CONFIG, AppConfig } from '../../../app-config/app-config.module';
import { StickerMgs } from '../../../draggable/model/sticker.mgs';
import { HttpStickersService } from '../../../services/http/http.stickers.service';
import { LoggingService } from '../../../services/utils/logging.service';

@Component({
  selector: 'app-sticker-list',
  templateUrl: './sticker-list.component.html',
  styleUrls: ['./sticker-list.component.css']
})
export class StickerListComponent implements OnInit {

  stickerList: Sticker[] = [];
  private userUid: string;

  constructor(private addStickerService: AddStickerService,
              private authService: AuthService,
              private httpService: HttpService,
              private httpStickersService: HttpStickersService,
              private cd: ChangeDetectorRef,
              private loggingService: LoggingService,
              @Inject(APP_CONFIG) private config: AppConfig,
              ) {}

  ngOnInit() {
    this.userUid = this.authService.getUserUid();

    setTimeout(() => {
      this.httpStickersService.loadingStickersSub.next(true);
    }, 1);

    this.httpService.sendRequest(StickersActions.fetchStickers, this.userUid + '/stickers').subscribe(
      (stickerList: Sticker[]) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        for (let s of stickerList) {
          if (s.xcord + this.config.sticker.width > (windowWidth - this.config.toolbar.width)) {
            s.xcord = windowWidth - this.config.sticker.width - this.config.toolbar.width;
          }
          if (s.ycord + this.config.sticker.height > windowHeight) {
            s.ycord = windowHeight - this.config.sticker.height;
          }

          this.stickerList.push(s);
        }

        this.addStickerService.numberOfStickers = this.stickerList.length;

        setTimeout(() => {
          this.httpStickersService.loadingStickersSub.next(false);
        }, 100);
      },
      error => {
        setTimeout(() => {
          this.httpStickersService.errorLoadingStickersSub.next(true);
        }, 1);
      }
    );

    this.addStickerService.listen().subscribe(
      (stickerItem: Sticker) => {
        this.stickerList.push(JSON.parse(JSON.stringify(stickerItem)));
      }
    );
  }

  saveStickers(): void {
    this.httpStickersService.sendSaveStickers(this.stickerList);
  }

  updateStickerListElement(eventSticMsg: StickerMgs) {
    let sticker: Sticker;
    sticker = this.stickerList.find(s => s.id === +eventSticMsg.stic_id);

    const updatedStickerIndex = this.stickerList.indexOf(sticker);
    const afterUpdatedSticker = new Sticker(
      +eventSticMsg.stic_id,
      sticker.text,
      eventSticMsg.stic_x,
      eventSticMsg.stic_y,
      sticker.zcord,
      sticker.userUid);

    this.stickerList[updatedStickerIndex] = JSON.parse(JSON.stringify(afterUpdatedSticker));

    this.httpStickersService.sendSaveSticker(afterUpdatedSticker);
  }

  updateStickersZIndex(grabbedStickerId: number) {
    this.loggingService.info('Grabbed sticker id: ', grabbedStickerId);

    const grabbedSticker: Sticker = this.stickerList.find(e => Number(e.id) === Number(grabbedStickerId));

    for (let i = 0; i < this.stickerList.length; i++) {
      if (Number(this.stickerList[i].zcord) > Number(grabbedSticker.zcord)) {
        this.stickerList[i].zcord--;
      }
    }

    this.stickerList[this.stickerList.indexOf(grabbedSticker)].zcord = this.stickerList.length;
  }

  deleteSticker(event) {
    this.httpStickersService.sendDeleteSticker(event);

    this.stickerList = this.stickerList.filter(e => {
      return e.id !== Number.parseInt(event, 10);
    });

    this.addStickerService.numberOfStickers--;
  }
}
