import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
    name: 'momentpipe',
    pure: false
})
export class MomentPipe implements PipeTransform {

    transform(m: moment.Moment | null, format: string = 'MMMM YYYY'): any {
        if (m) {
            return m.format(format);
        }
    }

}