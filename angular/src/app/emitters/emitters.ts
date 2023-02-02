import {EventEmitter} from '@angular/core'
export class Emitters {
    static authEmitter = new EventEmitter<Boolean>();
    static idEmitter = new EventEmitter<String>();
}