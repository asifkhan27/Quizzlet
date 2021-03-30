import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formail'
})
export class FormailPipe implements PipeTransform {

  transform(value:string ,flag:string): string {
    if(flag=="mail")return 'mailto://'+value;
    else if(flag=="tel") return 'tel://'+value;
    else return "";
  }

}
