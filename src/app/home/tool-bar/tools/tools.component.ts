import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AddStickerService } from '../../../services/utils/add-sticker.service';
import { Sticker } from '../../../models/sticker.model';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpStickersService } from '../../../services/http/http.stickers.service';
import { environment } from '../../../../environments/environment';
import { MaxStickerSnackBarComponent } from './max-sticker-snack-bar/max-sticker-snack-bar.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  constructor(private addStickerService: AddStickerService,
              private authService: AuthService,
              private httpStickersService: HttpStickersService,
              private snackBar: MatSnackBar
              ) {}

  ngOnInit() {}

  onAddSticker() {
    if (this.addStickerService.numberOfStickers < environment.maxNumberOfStickers) {
      this.httpStickersService.sendSaveStickerAndFetch(
        new Sticker(0,
          'new sticker',
          this.generateInitialStickerPosX(),
          this.generateInitialStickerPosY(),
          this.generateInitialStickerPosZ(),
          this.authService.getUserUid()));
    } else {
      this.snackBar.openFromComponent(MaxStickerSnackBarComponent, {duration: 3000});
    }
  }

  private generateInitialStickerPosX(): number {
    const pos = 10 * this.addStickerService.numberOfStickers;

    return pos + 70 + 200 < window.innerWidth ? pos : 0;
  }

  private generateInitialStickerPosY(): number {
    const pos = 10 * this.addStickerService.numberOfStickers;

    return pos + 300 < window.innerHeight ? pos : 0;
  }

  private generateInitialStickerPosZ(): number {
    const newPosition = this.addStickerService.numberOfStickers + 1;
    return newPosition;
  }
}
