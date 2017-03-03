import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortArr',
    pure: false
})
export class SortArrPipe implements PipeTransform {
    transform(items, field, value) {
        if (!items || !items.length || value === undefined) {
            return items;
        };
        if(value) {
            return items.sort((a, b) => {
                  if (a[field] < b[field]){
                    return -1;
                  }
                  if (a[field] > b[field]) {
                    return 1;
                  }
                  return 0;
            });
        }       
        return items.sort((a, b) => {
                if (a[field] > b[field]){
                  return -1;
                }
                if (a[field] < b[field]) {
                  return 1;
                }
                return 0;
        });
    }
}