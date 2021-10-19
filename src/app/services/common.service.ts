import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
    public alertController: AlertController,
    public navCtrl: NavController
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

  getCourses() {
    const url = this.baseurl + '/StudentCourses?student_id=74849';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

  getEShop() {
    const url = this.baseurl + '/Assets?institute_id=20&branch_id=119';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

  getProductDetails(productId: any) {
    const url = this.baseurl + '/Assets?id=' + productId;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

}
