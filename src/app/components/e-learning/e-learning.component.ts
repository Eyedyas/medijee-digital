import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-learning',
  templateUrl: './e-learning.component.html',
  styleUrls: ['./e-learning.component.css']
})
export class ELearningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToStackHolder(stackholder){
    console.log(stackholder)
    this.router.navigate(['/stackholder'], { state: { stackholder: stackholder } })

  }

}
