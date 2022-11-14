import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  user: any;
  courses: any;
  contactForm: FormGroup;
  institute_id = environment.instituteId;
  branch_id = environment.branch_id;

  constructor(private commonSer: CommonService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.commonSer.user.subscribe(user => {
      this.user = user;
      console.log(this.user)
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getCourse();

    let submitted = localStorage.getItem('submitted');
    if (!submitted){
      setTimeout(() => {
        this.openModal();
      }, 180000);
    } else {

    }


    this.contactForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      place: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      message: [null, Validators.compose([Validators.required])],
      fk_institute_id: this.institute_id,
      fk_branch_id: this.branch_id,
      fk_source_id: 2,
      type: "website"
    });

  }

  async getCourse() {
    this.commonSer.getCourses().subscribe(res => {
      // loading.dismiss()
      this.courses = res.Items.reverse().slice(2, 5);
      console.log(this.courses)
    })
  }
  getCourseDetail(course: any) {
    this.router.navigateByUrl('/course/' + course.pk_course_id)
  }

  async submitForm(formData): Promise<any> {

    if (formData.name === ''
      || formData.email === ''
    ) {
      alert('Please enter all the mandatory fields!')
      return false;
    }

    let name = formData.name;
    let email = formData.email;
    let message = formData.message;
    let phone = formData.phone;
    localStorage.setItem('submitted', 'true'); 

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.commonSer.contactUs(formData).subscribe((result) => {
      loading.dismiss();
      this.SRNEmail(name, email, message, phone);
    }, (error) => {
      loading.dismiss();
      this.commonSer.showToast('Oops! Something went wrong. Please try again later.');
    });

    
  }

  SRNEmail(name, email, message, phone){
    this.commonSer.SRNEmail(name, email, message, phone).subscribe(resp => {
      this.contactForm.reset();
      alert('Your request has been submitted successfully! SRN Partners team will connect with you soon.');
    }, (error) => {
      this.commonSer.showToast('Oops! Something went wrong. Please try again later.');
    });
  }

  gotoClientSome() {
    window.open('https://eyedyas.com/offerings/clientsome')
  }

  openModal() {
    $('#exampleModal').modal('show');
  }

}
