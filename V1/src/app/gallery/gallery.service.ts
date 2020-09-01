import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonHttpService } from './../common/app.httpservice';

@Injectable()
export class GallerryService {
  constructor(
    private http: CommonHttpService
  ){}
  
  public searchresultCount(uri: string, args?: RequestOptionsArgs) {
    return this.http.get(uri,args).map((res: Response) => res);
  }
  
  public addOrder(url:string, data:any, args?: RequestOptionsArgs){
    return this.http.post(url, data,args).map((res: Response) => res);
    
  }


  public uploadPhotoToDropBox(url:string, data:any, args?: RequestOptionsArgs){
    return this.http.DropboxPost(url, data,args).map((res: Response) => res);
    
  }

  public uploadFileToDropBox(url:string, data:any, args?: RequestOptionsArgs){
    return this.http.DropboxPost(url, data,args).map((res: Response) => res);
    
  }
    
  public getRoomDetailsRequest(uri: string, args?: RequestOptionsArgs) {
    return this.http.get(uri,args).map((res: Response) => res);
  }

  public getRoomDetailsRequest2(uri: string, args?: RequestOptionsArgs) {
    return this.http.get2(uri,args).map((res: Response) => res);
  }
    
  public saveRoomBooking(url:string, data:any, args?: RequestOptionsArgs){
    return this.http.post(url, data,args).map((res: Response) => res);
  
  }

    

  public getAllCheckinDetailsRequest(uri: string, args?: RequestOptionsArgs) {
    return this.http.get(uri,args).map((res: Response) => res);
  }

  public getbudgetdetails(uri: string, args?: RequestOptionsArgs) {
    return this.http.get(uri,args).map((res: Response) => res);
  }

  public getAllAdvanceBookingDetails(uri: string, args?: RequestOptionsArgs) {
    return this.http.get(uri,args).map((res: Response) => res);
  }


}
