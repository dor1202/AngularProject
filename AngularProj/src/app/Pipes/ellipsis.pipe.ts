import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

    transform(value: string, count: number = 30): string {
        let ret = value;
        if (ret && ret.length > count) {
            return ret.substring(0, count - 3) + "...";
        }
        return ret;
    }
}
