import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  menu = $('.menu');
  menuActive = false;


  constructor(private service: CommonService) {

    this.service.user.subscribe(user => {
      this.user = user;
    })

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    $('#hamburger').click(function() {
      $('#mymenu').toggleClass('activemenu');
    });

    $('.menu_close').click(function() {
      $('#mymenu').toggleClass('activemenu');
    });

    $('li.menu_mm').click(function() {
      $('#mymenu').toggleClass('activemenu');
    });

    

    

  }


}
