import { Component, OnInit } from '@angular/core';
import { ThumnliereponseDTO } from '../dto/ThumnliereponseDTO';
import { CommonHttpService } from './../common/app.httpservice';
import {picdetailsexcelDTO} from '../dto/picdetailsexcelDTo';
import { HttpModule, Response, RequestOptionsArgs, Headers, Http, RequestOptions } from '@angular/http';
import * as XLSX from 'xlsx';
import {Urlsconstnats} from '../common/app.urls';
import { UploadService } from './upload.service';
import { filelistResponse } from '../dto/filelistResponse';
import { ThrowStmt } from '@angular/compiler';

declare var $: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


urlsconstnats : Urlsconstnats;
username : any;
password :any;
hidelogin:boolean= false;
uploadstatus = [];
name:any;
  path:any;
    exposure:any;
      apparture:any;
        iso:any;	
        lense:any;	
        camera:any;


imageUrl: string | ArrayBuffer =
"";
fileName: string = "No file selected";
picdetailsexcelDTOlist=[];
picdetailsexcelDTO :picdetailsexcelDTO;
file: File;
imagefile:File;

  constructor(private http: CommonHttpService, private uploadservice:UploadService) { }

  ngOnInit() {
    this.urlsconstnats = new Urlsconstnats();
 
    this.loadScripts();

  }




  loadScripts() { 
  
    // This array contains all the files/CDNs 
    const dynamicScripts = [ 
        'assets/js/aos.js',
        'assets/js/main.js'
       //Load all your script files here'
    ]; 
    for (let i = 0; i < dynamicScripts.length; i++) { 
      const node = document.createElement('script'); 
      node.src = dynamicScripts[i]; 
      node.type = 'text/javascript'; 
      node.async = false; 
      document.getElementsByTagName('head')[0].appendChild(node); 
    } } 

        logindetails()
      {
          if(this.username == 'nandu' && this.password == 'appleipod')
          {
            this.hidelogin = true;

          }


      }





  




    uploadphoto()
    {


      $("#myModal").modal('show');
          this.uploadstatus.push("uploading started");
          //get file 
          this.getfile();
          this.uploadstatus.push("getting file..")

    }

  getfile() {
    this.http.exportser(this.urlsconstnats.getdetails.toString())
    .subscribe(blob => {

      this.uploadstatus.push("getting file sucess ..");
      this.convertExcelToJson(blob)
    



  }
  ),//console.log(data),
                    error => console.log("Error downloading the file."),
                    () =>    this.uploadstatus.push("geting file failed ..");
                    () => console.log('Completed file download.');
    }
    

    convertExcelToJson(file)
    {

     let reader = new FileReader();
     let workbookkk;
     let XL_row_object;
     let json_object;
     reader.readAsBinaryString(file);
     let data = reader.result;
     workbookkk=XLSX.read(data,{type: 'binary'});
     console.log(workbookkk);

    
  var resolve = new Promise((resolve, reject) => {
       reader.onload = function(){
         //  alert(reader.result);
         let data = reader.result;
          workbookkk=XLSX.read(data,{type: 'binary'});
          console.log(workbookkk);
          workbookkk.SheetNames.forEach(function(sheetName) {
           // Here is your object
            XL_row_object = XLSX.utils.sheet_to_json(workbookkk.Sheets[sheetName]);
            json_object = JSON.stringify(XL_row_object);
          //  console.log("text");
          // console.log(json_object);
   
           console.log(XL_row_object);
             resolve(XL_row_object);
         });
         };
     });

     resolve.then(values  => { 


      var listOfObjects = [];
      for(let i =0 ; i < (<any>values).length; i++)
      {
        var picdetailsexcelDTO2 = new picdetailsexcelDTO();

        picdetailsexcelDTO2.name = values[i].name;
        picdetailsexcelDTO2.path = values[i].path;
        picdetailsexcelDTO2.exposure = values[i].exposure;
        picdetailsexcelDTO2.apparture = values[i].apparture;
        picdetailsexcelDTO2.iso = values[i].iso;
        picdetailsexcelDTO2.lense = values[i].lense;
        picdetailsexcelDTO2.camera = values[i].camera;
       
       this.picdetailsexcelDTOlist.push(picdetailsexcelDTO2);
      } 
      this.addNewPIcDetailsToExcell( this.picdetailsexcelDTOlist);
  });


     }

      addNewPIcDetailsToExcell(data:any)
      {
        this.uploadstatus.push("adding new changes to file  ..");
this.path = "/PHOTOS/"+this.name+".jpg";

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        var range = XLSX.utils.decode_range(worksheet['!ref']);

        var rowcount = range.e.r + 1;
        var totalrowcount = range.e.r + 3;
          console.log("range" +rowcount);

          XLSX.utils.sheet_add_aoa(worksheet, [
            [this.name,	this.path,	this.exposure,	this.apparture,	this.iso,	this.lense,	this.camera]

          ], {origin: -1});


        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
       // this.downloadFile(excelBuffer, excelFileName);
      //  XLSX.writeFile(workbook,'picdetails.xlsx' );
       var fd = new FormData();
        fd.append('data', new File([excelBuffer], 'picdetails.xlsx'));
       
        var f = new File([excelBuffer], "filename");
        var req = new XMLHttpRequest();
        this.uploadstatus.push("adding new changes to file complted sucessfully ..");
        this.uploadstatus.push("uplaoding new file ..");
        this.UploadFileToDropBox(f,'hj');

       //  req.open("POST", "https://content.dropboxapi.com/2/files/upload", true);
        // req.setRequestHeader('Authorization','Bearer BlGP1wjm_oQAAAAAAAAAAVjpe035rohPVKwuNMaRtq2I05A10aDDEMhYWkaRKznJ');
         //req.setRequestHeader('Content-Type', 'text/plain; charset=dropbox-cors-hack');
         //req.setRequestHeader('Dropbox-API-Arg', '{"path":"\/DETAILS\/'+'picdetails.xlsx' +'\","mode":"overwrite","autorename":false,"mute":false,"strict_conflict":false}');
       
        
        //req.send(f);

     //  this.uploadFile(fd);
      
      }
 



      uploadFile(excelBuffer:any) {
        this.http.uploadfile('https://content.dropboxapi.com/2/files/upload',excelBuffer)
        .subscribe(blob => {
    
    
          console.log("testjhasgf")
        
    
    
    
      }
      ),//console.log(data),
                        error => console.log("Error downloading the file."),
                        () => console.log('Completed file download.');
        }

        onChange(file: File) {

          if (file) {
            this.fileName = file.name;
            this.file = file;
      
            const reader = new FileReader();
            reader.readAsDataURL(file);
      
            reader.onload = event => {
              this.imageUrl = reader.result;
            };
      
            this.imagefile = this.file;
           // this.UploadAdharFileToDropBox(this.file,this.file);
          }
        }
      


      UploadFileToDropBox (data:any,filename:any)
      {
    
        let headers = new Headers();
        let requestOptions = new RequestOptions({ headers: headers });
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Dropbox-API-Arg', '{"path":"\/DETAILS\/'+'picdetails.xlsx' +'\","mode":"overwrite","autorename":false,"mute":false,"strict_conflict":false}');
        headers.append('Authorization','Bearer BlGP1wjm_oQAAAAAAAAAAVjpe035rohPVKwuNMaRtq2I05A10aDDEMhYWkaRKznJ');
        this.uploadservice.uploadPhotoToDropBox('https://content.dropboxapi.com/2/files/upload',data, requestOptions).subscribe(
          (data)  => {
          //sucess
          this.uploadstatus.push("uplaoding new file sucess ..");
  console.log("sucess");
          this.uploadstatus.push("uplaoding new photo ..");
        this.UploadImageToDropBox( this.imagefile );
     
          },
          error => {
            this.uploadstatus.push("uplaoding new file failed ..");
          //error
          });
    
      }



      UploadImageToDropBox (data:any)
      {
      var photoname = this.name + ".jpg";
        let headers = new Headers();
        let requestOptions = new RequestOptions({ headers: headers });
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Dropbox-API-Arg', '{"path":"\/PHOTOS\/'+photoname+'\","mode":"add","autorename":true,"mute":false,"strict_conflict":false}');
        headers.append('Authorization','Bearer BlGP1wjm_oQAAAAAAAAAAVjpe035rohPVKwuNMaRtq2I05A10aDDEMhYWkaRKznJ');
        this.uploadservice.uploadPhotoToDropBox('https://content.dropboxapi.com/2/files/upload',data, requestOptions).subscribe(
          (data)  => {
          //sucess
        
          this.uploadstatus.push("uplaoding new photo sucess..");
     
          },
          error => {
            this.uploadstatus.push("uplaoding new photo failed..");
            
          //error
          });
    
      }



}
