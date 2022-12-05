import { Injectable } from '@angular/core';
import { Error } from '../model/Error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() { }

  alert(error: Error) {
    alert('ERROR: ' + error.status + '\nMessage: ' + error.message)
  }
}
