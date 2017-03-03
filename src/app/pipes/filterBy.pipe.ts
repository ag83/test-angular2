import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy',
    pure: false
})
export class FilterByPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {  
        if (!items || !items.length || !value) {
            return items;
        };        
        return items.filter((item) => {
            return item[field].indexOf(value) !== -1;
        });
    }
}