import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, ╔ÁDomSanitizerImpl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:╔ÁDomSanitizerImpl) {

  }

  transform(value: string, ...args: unknown[]): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

}
