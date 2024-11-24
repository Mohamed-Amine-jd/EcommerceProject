import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  tel: number = 0;

  setTel(value: number) {
    this.tel = value;
  }

  getTel(): number {
    return this.tel;
  }
}
