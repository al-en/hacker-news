import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date): String {
    let new_date = '';
    let now = new Date();
    let date = new Date(value);
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    // If the article has been created the same day
    if((date.getDate() == now.getDate()) && (date.getMonth() == now.getMonth())){
      new_date = ` ${date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}`;
    }
    // If the article has been created the previous day
    else if((date.getDate() == now.getDate()-1) && (date.getMonth() == now.getMonth())){
      new_date = `Yesterday`;
    }
    // The other dates
    else{
      new_date = `${MONTHS[date.getMonth()]} ${date.getDate()}`;
    }
    return new_date;
  }

}
