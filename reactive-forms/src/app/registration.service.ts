import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url = 'http://localhost:3000/enroll';

  constructor(private _http: HttpClient) { }

  register(userData): Observable<any> {
    return this._http.post<any>(this._url, userData)
  }
}
