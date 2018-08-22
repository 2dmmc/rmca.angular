import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'rmb'})
export class RmbPipe implements PipeTransform {

  transform(input: number): number {
    return input / 100;
  }
}
