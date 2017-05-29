import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SupportService } from './support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.sass'],
  providers: [SupportService]
})
export class SupportComponent implements OnInit {

  private FormSupport: FormGroup;
  public types;

  constructor(private SupService: SupportService) {
    this.FormSupport = new FormGroup({
      "EnquiryType": new FormControl( "Type", Validators.required),
      "EnquiryTypeOther": new FormControl( "EnquiryTypeOther"),
      "Name": new FormControl( "Name", Validators.required),
      "Email": new FormControl( "Email", [
        Validators.required,
        Validators.email
      ]),
      "Subject": new FormControl( "Subject", Validators.required),
      "Description": new FormControl( "Description", [
        Validators.required,
        Validators.maxLength(1000)
      ]),
      "Images": new FormControl()
    })
  }

  ngOnInit() {
    this.SupService
      .getTypes()
      .subscribe(
        (res) => {
          this.types = res.map(item => item.name);
          this.FormSupport.controls['EnquiryType'].updateValueAndValidity('Type');
        }
      )
  }

  imgs = [];

  imgLoad(e){
    let filesMas = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files;

    console.log(e.target.files);

    for(let key in filesMas){

      let file = filesMas[key];

      let pattern = /image-*/;
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }

      let reader = new FileReader();
      reader.readAsDataURL(filesMas[key]);
      reader.onload = this.readLoaded.bind(this);
    }
  }

  readLoaded(e) {
    let reader = e.target;
    let imageSrc = e.target.result;
    this.imgs.push(imageSrc);
  }

  deleteImg(elem){
    this.imgs.splice(elem, 1);
  }

  submit(){
    console.log(this.FormSupport);
    console.log(this.FormSupport.valid);
    console.log(this.FormSupport.controls);
  }
}
