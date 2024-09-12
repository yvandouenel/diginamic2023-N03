import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KatasService {
  ARABIC_DIGITS = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

  ROMAN_DIGITS = [
    'M',
    'CM',
    'D',
    'CD',
    'C',
    'XC',
    'L',
    'XL',
    'X',
    'IX',
    'V',
    'IV',
    'I',
  ];
  constructor() {}
  fizzBuzz(num: number): number | string {
    if (num % 5 == 0 && num % 3 == 0) return 'fizzBuzz';
    if (num % 5 == 0) return 'buzz';
    if (num % 3 == 0) return 'fizz';
    return num;
  }
  /* converToRomain(num: number): string {
    let resultat = '';

    for (let i = 0; i < this.ARABIC_DIGITS.length; i++) {
      while (num >= this.ARABIC_DIGITS[i]) {
        resultat += this.ROMAN_DIGITS[i];
        num -= this.ARABIC_DIGITS[i];
      }
    }
    return resultat;
  } */
  arabicToRomain(num: number): string {
    let result = '';
    for (let i = 0; i < this.ARABIC_DIGITS.length; i++) {
      while (num >= this.ARABIC_DIGITS[i]) {
        result += this.ROMAN_DIGITS[i];
        num -= this.ARABIC_DIGITS[i];
      }
    }
    return result;
  }
}
