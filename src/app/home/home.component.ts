import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '../services/utils/can-deactivate-guard.service';
import { StickerTableComponent } from './sticker-table/sticker-table.component';
import { HttpStickersService } from '../services/http/http.stickers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, CanComponentDeactivate {

  stickersLoading = false;
  errorStickersLoading = false;

  @ViewChild(StickerTableComponent) stickerTableComponent: StickerTableComponent;

  constructor(private httpStickersService: HttpStickersService,
              ) {}

  ngOnInit() {
    this.httpStickersService.loadingStickersSub.asObservable().subscribe(
      (stickersLoading: boolean) => {
        this.stickersLoading = stickersLoading;
      }
    );

    this.httpStickersService.errorLoadingStickersSub.asObservable().subscribe(
      (errorStickersLoading: boolean) => {
        this.errorStickersLoading = errorStickersLoading;
      }
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.stickerTableComponent.saveStickers();
    return true;
  }
}
