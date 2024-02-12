import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";



@Directive({
    selector: `[app-input]`
})

export class InputDirective implements OnInit {

    constructor(private eleRef: ElementRef) {

    }
    ngOnInit(): void {
        this.errMsg()
    }

    @HostListener(`input`, ['$event'])

    onInput(eve: Event) {
        let control = eve.target as HTMLInputElement;
        control.value = control.value.replace(/\s+/g, '');
        let val = control.value;
        if (val.length > 16) {
            val = val.slice(0, 16)
        }
        if (/[^\d]/.test(val)) {
            control.nextElementSibling?.classList.remove(`d-none`)
        } else {
            control.nextElementSibling?.classList.add(`d-none`)
        }

        control.value = this.chunkedArr(val);
        console.log(val);

    }
    private chunkedArr(str: string) {
        let arr: Array<string> = [];
        for (let i = 0; i < str.length; i += 4) {
            arr.push(str.slice(i, i + 4))
        }
        return arr.join(' ')
    }

    private errMsg() {
        let para = document.createElement(`p`);
        para.className = `alert alert-danger mt-1 d-none`;
        para.innerHTML = `Plz Enter a Valid Input`;
        // return para
        this.eleRef.nativeElement.parentNode.append(para)
    }
}