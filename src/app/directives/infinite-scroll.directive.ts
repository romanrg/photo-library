import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnDestroy {

  @Output() intersect = new EventEmitter();

  private observer: IntersectionObserver;
  constructor(private el: ElementRef) {
    this.observer = new IntersectionObserver(this.intersectionCallback.bind(this));
    this.observer.observe(this.el.nativeElement);
  }

  private intersectionCallback(entries: Array<IntersectionObserverEntry>, observer: IntersectionObserver) {
    entries.forEach(entry => {
      if (this.isIntersecting(entry)) {
        this.intersect.next({entry, observer});
      }
    })
  }

  private isIntersecting(entry: IntersectionObserverEntry): boolean {
    return entry.isIntersecting || entry.intersectionRatio > 0;
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
