import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private isRtlSubject = new BehaviorSubject<boolean>(false);
  isRtl$ = this.isRtlSubject.asObservable();

  setLanguageDirection(isRtl: boolean) {
    this.isRtlSubject.next(isRtl);
    const htmlTag = document.documentElement as HTMLElement;
    htmlTag.dir = isRtl ? 'rtl' : 'ltr';
    if (isRtl) {
      htmlTag.classList.add('rtl');
      htmlTag.classList.remove('ltr');
    } else {
      htmlTag.classList.add('ltr');
      htmlTag.classList.remove('rtl');
    }
  }
}
