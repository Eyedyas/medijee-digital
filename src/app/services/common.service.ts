import { Injectable } from '@angular/core';
import { Observable, from, throwError, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public iid: any = '';

  private baseurl = environment.Baseurl;

  public institute_id = 28;



  constructor(
    private http: HttpClient,
    private toast: ToastController,
    public alertController: AlertController,
    public navCtrl: NavController
  ) { }

  getinfo() {
    const url = this.baseurl + '/info/';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }

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

  getCourses() {
    const url = 'https://edusome.azurewebsites.net/api/StudentCourses?student_id=74849';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

}
