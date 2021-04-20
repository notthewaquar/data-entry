import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DataEntryService } from '../service/data-entry.service';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit  {
  isLoading: boolean = false;
  previewMode: boolean = false;
  previewId: number;
  previewData: any = {};
  displayedColumns: string[] = [
    "businessName",
    "primaryCatagory",
    "businessCategory",
    "servicesOffered",
    "desOfService",
    "onlineService",
    "addressLine1",
    "addressLine2",
    "addressLine3",
    "country",
    "postcode",
    "copmanyName",
    "companyAddress",
    "companyNumber",
    "nameOfContact",
    "emailOfContactPerson",
    "telephoneNumber",
    "cellphoneNumber",
    "email",
    "website",
    "fbAccount",
    "fbFollower",
    "instaAccount",
    "instaFollower",
    "twitterAccount",
    "twitterFollower",
    "youtubeChannel",
    "youtubeSubscriber",
    "pinterestAccount",
    "pinterestFollower",
    "createdDate",
    "updatedDate",
    "id",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any = [];
  
  businessNameFilter = new FormControl('');
  primaryCatagoryFilter = new FormControl('');
  businessCategoryFilter = new FormControl('');
  servicesOfferedFilter = new FormControl('');
  desOfServiceFilter = new FormControl('');
  onlineServiceFilter = new FormControl('');
  addressLine1Filter = new FormControl('');
  addressLine2Filter = new FormControl('');
  addressLine3Filter = new FormControl('');
  countryFilter = new FormControl('');
  postcodeFilter = new FormControl('');
  copmanyNameFilter = new FormControl('');
  companyAddressFilter = new FormControl('');
  companyNumberFilter = new FormControl('');
  nameOfContactFilter = new FormControl('');
  emailOfContactPersonFilter = new FormControl('');
  telephoneNumberFilter = new FormControl('');
  cellphoneNumberFilter = new FormControl('');
  emailFilter = new FormControl('');
  websiteFilter = new FormControl('');
  fbAccountFilter = new FormControl('');
  fbFollowerFilter = new FormControl('');
  instaAccountFilter = new FormControl('');
  instaFollowerFilter = new FormControl('');
  twitterAccountFilter = new FormControl('');
  twitterFollowerFilter = new FormControl('');
  youtubeChannelFilter = new FormControl('');
  youtubeSubscriberFilter = new FormControl('');
  pinterestAccountFilter = new FormControl('');
  pinterestFollowerFilter = new FormControl('');
  createdDateFilter = new FormControl('');
  updatedDateFilter = new FormControl('');
  filterValues = {
    businessName: '',
    primaryCatagory: '',
    businessCategory: '',
    servicesOffered: '',
    desOfService: '',
    onlineService: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    country: '',
    postcode: '',
    copmanyName: '',
    companyAddress: '',
    companyNumber: '',
    nameOfContact: '',
    emailOfContactPerson: '',
    telephoneNumber: '',
    cellphoneNumber: '',
    email: '',
    website: '',
    fbAccount: '',
    fbFollower: '',
    instaAccount: '',
    instaFollower: '',
    twitterAccount: '',
    twitterFollower: '',
    youtubeChannel: '',
    youtubeSubscriber: '',
    pinterestAccount: '',
    pinterestFollower: '',
    createdDate: '',
    updatedDate: '',
  };

  constructor(
    private dataEntryService: DataEntryService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource();
    // this.dataSource.data = this.dataEntryService.getAllData();
    // this.dataSource.filterPredicate = this.createFilter();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.onFetchAllPost();

    this.businessNameFilter.valueChanges.subscribe(businessName => {
      this.filterValues.businessName = businessName;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.primaryCatagoryFilter.valueChanges.subscribe(primaryCatagory => {
      this.filterValues.primaryCatagory = primaryCatagory;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.businessCategoryFilter.valueChanges.subscribe(businessCategory => {
      this.filterValues.businessCategory = businessCategory;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.servicesOfferedFilter.valueChanges.subscribe(servicesOffered => {
      this.filterValues.servicesOffered = servicesOffered;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.desOfServiceFilter.valueChanges.subscribe(desOfService => {
      this.filterValues.desOfService = desOfService;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.onlineServiceFilter.valueChanges.subscribe(onlineService => {
      this.filterValues.onlineService = onlineService;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.addressLine1Filter.valueChanges.subscribe(addressLine1 => {
      this.filterValues.addressLine1 = addressLine1;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.addressLine2Filter.valueChanges.subscribe(addressLine2 => {
      this.filterValues.addressLine2 = addressLine2;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.addressLine3Filter.valueChanges.subscribe(addressLine3 => {
      this.filterValues.addressLine3 = addressLine3;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.countryFilter.valueChanges.subscribe(country => {
      this.filterValues.country = country;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.postcodeFilter.valueChanges.subscribe(postcode => {
      this.filterValues.postcode = postcode;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.copmanyNameFilter.valueChanges.subscribe(copmanyName => {
      this.filterValues.copmanyName = copmanyName;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.companyAddressFilter.valueChanges.subscribe(companyAddress => {
      this.filterValues.companyAddress = companyAddress;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.companyNumberFilter.valueChanges.subscribe(companyNumber => {
      this.filterValues.companyNumber = companyNumber;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.nameOfContactFilter.valueChanges.subscribe(nameOfContact => {
      this.filterValues.nameOfContact = nameOfContact;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.emailOfContactPersonFilter.valueChanges.subscribe(emailOfContactPerson => {
      this.filterValues.emailOfContactPerson = emailOfContactPerson;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.telephoneNumberFilter.valueChanges.subscribe(telephoneNumber => {
      this.filterValues.telephoneNumber = telephoneNumber;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.cellphoneNumberFilter.valueChanges.subscribe(cellphoneNumber => {
      this.filterValues.cellphoneNumber = cellphoneNumber;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.emailFilter.valueChanges.subscribe(email => {
      this.filterValues.email = email;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.websiteFilter.valueChanges.subscribe(website => {
      this.filterValues.website = website;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.fbAccountFilter.valueChanges.subscribe(fbAccount => {
      this.filterValues.fbAccount = fbAccount;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.fbFollowerFilter.valueChanges.subscribe(fbFollower => {
      this.filterValues.fbFollower = fbFollower;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.instaAccountFilter.valueChanges.subscribe(instaAccount => {
      this.filterValues.instaAccount = instaAccount;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.instaFollowerFilter.valueChanges.subscribe(instaFollower => {
      this.filterValues.instaFollower = instaFollower;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.twitterAccountFilter.valueChanges.subscribe(twitterAccount => {
      this.filterValues.twitterAccount = twitterAccount;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.twitterFollowerFilter.valueChanges.subscribe(twitterFollower => {
      this.filterValues.twitterFollower = twitterFollower;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.youtubeChannelFilter.valueChanges.subscribe(youtubeChannel => {
      this.filterValues.youtubeChannel = youtubeChannel;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.youtubeSubscriberFilter.valueChanges.subscribe(youtubeSubscriber => {
      this.filterValues.youtubeSubscriber = youtubeSubscriber;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.pinterestAccountFilter.valueChanges.subscribe(pinterestAccount => {
      this.filterValues.pinterestAccount = pinterestAccount;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.pinterestFollowerFilter.valueChanges.subscribe(pinterestFollower => {
      this.filterValues.pinterestFollower = pinterestFollower;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.createdDateFilter.valueChanges.subscribe(createdDate => {
      this.filterValues.createdDate = createdDate;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.updatedDateFilter.valueChanges.subscribe(updatedDate => {
      this.filterValues.updatedDate = updatedDate;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onFetchAllPost() {
    this.isLoading= true;
    const jwtToken = this.authService.userToken;
    this.dataEntryService.fetchAllData(jwtToken).subscribe(
      resData => {
      console.log(resData);
      if (
        resData.message &&
        resData.status === 0
      ) {
        console.log(111);
        setTimeout(() => {
          try {
            this.onFetchAllPost();
          } catch(error) {
            console.log(error);
          }
          return;
        }, 2000)
      }
      let eachData = {};
      let allDataObj = [];

      for (let i = 0; i < resData.records.length; i++) {
        const a = resData.records[i];
        eachData = {};
        eachData = {
          businessName: a.bussiness_name,
          primaryCatagory: a.primary_category,
          businessCategory: a.business_category,
          servicesOffered: a.services_offered,
          desOfService: a.desp_of_service,
          onlineService: a.online_service,
          addressLine1: a.address1,
          addressLine2: a.address2,
          addressLine3: a.address3,
          country: a.country,
          postcode: a.postcode,
          copmanyName: a.coy_name,
          companyAddress: a.coy_address,
          companyNumber: a.coy_num,
          nameOfContact: a.name_of_contact,
          emailOfContactPerson: a.email_of_contact_person,
          telephoneNumber: a.tele_num,
          cellphoneNumber: a.cell_num,
          email: a.email,
          website: a.website,
          fbAccount: a.fb_account,
          fbFollower: a.fb_follower,
          instaAccount: a.insta_account,
          instaFollower: a.insta_follower,
          twitterAccount: a.twitter_account,
          twitterFollower: a.twitter_follower,
          youtubeChannel: a.youtube_account,
          youtubeSubscriber: a.youtube_follower,
          pinterestAccount: a.pinterest_account,
          pinterestFollower: a.pinterest_follower,
          createdDate: a.created_at,
          updatedDate: a.updated_at,
          id: a.id,
        };
        allDataObj.push(eachData);
      }
      this.dataEntryService.addAllFormDataApi(allDataObj);
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.dataEntryService.getAllData();
      console.log(this.dataSource);
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error => {
      console.log(error);
      this.isLoading = false;
    })
  }

  onDeleteOne(delId: any) {
    // console.log(this.dataSource);
    this.isLoading = true;
    this.dataEntryService.deleteOne(delId)
    .subscribe(
      resData => {
        this.isLoading = false;
        console.log(resData);
        this.onFetchAllPost();
        this.dataEntryService.openSnackBar(
          "Data was successfully deleted",
          "okay"
        )
      },
      error => {
        this.isLoading = false;
        console.log(error);
        this.onFetchAllPost();
        this.dataEntryService.openSnackBar(
          "Data was successfully deleted",
          "okay"
        )
      }
    );
  }
  
  onEditOne(id: any) {
    console.log(id);
    this.router.navigate(['/edit-form', id]);
  }  

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  onChangedPage(pageDate: PageEvent) {
    console.log(pageDate);
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.businessName.toLowerCase().indexOf(searchTerms.businessName) !== -1
        // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.primaryCatagory.toLowerCase().indexOf(searchTerms.primaryCatagory) !== -1
        && data.businessCategory.toLowerCase().indexOf(searchTerms.businessCategory) !== -1
        && data.servicesOffered.toLowerCase().indexOf(searchTerms.servicesOffered) !== -1
        && data.desOfService.toLowerCase().indexOf(searchTerms.desOfService) !== -1
        && data.onlineService.toLowerCase().indexOf(searchTerms.onlineService) !== -1
        && data.addressLine1.toLowerCase().indexOf(searchTerms.addressLine1) !== -1
        && data.addressLine2.toLowerCase().indexOf(searchTerms.addressLine2) !== -1
        && data.addressLine3.toLowerCase().indexOf(searchTerms.addressLine3) !== -1
        && data.country.toLowerCase().indexOf(searchTerms.country) !== -1
        && data.postcode.toLowerCase().indexOf(searchTerms.postcode) !== -1
        && data.copmanyName.toLowerCase().indexOf(searchTerms.copmanyName) !== -1
        && data.companyAddress.toLowerCase().indexOf(searchTerms.companyAddress) !== -1
        && data.companyNumber.toLowerCase().indexOf(searchTerms.companyNumber) !== -1
        && data.nameOfContact.toLowerCase().indexOf(searchTerms.nameOfContact) !== -1
        && data.emailOfContactPerson.toLowerCase().indexOf(searchTerms.emailOfContactPerson) !== -1
        && data.telephoneNumber.toLowerCase().indexOf(searchTerms.telephoneNumber) !== -1
        && data.cellphoneNumber.toLowerCase().indexOf(searchTerms.cellphoneNumber) !== -1
        && data.email.toLowerCase().indexOf(searchTerms.email) !== -1
        && data.website.toLowerCase().indexOf(searchTerms.website) !== -1
        && data.fbAccount.toLowerCase().indexOf(searchTerms.fbAccount) !== -1
        && data.fbFollower.toLowerCase().indexOf(searchTerms.fbFollower) !== -1
        && data.instaAccount.toLowerCase().indexOf(searchTerms.instaAccount) !== -1
        && data.instaFollower.toLowerCase().indexOf(searchTerms.instaFollower) !== -1
        && data.twitterAccount.toLowerCase().indexOf(searchTerms.twitterAccount) !== -1
        && data.twitterFollower.toLowerCase().indexOf(searchTerms.twitterFollower) !== -1
        && data.youtubeChannel.toLowerCase().indexOf(searchTerms.youtubeChannel) !== -1
        && data.youtubeSubscriber.toLowerCase().indexOf(searchTerms.youtubeSubscriber) !== -1
        && data.pinterestAccount.toLowerCase().indexOf(searchTerms.pinterestAccount) !== -1
        && data.pinterestFollower.toLowerCase().indexOf(searchTerms.pinterestFollower) !== -1
        && data.createdDate.toLowerCase().indexOf(searchTerms.createdDate) !== -1
        && data.updatedDate.toLowerCase().indexOf(searchTerms.updatedDate) !== -1
        // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    }
    return filterFunction;
  }
  viewData(id) {
    this.previewMode = true;
    this.previewId = +id;
    this.previewData = this.dataEntryService.getEachFDataPreviewModel(this.previewId);
    console.log(this.previewId)
    console.log(this.previewData)
  }
  closePreviewModel() {
    this.previewData = {};
    this.previewMode = false;
    this.previewId = null;
  }
}
