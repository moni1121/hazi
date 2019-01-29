import { Directive, ElementRef, HostListener, HostBinding, Renderer2 } from '@angular/core';

@Directive({
    selector: '[MenuMouseDirective]'
})
export class MenuMouseDirective {

    @HostBinding('style.color') color: string;

    constructor(
        private el: ElementRef) { }

    @HostListener('mouseover') onMouseOver() {
        this.el.nativeElement.style.backgroundColor = 'pink';
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.style.backgroundColor = 'initial';
    }
}
