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
          this.setSelectValue(this.types[0]);
        }
      );
  }

  public lengDesk = '';

  public listShow: boolean = false;
  public selectValue;
  public showOther: boolean = false;

  showList(){
    this.listShow = !this.listShow;
  }

  setSelectValue(val){
    this.selectValue = val;
    let ET = this.FormSupport.controls['EnquiryType'];

    if(val.toLowerCase() == 'other'){
      this.showOther = true;
      this.selectValue = 'Other';
      ET.setValue('');
      ET.markAsUntouched(true);
    }else{
      this.showOther = false;
      ET.setValue(val);
    };
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
    let FS = this.FormSupport;

    if(!FS.valid) {
      for (let key in FS.controls) {
        FS.controls[key].markAsTouched();
      }
      return;
    }

    let FS_cn = FS.controls;

    let data = {
      'enquiry_type': FS_cn['EnquiryType'].value,
      'user_name': FS_cn['Name'].value,
      'email': FS_cn['Email'].value,
      'subject': FS_cn['Subject'].value,
      'description': FS_cn['Description'].value,
      'file': []
    };

    this.SupService.sendForm(JSON.stringify(data));
    console.log(this.FormSupport);
    console.log(this.FormSupport.valid);
    console.log(this.FormSupport.controls);
  }
}
