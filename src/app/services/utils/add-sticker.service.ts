import { Observable, Subject } from 'rxjs';

import { Sticker } from '../../models/sticker.model';

export class AddStickerService {
  numberOfStickers: number;

  private addStickerListener = new Subject<Sticker>();

  listen(): Observable<Sticker> {
    return this.addStickerListener.asObservable();
  }

  add(sticker: Sticker): void {
    this.addStickerListener.next(sticker);
    this.numberOfStickers++;
  }
}
