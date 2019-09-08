import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  QueryList
} from '@angular/core';
import { Subject } from 'rxjs';

import { MovableDirective } from './movable.directive';
import { APP_CONFIG, AppConfig } from '../app-config/app-config.module';
import { StickerMgs } from './model/sticker.mgs';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface Size {
  width: number;
  height: number;
}

@Directive({
  selector: '[appMovableArea]'
})
export class MovableAreaDirective implements OnInit, AfterContentInit {

  public actualWindowSize: Size;
  private resizeSub = new Subject<Size>();

  _timeout: any = null;

  @ContentChildren(MovableDirective, {descendants: true}) movables: QueryList<MovableDirective>;

  private boundaries: Boundaries;

  constructor(private element: ElementRef,
              @Inject(APP_CONFIG) private config: AppConfig) {}

  ngOnInit() {
    this.actualWindowSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.resizeSub.asObservable().subscribe(
      (s: Size) => {
        this.actualWindowSize = s;
      }
    );
}

  ngAfterContentInit(): void {
    this.movables.forEach(movable => {
      movable.dragStart.subscribe(() => this.measureBondaries(movable));
      movable.dragMove.subscribe(() => this.maintainBondaries(movable));
    });

    this.movables.changes.subscribe( () => {
      this.movables.forEach(movable => {
        movable.dragStart.subscribe(() => this.measureBondaries(movable));
        movable.dragMove.subscribe(() => this.maintainBondaries(movable));
      });
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeSub.next({width: window.innerWidth, height: window.innerHeight});

    this.movables.forEach(movable => {
      this.maintainBondariesOnResizing(movable);
    });

    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.afterStopResizing();
    }, 1000);
  }

  afterStopResizing(): void {
    this.movables.forEach(movable => {
      movable.saveStickerOnPointerUpEmitter.emit(new StickerMgs(
        movable.element.nativeElement.id,
        Math.round(movable.element.nativeElement.offsetLeft + movable.position.x),
        Math.round(movable.element.nativeElement.offsetTop + movable.position.y
      )));
    });
  }

  private measureBondaries(movable: MovableDirective) {
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();
    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + movable.position.x,
      maxX: viewRect.right - movableClientRect.right + movable.position.x,
      minY: viewRect.top - movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y,
    };
  }

  private maintainBondaries(movable: MovableDirective) {
    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);
  }

  private  maintainBondariesOnResizing(movable: MovableDirective) {
    if (this.actualWindowSize.width > 270) {
      movable.position.x = Math.min((movable.element.nativeElement.offsetLeft + movable.element.nativeElement.offsetWidth),
        (this.actualWindowSize.width - this.config.toolbar.width)) -
        (movable.element.nativeElement.offsetLeft + movable.element.nativeElement.offsetWidth);

    } else {
      movable.position.x = -movable.element.nativeElement.offsetLeft;
    }

    if (this.actualWindowSize.height > 300) {
      movable.position.y = Math.min((movable.element.nativeElement.offsetTop + movable.element.nativeElement.offsetHeight),
        this.actualWindowSize.height) -
        (movable.element.nativeElement.offsetTop + movable.element.nativeElement.offsetHeight);

    } else {
      movable.position.y = -movable.element.nativeElement.offsetTop;
    }
  }
}
