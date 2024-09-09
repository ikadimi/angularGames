import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModalService { 
    public isOpenSubject = new BehaviorSubject(false);
  
    constructor() { }
  
    open(): void {
      this.isOpenSubject.next(true);
    }
  
    close(): void {
      this.isOpenSubject.next(false);
    }
}