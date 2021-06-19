import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
  name: 'i18n',
})
export class Translate implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(query: any): any {
    return query ? this.translate.instant(query) : query;
  }
}
