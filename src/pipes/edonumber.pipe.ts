/**
 * @license
 * Copyright (c) 2018, COMAU S.p.A.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those
 * of the authors and should not be interpreted as representing official policies,
 * either expressed or implied, of the FreeBSD Project.
 */

import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import * as Utils from '../utils';

/**
 * Pipe formatting number with 2 decimal with cache
 */
@Pipe({name: 'edonumber'})
export class EDONumberPipe implements PipeTransform {
  private formatter:Intl.NumberFormat;

  constructor(@Inject(LOCALE_ID) private _locale: string) {
    const options: Intl.NumberFormatOptions = {
      minimumIntegerDigits: 1,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    this.formatter = new Intl.NumberFormat(_locale, options);
  }

  transform(value: any, args?: string): string|null {
    if (value == null) return null;

    value = typeof value === 'string' && isNumeric(value) ? +value : value;
    if (typeof value !== 'number') {
      throw Error(`InvalidPipeArgument: '${value}' for EDONumberPipe`);
    }

    return this.formatter.format(value as number);
  }
}

export function isNumeric(value: any): boolean {
  return !isNaN(value - parseFloat(value));
}
