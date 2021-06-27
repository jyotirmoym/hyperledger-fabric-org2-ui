import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, ɵDomSanitizerImpl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:ɵDomSanitizerImpl) {

  }

  transform(value: string, ...args: unknown[]): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

}
