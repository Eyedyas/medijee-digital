import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, from, throwError, Subject } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseurl = environment.Baseurl;

  public user = new Subject<any>();
  public user$ = this.user.asObservable();

  public webDashboard = new Subject<any>();
  public webDashboard$ = this.webDashboard.asObservable();

  public studentImage = new Subject<any>();
  public studentImage$ = this.studentImage.asObservable();

  public studentName = new Subject<any>();
  public studentName$ = this.studentName.asObservable();

  constructor(
    private http: HttpClient,
    private toast: ToastController,
  ) { }

  errorHandler(errors: HttpErrorResponse) {
    if (errors.error instanceof ErrorEvent) {
      console.error('An error occurred:', errors.error.message);
    } else {
      console.error(
        `Backend returned code ${errors.status}, ` +
        `body was: ${errors.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  onLogin(data: any) {
    const url = this.baseurl + '/StudentLogin/';
    return this.http.post(url, data)
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }

  async showToast(displayMessage: string, position?: 'bottom' | 'top' | 'middle', duration?: number) {
    const toast = await this.toast.create({
      message: displayMessage,
      duration: duration || 3000,
      position: position || 'bottom'
    });
    toast.present();
  }
  removeToken(token: any) {
    const url = this.baseurl + '/AuthToken/' + token;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }
  getStudentProfile(id: any) {
    const url = this.baseurl + '/Student/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }

}
