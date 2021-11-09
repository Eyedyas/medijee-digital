import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  user: any = null;

  setHeaderTitle = new EventEmitter();
  subSetHeaderTitle: Subscription;

  public headerTitle = new Subject<any>();
  public headerTitle$ = this.headerTitle.asObservable();

  // public iid: any = 20;

  private baseurl = environment.Baseurl;

  // public institute_id = 28;


  constructor(
    private http: HttpClient,
    private __http: HttpClient,
    private toast: ToastController,
    public alertController: AlertController,
    public navCtrl: NavController
  ) { }

  errorHandler(errors: HttpErrorResponse) {
    if (errors.error instanceof ErrorEvent) {
    } else {
      console.error(
        `Backend returned code ${errors.status}, ` +
        `body was: ${errors.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  onRegister(data: any) {
    let url = this.baseurl + 'api/Registration/';
    return this.__http.post(url, data)
      .pipe(map((resp: any) => {
        return resp;
      })
      )
  }


  getCourses() {
    const url = this.baseurl + '/Course?institute_id=' + environment.instituteId + '&branch_id=119';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }
  getBlogs() {
    const url = this.baseurl + '/Blog?institute_id=' + environment.instituteId + '&branch_id=119';
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

  getCourseDetails(courseId: any) {
    const url = this.baseurl + '/Course?id=' + courseId;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

  getBlogDetails(blogId: any) {
    const url = this.baseurl + '/Blog?id=' + blogId;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }));
  }

  async showToast(displayMessage: string, position?: 'bottom' | 'top' | 'middle', duration?: number) {
    const toast = await this.toast.create({
      message: displayMessage,
      duration: duration || 3000,
      position: position || 'bottom'
    });
    toast.present();
  }

  getPaymentTransaction(trackingId: any) {
    const url = this.baseurl + '/PaymentTransaction?tracking_id=' + trackingId;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }

  serviceBooking(data: any) {
    const url = this.baseurl + '/Admission';
    return this.http.post(url, data)
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }

  GetOrders(student_id: string) {
    const url = 'https://clientsomev2-dev.azurewebsites.net/api/Order/GetOrderDetailsById?student_id=9011'
    return this.http.post(url, {})
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }

  // removeDuplicates(originalArray: any[], prop: string) {
  //   var obj = {};

  //   for (var i = 0, len = originalArray.length; i < len; i++)
  //     obj[originalArray[i][prop]] = originalArray[i];

  //   originalArray = new Array();
  //   for (var key in obj)
  //     originalArray.push(obj[key]);

  //   console.log(originalArray)

  //   return originalArray;
  // }

  setNewUser(userInfo) {
    console.log(userInfo);
    const url = this.baseurl + '/Student';
    return this.http.post(url, userInfo)
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }

  removeToken(token) {
    const url = this.baseurl + '/AuthToken/' + token;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.errorHandler));
  }
}
