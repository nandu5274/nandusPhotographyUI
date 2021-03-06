import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpModule, Response, RequestOptionsArgs, Headers, Http, RequestOptions } from '@angular/http';
import{GallerryService} from './gallery.service';
declare var $: any;
declare var lightGallery:any;
import {Urlsconstnats} from '../common/app.urls';
import {ThumbnileResponse} from '../dto/thumbnileResponse';
import {filelistResponse} from '../dto/filelistResponse';
import {thumblineimageRequest} from '../dto/thumblineimageRequest';
import {ThumnliereponseDTO} from '../dto/ThumnliereponseDTO'
import {Entry} from '../dto/entry';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {Observable} from 'rxjs/Rx';
import { CommonHttpService } from './../common/app.httpservice';
import {picdetailsexcelDTO} from '../dto/picdetailsexcelDTo';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {



urlsconstnats : Urlsconstnats;
thumbnileResponse: ThumbnileResponse;
filelistResponse:filelistResponse;
thumnliereponseDTO:ThumnliereponseDTO;
imageToShow: any;
picdetailsexcelDTOlist=[];
thumblineimageRequest: thumblineimageRequest;
Entry:Entry;
entiresList=[];
thumnliereponseList = [];
isValid:boolean = false;
picdetailsexcelDTO :picdetailsexcelDTO;



constructor(private GallerryService : GallerryService,private domSanitizer: DomSanitizer, private http: CommonHttpService) { 
   
  }

  ngOnInit() {

    this.urlsconstnats = new Urlsconstnats();
    this.thumbnileResponse = new ThumbnileResponse();
    this.picdetailsexcelDTO = new picdetailsexcelDTO();
    this.thumblineimageRequest = new thumblineimageRequest();
    this.thumnliereponseDTO = new ThumnliereponseDTO();

   //this.getfilelist ();
  
   this.export();
   
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






  getfilelist ()
  {
   

    let headers = new Headers();
    let  url = this.urlsconstnats.getFilesListurl;
		let requestOptions = new RequestOptions({ headers: headers });
		headers.append('Content-Type', 'application/json');
 
    headers.append('Authorization','Bearer BlGP1wjm_oQAAAAAAAAAAVjpe035rohPVKwuNMaRtq2I05A10aDDEMhYWkaRKznJ');
    this.GallerryService.uploadPhotoToDropBox( url.toString(),"{\"path\":\"\/PHOTOS\",\"recursive\":false,\"include_media_info\":false,\"include_deleted\":false,\"include_has_explicit_shared_members\":false,\"include_mounted_folders\":true,\"include_non_downloadable_files\":true}", requestOptions).subscribe(
      (data)  => {
      //sucess
      this.filelistResponse = JSON.parse(data["_body"]);
     

      this.getallfilesdata( this.filelistResponse);
    
			},
			error => {

			});

  }


  

  getallfilesdata(data:filelistResponse)
  {
    for(let i =0 ; i<data.entries.length;i++)
    {
      this.Entry  = new Entry();
      this.Entry.path = data.entries[i].path_display;
      this.Entry.format = "jpeg";
      this.Entry.mode = "fitone_bestfit";
      this.Entry.size = "w640h480";
        this.entiresList.push(this.Entry);

        }
        this.thumblineimageRequest.entries = this.entiresList;
      //  this.getimagedata(this.thumblineimageRequest)
  }


  getimagedata (data:any)
  {
   
  let headers = new Headers();
    let  url = this.urlsconstnats.getimagethumblaine;
		let requestOptions = new RequestOptions({ headers: headers });
		headers.append('Content-Type', 'application/json');

    headers.append('Authorization','Bearer BlGP1wjm_oQAAAAAAAAAAVjpe035rohPVKwuNMaRtq2I05A10aDDEMhYWkaRKznJ');
    this.GallerryService.uploadPhotoToDropBox( url.toString(),data, requestOptions).subscribe(
      (data)  => {
      //sucess
      this.thumbnileResponse = JSON.parse(data["_body"]);

      this.getimagesthumblnileSuceess(this.thumbnileResponse);
console.log( "response " + this.thumbnileResponse.entries[0].thumbnail );
this.imageToShow =  'data:image/jpg;base64,' +this.thumbnileResponse.entries[0].thumbnail ;

this.loadScripts();
      },
      
			error => {

			});

  }

  getimagesthumblnileSuceess(data: ThumbnileResponse )
  {
  
      for(let i =0 ; i<data.entries.length;i++)
      {


        this.thumnliereponseDTO =new  ThumnliereponseDTO();

        this.thumnliereponseDTO.imageurl =  'data:image/jpg;base64,' +data.entries[i].thumbnail ;
        this.thumnliereponseDTO.apparture = this.picdetailsexcelDTOlist[i].apparture;
        this.thumnliereponseDTO.exposure = this.picdetailsexcelDTOlist[i].exposure;
        this.thumnliereponseDTO.iso = this.picdetailsexcelDTOlist[i].iso;
        this.thumnliereponseDTO.lense = this.picdetailsexcelDTOlist[i].lense;
        this.thumnliereponseDTO.camera =  this.picdetailsexcelDTOlist[i].camera;
        this.thumnliereponseDTO.name =  this.picdetailsexcelDTOlist[i].name
        this.thumnliereponseList.push(this.thumnliereponseDTO );

        }
        this.isValid = true;
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
      for(let i =((<any>values).length )-1 ; i >=0 ; i--)
      {
        var picdetailsexcelDTO2 = new picdetailsexcelDTO();

        picdetailsexcelDTO2.name = values[i].name;
        picdetailsexcelDTO2.apparture = values[i].apparture;
        picdetailsexcelDTO2.camera = values[i].camera;
        picdetailsexcelDTO2.exposure = values[i].exposure;
        picdetailsexcelDTO2.iso = values[i].iso;
        picdetailsexcelDTO2.lense = values[i].lense;
        picdetailsexcelDTO2.name = values[i].name;
        picdetailsexcelDTO2.path = values[i].path;
       this.picdetailsexcelDTOlist.push(picdetailsexcelDTO2);
      } 
      this.getallfilesdetailsdata(this.picdetailsexcelDTOlist);
  });

    



     }

    
     getallfilesdetailsdata(data:any)
     {
      for(let i =0 ; i<data.length;i++)
      {
        this.Entry  = new Entry();
        this.Entry.path = data[i].path;
        this.Entry.format = "jpeg";
        this.Entry.mode = "fitone_bestfit";
        this.Entry.size = "w640h480";
          this.entiresList.push(this.Entry);
  
          }
          this.thumblineimageRequest.entries = this.entiresList;
          this.getimagedata(this.thumblineimageRequest)
     }



  export() {
    this.http.exportser(this.urlsconstnats.getdetails.toString())
    .subscribe(blob => {


      this.convertExcelToJson(blob)
    



  }
  ),//console.log(data),
                    error => console.log("Error downloading the file."),
                    () => console.log('Completed file download.');
    }
    

}
