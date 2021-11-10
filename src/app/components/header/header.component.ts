import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any[] = null;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user)
  }

}
