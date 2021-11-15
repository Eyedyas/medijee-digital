import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;

  constructor(private service: CommonService) {

    this.service.user.subscribe(user => {
      this.user = user;
    })

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.user)
  }

}
