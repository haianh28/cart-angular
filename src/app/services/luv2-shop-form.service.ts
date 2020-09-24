import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }
  getCreditCardMonths(startMonth : number) : Observable<number[]>{
    let data : number[] = [];
    // build an array for "Month" dropdown list
    // start at current month and loop until
    for(let theMonth = startMonth;theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }
  // o day lay nam he thong co san nen khong can khoi tao 1 bien moi
  getCreditCardYear():Observable<number[]>{
    let data : number[]= [];
    // build an array for "year" downlist List
    // start at current year and loop for next 10 years
    const startYear : number= new Date().getFullYear();
    const endYear : number = startYear + 10;
    for(let theYear = startYear; theYear<=endYear;theYear++){
      data.push(theYear);
    }
    return of(data);
  }
}
