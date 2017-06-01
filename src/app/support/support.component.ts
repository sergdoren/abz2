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

  public FormSupport: FormGroup;
  public types;

  constructor(private SupService: SupportService) {
    this.FormSupport = new FormGroup({
      "EnquiryType": new FormControl( "", Validators.required),
      "Name": new FormControl( "", Validators.required),
      "Email": new FormControl( "", [
        Validators.required,
        Validators.email,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      "Subject": new FormControl( "", Validators.required),
      "Description": new FormControl( "", [
        Validators.required,
        Validators.maxLength(1000)
      ])
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
  public imgsFile = [];
  public invalid_img: boolean = false;

  imgLoad(e){
    let filesMas = e.dataTransfer ? e.dataTransfer.files : e.target.files;

    this.invalid_img = false;

    for(let key in filesMas) {
      if(key === 'length') return;
      let file = filesMas[key];
      let pattern = /image-*.(png|jpg|jpeg)/;

      if ((file.size > 5 * Math.pow(10, 6))
        && !(file.type.match(pattern))) {
        this.invalid_img = true;
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          let imageSrc = reader.result;
          let img = new Image();
          img.src = imageSrc;
          img.onload = () =>{
            if((img.width < 300) || (img.height < 300)){
              this.invalid_img = true;
              return;
            }
            this.imgs.push(imageSrc);
            this.imgsFile.push(file);
          };
        };
      }
    }
  }

  uploadCleanErr(){
    this.invalid_img = false;
  }

  deleteImg(elem){
    this.imgs.splice(elem, 1);
    this.imgsFile.splice(elem, 1);
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
      'file': this.imgsFile
    };


    this.SupService
      .sendForm(JSON.stringify(data))
      .subscribe(
        res => {
                console.log(res.json());
                alert(res.json().data.message);
              },
        err => {
          console.log(err.json());
          alert('error(img not sends...)');
        }
      );
  }
}
