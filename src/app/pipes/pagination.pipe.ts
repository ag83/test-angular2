import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pagination',
    pure: false
})
export class PaginationPipe implements PipeTransform {
    transform(items: any[], currentPage: number, pageSize: number): any[] {
        if (!items || !items.length) {
            return items;
        };
        const start = (currentPage - 1) * pageSize;
        const end = currentPage * pageSize;    
        return items.slice(start, end);
    }
}