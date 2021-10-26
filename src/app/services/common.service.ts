import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Subscription, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  setHeaderTitle = new EventEmitter();
  subSetHeaderTitle: Subscription;

  public headerTitle = new Subject<any>();
  public headerTitle$ = this.headerTitle.asObservable();

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
    } else {
      console.error(
        `Backend returned code ${errors.status}, ` +
        `body was: ${errors.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
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

}
