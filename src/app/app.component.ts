import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medijee-digital';
  user:any;

  constructor(private commonSer: CommonService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }



}
