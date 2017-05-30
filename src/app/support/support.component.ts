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
      "EnquiryType": new FormControl( "", Validators.required),
      "Name": new FormControl( "", Validators.required),
      "Email": new FormControl( "", [
        Validators.required,
        Validators.email
      ]),
      "Subject": new FormControl( "", Validators.required),
      "Description": new FormControl( "", [
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
          this.setSelectValue(this.types[this.types.length -1]);
        }
      )
  }

  public listShow: boolean = false;
  public selectValue;
  public showOther;

  showList(){
    this.listShow = !this.listShow;
  }

  setSelectValue(val){
    this.selectValue = val;
    this.FormSupport.controls['EnquiryType'].setValue(val);
    val.toLowerCase() == 'other' ? this.showOther = true : false;
  }


  validate(cntr){
    return this.FormSupport.controls[cntr].invalid && this.FormSupport.controls[cntr].touched;
  }

  public imgs = [];
  public invalid_img: boolean = false;

  imgLoad(e){
    let filesMas = e.dataTransfer ? e.dataTransfer.files : e.target.files;

    this.invalid_img = false;
    //
    // if((this.imgs.length + filesMas.length) >= 7){
    //   this.invalid_img = true;
    //   return;
    // }

    for(let key in filesMas){
      let file = filesMas[key];
      let pattern = /image-*.(png|jpg|jpeg)/;
      if (!file.type.match(pattern)) {
        this.invalid_img = true;
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
