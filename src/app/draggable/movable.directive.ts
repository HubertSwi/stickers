import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { DraggableDirective } from './draggable.directive';
import { StickerMgs } from './model/sticker.mgs';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {

  @Output() saveStickerOnPointerUpEmitter = new EventEmitter<StickerMgs>();
  @Output() saveStickerOnPointerDownEmitter = new EventEmitter<number>();

  public position: Position = {x: 0, y: 0};
  private startPosition: Position;

  constructor(private sanitizer: DomSanitizer,
              public element: ElementRef) {
    super();
  }

  @HostBinding('style.transform')
  get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translate(${this.position.x}px, ${this.position.y}px)`
    );
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };

    this.saveStickerOnPointerDownEmitter.emit(this.element.nativeElement.attributes['id'].value);
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    if (this.position.x !== 0 && this.position.y !== 0) {
      this.saveStickerOnPointerUpEmitter.emit(new StickerMgs(
        this.element.nativeElement.attributes['id'].value,
        Math.round(this.element.nativeElement.offsetLeft + this.position.x),
        Math.round(this.element.nativeElement.offsetTop + this.position.y)
      ));

    }
  }
}
