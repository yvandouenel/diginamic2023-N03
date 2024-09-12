import { TestBed } from '@angular/core/testing';

import { KatasService } from './katas.service';

describe('KatasService', () => {
  let service: KatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // nouvelle assertion pour la méthode fizzBuzz qui doit renvoyer 1 pour 1
  it('should return 1 for 1', () => {
    expect(service.fizzBuzz(1)).toBe(1);
  });
  it('should return 2 for 2', () => {
    expect(service.fizzBuzz(2)).toBe(2);
  });
  it('should return fizz for 3', () => {
    expect(service.fizzBuzz(3)).toBe('fizz');
  });
  it('should return buzz for 5', () => {
    expect(service.fizzBuzz(5)).toBe('buzz');
  });
  it('should return fizz for 9', () => {
    expect(service.fizzBuzz(9)).toBe('fizz');
  });
  it('should return fizzBuzz for 15', () => {
    expect(service.fizzBuzz(15)).toBe('fizzBuzz');
  });
  it('should return fizzBuzz for 30', () => {
    expect(service.fizzBuzz(30)).toBe('fizzBuzz');
  });
  // Test de la conversion en nombres romains
  it('should return I for 1', () => {
    expect(service.arabicToRomain(1)).toBe('I');
  });
  it('should return II for 2', () => {
    expect(service.arabicToRomain(2)).toBe('II');
  });
  it('should return X for 10', () => {
    expect(service.arabicToRomain(10)).toBe('X');
  });
});
