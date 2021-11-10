import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any[] = null;

  constructor(private service: CommonService) {

    this.service.user.subscribe(user => {
      this.user = user;
    })

  }

  ngOnInit(): void {
    console.log(this.user)
  }

}
