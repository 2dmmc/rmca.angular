import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'rmb'})
export class RmbPipe implements PipeTransform {

  transform(input: number): number {
    if (!input) {
      return input;
    }

    if (typeof input !== 'number') {
      throw new Error('Invalid pipe argument for RmbPipe');
    }

    return input / 100;
  }
}
