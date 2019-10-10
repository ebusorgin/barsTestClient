import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import {DataService} from '../../_services/data.service';
import {Files} from 'src/app/interfaces/interfaces';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  type = 0;
  textFile;
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3030/upload'});

  constructor(private dataService:DataService,public authService:AuthService) { }

  ngOnInit() {
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      this.uploader.options.additionalParameter = {
        note: this.textFile
      };
    };
    this.uploader.response.subscribe(data=>{

      this.textFile = ''
      this.dataService.myfiles.push(JSON.parse(data));
    });
    this.getMyFiles();
    this.getAllFiles();

  }
  uploadAll(){
  this.uploader.uploadAll();
  }
  async getAllFiles(){
    this.dataService.allfiles = <Files[]>(await this.dataService.send<Files[]>('getAllFiles',{}));
  }
  async getMyFiles(){

      this.dataService.myfiles = <Files[]>(await this.dataService.send<Files[]>('getMyFiles',{}));

  }
}
