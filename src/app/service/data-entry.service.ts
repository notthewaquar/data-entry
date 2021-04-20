import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class DataEntryService {
  // baseUrl: string = "http://srvtechservices.com/api/User";
  // baseUrl: string = "https://srvtechnology.com/api/User";
  baseUrl: string = "https://buckdattrend.com/api/User";
  token: string;
  
  dataEntryFormDATA: any = {};
  allDataEntryFormDATA: any = [];
  // dummyDate,
  // dummyDate2,

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}
  // CREATE FORM
  getData() {
    return this.dataEntryFormDATA;
  }
  addNewFormData(dataObj: any) {
    this.dataEntryFormDATA = dataObj;
  }
  // DASHBOARD FORM
  getAllData() {
    return this.allDataEntryFormDATA;
  }
  getEachFormData(id: number) {
    // console.log(id);
    // for (let i = 0; i < this.allDataEntryFormDATA.length; i++) {
    //   this.allDataEntryFormDATA.id = ;
    // }
    // return this.allDataEntryFormDATA[id];
    return this.http.post<any>(
      this.baseUrl + "/search.php",
      `{
        "jwt": "${this.token}",
        "id": ${id}
      }`
    )
  }
  addNewAllFormData(allDataObj: any) {
    console.log(allDataObj);
    return this.http.post(
      this.baseUrl + "/create.php",
      allDataObj
    );
  }
  addAllFormDataApi(allDataObj) {
    this.allDataEntryFormDATA = allDataObj;
  }
  fetchAllData(jwtToken: string) {
    this.token = jwtToken;
    return this.http.post<any>(
      this.baseUrl + "/read.php",
      `{
        "jwt": "${jwtToken}"
      }`
    )
  }
  deleteOne(id: string) {
    return this.http.post<any>(
      this.baseUrl + "/delete.php",
      `{
        "jwt": "${this.token}",
        "id": ${id}
      }`
    )
  }
  getEachFDataPreviewModel(id) {
    // data = allDataEntryFormDATA
    let data;
    for (let i = 0; i < this.allDataEntryFormDATA.length; i++) {
      console.log(this.allDataEntryFormDATA[i].id)
      console.log(id)
      if (
        this.allDataEntryFormDATA[i].id === id + ''
      ) {
        data = this.allDataEntryFormDATA[i];
        return data;
      }
    }
    console.log(data)
    return data;
  }

  updateFormData(allDataObj) {
    console.log(allDataObj);
    return this.http.post(
      this.baseUrl + "/update.php",
      allDataObj
    );
  }

  getAddress(postcode: string) {
    const apiKey = "AIzaSyBzwEYEpxeyxKcHDhLODjdjBov2avJyRTM"
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address="${postcode}&key=${apiKey}`
    )
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}