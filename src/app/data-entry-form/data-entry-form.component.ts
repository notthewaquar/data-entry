import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataEntryService } from '../service/data-entry.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { MatOption } from '@angular/material/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-data-entry-form',
  templateUrl: './data-entry-form.component.html',
  styleUrls: ['./data-entry-form.component.css']
})
export class DataEntryFormComponent implements OnInit {
  dataEntryForm: FormGroup;
  dataEntryFormDATA: any = {};
  isLoading: boolean = false;
  editedIndex: number;
  editMode: boolean = false;
  isPcLoader: boolean = false;
  serviceOffModalOpen: boolean = false;
  selectedSerOff11: any;
  serOffChips: string[] = [];
  soChecked: boolean = false;
  @ViewChild('dataEntryRef') dataEntryRef: any;
  // @ViewChild('allSelected') private allSelected: MatOption;
  previewMode = false;
  primaryCatagoryArr: string[] = [
    'Animals and Nature',
    'Arts, Crafts & Cookery',
    'Beaches',
    'Children\'s centres',
    'Clubs - Baby & Pre-School',
    'Clubs - Support',
    'Clubs - Uniformed',
    'Coastal and Seaside Activities',
    'Community events',
    'Dance Drama and Music',
    'Educational',
    'Fairs and Markets',
    'Film and Theatre',
    'Fun',
    'Other',
    'Outdoor events',
    'Parental Support',
    'Parks & Playgrounds',
    'Party Entertainment',
    'Party Supplies',
    'Party Venues',
    'Playgrounds',
    'Pregnancy Support',
    'Seasonal',
    'Social',
    'Soft Play',
    'Special needs',
    'Sport, recreation and leisure',
    'Support Groups',
  ];
  
  businessCategoryArr: string[] = mainBussinessCateArr;
  selectedBusinessCategory: string[] = this.businessCategoryArr[0].split(",").sort();
  
  // selectedBusinessCat = 'Zoos';
  
  constructor(
    private dataEntryService: DataEntryService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // console.log(this.selectedBusinessCategory);
    this.previewMode = false;
    this.dataEntryForm = new FormGroup({
      'businessName': new FormControl(null),
      'primaryCatagory': new FormControl('Animals and Nature', [Validators.required]),
      'businessCategory': new FormControl(null),
      'servicesOffered': new FormControl(null),
      'desOfService': new FormControl(null),
      'onlineService': new FormControl(null),
      'addressLine1': new FormControl(null),
      'addressLine2': new FormControl(null),
      // 'addressLine3': new FormControl(null),
      'addressLine3': new FormControl("11"),
      'country': new FormControl(null),
      'postcode': new FormControl(null),
      'copmanyName': new FormControl(null, [Validators.required]),
      'companyAddress': new FormControl(null),
      'companyNumber': new FormControl(null),
      'nameOfContact': new FormControl(null),
      'emailOfContactPerson': new FormControl(null, [Validators.email]),
      'telephoneNumber': new FormControl(null),
      'cellphoneNumber': new FormControl(null),
      'email': new FormControl(null, [Validators.email]),
      'website': new FormControl(null),
      'fbAccount': new FormControl(null),
      'fbFollower': new FormControl(null),
      'instaAccount': new FormControl(null),
      'instaFollower': new FormControl(null),
      'twitterAccount': new FormControl(null),
      'twitterFollower': new FormControl(null),
      'youtubeChannel': new FormControl(null),
      'youtubeSubscriber': new FormControl(null),
      'pinterestAccount': new FormControl(null),
      'pinterestFollower': new FormControl(null),
    });
    this.route.params
      .subscribe(
        (params: Params) => {
          let id = params['id'];
          console.log(id);
          if ( id === undefined ) {
            this.editedIndex = undefined;
            return;
          }
          this.isLoading = true;
          this.editedIndex = +id;
          this.editMode = true;
          this.dataEntryService.getEachFormData(+id).subscribe(
            resData => {
              console.log(resData);
              const a = resData.records[0];
              // this.dataEntryForm.controls.businessCategory.patchValue([...this.selectedBusinessCategory, 0]);
              const bCatArr = a.business_category.split(",");
              console.log(bCatArr)
              this.dataEntryForm.patchValue({
                businessName: a.bussiness_name,
                primaryCatagory: a.primary_category,
                // businessCategory: bCatArr,
                servicesOffered: a.services_offered,
                desOfService: a.desp_of_service,
                onlineService: a.online_service,
                addressLine1: a.address1,
                addressLine2: a.address2,
                // addressLine3: a.address3,
                addressLine3: "11",
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
              })
              this.setBusinessCategory();
              this.dataEntryForm.patchValue({
                businessCategory: bCatArr,
              });
              this.isLoading = false;
            },
            error => {
              console.log(error);
              this.isLoading = false;
            }
          );
        }
      );
    this.setSelSerOption();
  }
  // ON CHANGE FOR BUSINESS CATEGORY
  setBusinessCategory() {
    const selectedVal = this.dataEntryForm.value.primaryCatagory;
    const pcI = this.primaryCatagoryArr.indexOf(selectedVal);
    this.selectedBusinessCategory = this.businessCategoryArr[pcI].split(",").sort();
    this.setSelSerOption();
    this.dataEntryForm.value.businessCategory = null;
  }
  setSelSerOption() {
    this.selectedSerOff11 = [];
    let newCheck = {};
    for (let i = 0; i < this.selectedBusinessCategory.length; i++) {
      newCheck = {
        value: this.selectedBusinessCategory[i],
        checked: false
      }
      this.selectedSerOff11.push(newCheck);
    }
    console.log(this.selectedSerOff11);
  }
  // tosslePerOne(all){
  //   this.selectedSerOff11 = this.dataEntryForm.value.businessCategory;
  //   console.log(this.dataEntryForm.controls.businessCategory.value.length);
  //   console.log(this.selectedBusinessCategory.length);
  //   if (
  //     this.dataEntryForm.controls.businessCategory.value.length === this.selectedBusinessCategory.length
  //   ) {
  //     this.soChecked = true;
  //   } else {
  //     this.soChecked = false;
  //   }
  // }
  // toggleAllSelection() {
  //   if (
  //     this.dataEntryForm.controls.businessCategory.value === null
  //   ) {
  //     this.dataEntryForm.controls.businessCategory
  //       .patchValue([...this.selectedBusinessCategory]);
  //     this.selectedSerOff11 = this.dataEntryForm.value.businessCategory;
  //     return;
  //   }
  //   if (
  //     this.dataEntryForm.controls.businessCategory.value.length != this.selectedBusinessCategory.length
  //   ) {
  //     this.dataEntryForm.controls.businessCategory
  //       .patchValue([...this.selectedBusinessCategory]);
  //   } else {
  //     this.dataEntryForm.controls.businessCategory.patchValue([]);
  //   }
  //   this.selectedSerOff11 = this.dataEntryForm.value.businessCategory;
  // }
  onSoChecked() {
    this.soChecked = !this.soChecked;
    for (let i = 0; i < this.selectedSerOff11.length; i++) {
      this.selectedSerOff11[i].checked = this.soChecked;
      this.serOffChips.push(this.selectedSerOff11[i].value);
    }
    console.log(this.selectedSerOff11);

    if (!this.soChecked) {
      this.serOffChips = [];
    }
  }


  onCheckChange(ind, e) {
    // console.log(ind);
    // console.log(e);
    this.selectedSerOff11[ind].checked = e.checked;
    // console.log(this.selectedSerOff11[ind]);
    this.serOffChips = [];
    for (let i = 0; i < this.selectedSerOff11.length; i++) {
      if (this.selectedSerOff11[i].checked) {
        this.serOffChips.push(this.selectedSerOff11[i].value);
      }
    }
  }

  saveSerOffModal() {
    let selCheckVal = [];
    for (let i = 0; i < this.selectedSerOff11.length; i++) {
      if (this.selectedSerOff11[i].checked) {
        selCheckVal.push(this.selectedSerOff11[i].value);
      }
    }
    this.dataEntryForm.patchValue({
      "businessCategory": selCheckVal.toString()
    });
    // console.log(selCheckVal);
    this.sOffModal();
  }
  onSubmit() {
    if (this.dataEntryForm.invalid) {
      this.openSnackBar(
        "Please enter proper detail",
        "okay"
      );
      return;
    }
    // console.log(this.dataEntryForm.value)
    const dataObj = this.dataEntryForm.value;
    this.dataEntryService.addNewFormData(dataObj)
    this.dataEntryFormDATA = dataObj;
    this.previewMode = true;
  }

  resetForm1() {
    this.dataEntryRef.resetForm();
    this.dataEntryForm.patchValue({
      'primaryCatagory': 'Animals and Nature'
    })
  }

  onGetAddress() {
    const postcode = this.dataEntryForm.value.postcode;
    console.log(postcode);
    if (postcode === null) {return}
    this.isPcLoader = true;
    this.dataEntryService.getAddress(postcode)
      .subscribe((resData: any) => {
        // console.log(resData);
        let county: string;
        let country: string;
        let address1: string;
        let address2: string;
        let address3: string;
        if ( resData.results && resData.results[0] ) {
          if ( resData.results[0].address_components ) { 
            for (let i = 0; i < resData.results[0].address_components.length; i++) {
              if ( 
                resData.results[0].address_components[i].types.includes("administrative_area_level_1") ||
                resData.results[0].address_components[i].types.includes("administrative_area_level_2")
              ) {
                county = resData.results[0].address_components[i].long_name;
              }
              if ( resData.results[0].address_components[i].types.includes("country") ) {
                country = resData.results[0].address_components[i].long_name;
              }
              if ( 
                resData.results[0].address_components[i].types.includes("route") ||
                resData.results[0].address_components[i].types.includes("neighborhood")
              ) {
                address1 = resData.results[0].address_components[i].long_name;
              }
              if (
                resData.results[0].address_components[i].types.includes("postal_town") ||
                resData.results[0].address_components[i].types.includes("sublocality")
              ) {
                address2 = resData.results[0].address_components[i].long_name;
              }
            }
          }
          // address1 = resData.results[0].address_components[1].long_name;
          // address2 = resData.results[0].address_components[2].long_name;

          if ( resData.results[0].formatted_address ) { 
            address3 = resData.results[0].formatted_address;
          }
        }
        // console.log(county);
        // console.log(country);
        // console.log(address1);
        // console.log(address2);
        // console.log(address3);
        this.dataEntryForm.patchValue({
          "onlineService": county,
          "country": country,
          "addressLine1": address1,
          "addressLine2": address2,
          "addressLine3": address3
        });
        this.isPcLoader = false;
      }, error => {
        this.isPcLoader = false;
        console.log(error);
      });
  }

  ConfirmData() {
    this.isLoading = true;
    let allDataObj = this.dataEntryForm.value;
    if (this.editMode) {
      allDataObj.id = this.editedIndex;
      allDataObj.jwt = this.dataEntryService.token;
    }
    console.log(allDataObj);
    allDataObj = JSON.stringify(allDataObj);
    // console.log(allDataObj);
    // return;
    if (
      this.editMode === false
    ) {
      this.dataEntryService.addNewAllFormData(allDataObj)
        .subscribe(resData => {
            this.previewMode = false;
            this.openSnackBar("Data was Successfully saved","okay")
            this.resetForm1();
            console.log(resData);
            this.isLoading = false;
          }, error => {
            console.log(error);
            this.isLoading = false;
          }
        );
    } else {
      this.dataEntryService.updateFormData(allDataObj)
        .subscribe(resData => {
            this.previewMode = false;
            this.openSnackBar("Data was Successfully Updated","okay")
            this.resetForm1();
            console.log(resData);
            this.isLoading = false;
            this.editMode = false;
          }, error => {
            console.log(error);
            this.isLoading = false;
          }
        );
    }
  }

  editData() {
    this.previewMode = false;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  sOffModal() {
    this.serviceOffModalOpen = !this.serviceOffModalOpen;
  }
}

const mainBussinessCateArr = [
  "Farms,Zoos,Nature Reserves,National Trust Sites,Bird Watching,RSPBA Sites,Wetlands,Moorlands,Heathlands,Woodlands,Forests,Gardens,Aquariums,Gardening School,Plants & Gardens,Plats And Gardens,Cook And Grow Fruits And Vegetables,Garden Museum,Nurseries Garden,Botanical Garden,Children’s Gardening,Wildlife Gardening,Nature Tots Forest School,Garden Centre,Gardening Lessons,Urban Growth Learning Gardens ,Plant Club,Farm Shop,Gardening Shop,Meet The Animals,Adopt A Donkey,Animal Farm,Wildlife,Animal Handling And Grooming Session,Educational Workshop,Adaptation,Guided Visit Workshop,Animals For Hire,Animal Feed,Mobile Farm,Little Zoo,Building,Nature Night Camping,Rainforest Carousel",
  "Art Clubs,Arts And Crafts For Kids,Ballet,Photography,Pottery,Pottery Painting,Art Party,Face Painting,Art Program,Painting,Sewing,Cooking,Glass Painting,Fabric Painting",
  "Pool,Resort,Water sports",
  "Baby Massage,Baby Sign Language,Relaxation For Children,Babysitters,Baby Osteopathy,Newborn To Crawling,Baby Development,Baby Communication Skills,Improve Babies Sleep Patterns,Improve Babies Flexibility,Mother And Baby Classes,Messy Play,Toddler Play Frame,Giant Play Frame,Garden Games Toys,Play frames ,Watercolors,Toddler Ballet,Preschool Dance,Preschool Ballet,Baby Ballet,Gymnastics For Toddlers,Baby Clinics,Children's Yoga,Mother And Baby Yoga,Therapeutic Massage,Teenage Skin,Baby Skincare,Child Therapy,Children Counselling,Mummy & Baby Yoga,Home Work,Breakfast,Holiday Club,Holiday Camp,Primary School,Out Of School Club,Nursery Preschool,PE & School Sport,Speech & Language Therapy,Baby & Child Nutritional Therapy,Sensory Messy Play,Melody Movement Parent & Toddler Classes,Kids Parties,Osteopathy For Babies And Children,Childminders & Crèches,Libraries and Story times",
  "Special need clubs,Cycling club,BMX club",
  "Cubs,Guides,Brownies,Scouts",
  "Jet Skis,Sailing,Seaside Piers,Windsurfing,Powerboating,Kayaking",
  "Car boot sales,Charities & Fundraising,Litter Picking,Volunteering",
  "Drama,Drama Club,Music Lessons,Music Tuition,Ballroom,Children’s Dance Lessons,Dance Fit,Dance Studios,Kids Dance Lessons,Rosette Ballet,Preparatory Ballet,Preparatory Hip Hop,Jazz Dance,Hip Hoppers,Beat Box,Dynamix,Ignition,Popping And Locking,Lyrical Hip-Hop,Acro,Contortion,Break Dance,Jazz,Modern / Jazz,Tap,Flamenco,Samba,Tango,Body Conditioning,Waltz,Contemporary,Salsa And Bachata In Latin.,Quickstep In Ballroom And The Cha Cha,Foxtrot,Rumba,Paso Doble,Jive,Modern And Contemporary Dance Tap Dancing,Zumba,Modern Dance,Street Dance,Ballet,Baby Ballet,Ballroom And Latin,Classical Indian Dance,Salsa,Line Dancing,Musical Theatre,Drama,Workshops,Performing Arts,Art & Prop Making,Street Dance,Tiny Toes,Tiny Tappers,Act,Dance,Sing,Drama Programmer For Children,Film Class,Lamda,Tap,Choreography,Waacking,Clubbercise,Hiit,Flowetic,Floor Barre,Dance Studios,Kids Aerial Dance",
  "Castles,Museums,Manor Gardens,Historical Homes,Stately Mansions,Educational Psychology,Science Workshop,Speech,Elocution Tuition,Story Time",
  "Farmers Market",
  "Cinema,Theatres Outdoor Cinemas,Youth Theatre",
  "Bowling,Arcades,Crazy Golf,Laser Tag,Foot golf,Miniature Steam Railways,Go Ape,Theme Parks,Arcades,Demolition Ball,Rodeo Bull,Aero Ball,Go karting,Bounce,Air Hockey,Ping Pong,Bungee Run,Skateboarding,Pole Dance,Toasting Marshmallows,Water Splash Parks,Karting,Zip Lines,Go Karts,Carousel,Dance,Paddling Pool,Deco patch,Play Dough,Nerf Wars,Laser Tag,Scavenger Hunt,Scribbling,Outdoor Adventurous,Paint,Art Attack,Archery,Archery Tag,Video Games,Toys,Board Games,Papo,Magic Tricks,Playing Cards,Mechanical Puzzles,Village Games Stocks Jigsaws,Scrabble And Monopoly,Classic Board games,Traditional Toy Shop",
  "Sports Arena,Nanny Agencies,Bike Shop,Repair Servicing,Bike Fitting,Sports Grounds & Stadia,Disabled Pool Hoist,Boot Camps,Badminton Court Hire,Disability Sports,Swimming Lessons With Sign Language,Hip Pain Treatment,Mindfulness,Stroke Victims And Acquired Brain Injuries,Swimming Lessons For The Deaf,Swimming Lessons For Children With Special Needs,Sports Injury Rehab,Back Treatment,Pain Relief Therapy,Shoulder Pain Treatment,Performing Arts Schools,Coaches & Drama Teachers,Anger Management,Anxiety Management,French Classes,Ballet Workshop,Street Dance Workshop,Charleston Workshop,Lindy Hop And/or Jive Workshop,Movement Workshop,Cheerleading Workshop,Bollywood Workshop,Breakdancing Workshop,Zumba Workshop,Mental Health Workshops,Yoga For People With Learning Disabilities,Underwater Photography,Hatha Yoga,Asthana Yoga,Sports Injury Clinic,Injury Rehabilitation,Lactation Consultants,Interpreters Postnatal Depression Services,Walking Therapies,Acupuncturists,Osteopaths,Unconscious Casualty,Birth Trauma Resolution Therapy,Hypnobirthing Courses,Stretch Therapy Class,Spinal Health Class,Postural Correction,Phobia Treatments,Spiritual Response Therapy,Antenatal Education,Childminders & Crèches,Makko-Ho Re-Balancing Stretches,Shiatsu,Medical Acupuncture,Osteopathy / Osteopath / Osteopathic Treatments",
  "Woodland adventure,Urban adventure,Island adventure,Young adventure,Coastal adventure,Adventure playgrounds,Boot Camps",
  "Parent education,Baby Development,Postural Imbalances,ediatric Sleep Support,Children Counselling,Speech & Language Therapy,Baby & Child Nutritional Therapy,Osteopathy For Babies And Children",
  "Local Parks And Playgrounds,Park,Landscaped Gardens,Amusement,Paradise Park Children's Centre,Water Splash Parks,Adventure Playgrounds",
  "Bouncy Castles,Clowns,Pool Party,Disco Party,Skate Party,Pre-schooler Party,Face Painting,Children's Makeup,Kids Bowling Birthday Parties",
  "Cooking Party For Children,Catering For Children’s Parties",
  "Halls for Hire,Venues for Hire,Church Halls",
  "Local parks,Local playgrounds cafes and other facilities,Improve Babies Sleep Patterns",
  "Child Birth,Pre Natal Yoga,Post Natal Yoga,Pregnancy Relaxation,Hypnobirthing,Fertility Reflexology,Pregnancy Pain Relief,Therapy Pregnancy And Childbirth,Aqua bellies,Aqua Natal Yoga,Postnatal Fitness Classes,Antenatal Fitness Classes,Antenatal Classes,Maternity Reflexology,Yoga In Pregnancy,Hypnobirthing,Ante-Natal And Post-Natal Care,Therapy Pregnancy And Childbirth",
  "Bonfire Night,Christmas & New Year,Easter,Father's Day,Halloween",
  "Holiday clubs,Mother's Day,Summer,Valentine's Day",
  "Science Club,Photography Club",
  "Soft Play Centre’s,Children’s Play Area,Playdough,Children's Gym Parties,Messy Play",
  "Mediation,Learning and Development,therapeutic riding ,self defense,Disability Sports,Swimming Lessons With Sign Language,Swimming Lessons For The Deaf,Swimming Lessons For Children With Special Need,Therapeutic Yoga To Children With Learning Disabilities,Therapeutic Yoga To Children With Learning Disabilities",
  "Aerobics,Board Games & Online Games,Recreational And Competitive Classes,Exercise Classes,Boxing,Fencing,Climbing,BMX Club,Cricket Sessions,Cycling Clubs,Trampoline,Dance,Disability Yoga Sessions,Futsal,Soccer,Fishing Clubs,Kung Fu,Semi Contact Sparring,Football Clubs,Gym,Gymnastics,Rhythmic Gymnastics,Indoor Bowls,Snooker,Circuit Training,Private Gyms,Ladies' Gyms,Core Training,Health Clubs,Running Club,Cricket Coaching,Cheerleading,Sports Training & Coaching,Kids Fitness,Personal Trainers,Martial Arts,Preschool Sports,Rugby,Running Clubs,Swimming,Table Tennis,Trampolining,Triathlon Clubs,Walking Clubs,Taekwondo,Kickboxing,Anaerobic Conditioning,Fitness,Mini-Golf,Climbing,Camping,Badminton,Basketball,Diving,Football ,Ice Skating ,Gymnastics,Dodgeball,Rugby Youth,Tennis,Hockey,Cricket,JIU JITSU,BOXING ,KARATE,BALLET,GYMNASTICS,Netball ,Martial Arts,Swimming,Nam Pai Chuan,Krav Maga,Hapkido,Kummooyeh,Gumdo,FILIPINO MARTIAL ARTS,Krav Maga,Tai Chi,Taekwondo,Kung Fu,Jujitsu And Wing Chun,Wooshoo,Shotokan Karate,Kyokushinkai,Goju Ryu,Shinkyu Combat,Shinkyu Karate,Seiki-Juku Karate,JEET KUNE DO,KALI,JUDO,MMA,Nei Chuan,Aikido,Street Combat,Games Retailer Board Games,Collectable Card Games,Non-Collectable Card Games,Indie Games,Roleplaying Games,Historical Wargames,Miniatures,Traditional Games,Tennis Coaching,Semi Contact Sparring,Aerobic And Anaerobic Conditioning,Fitness Instructor,Spinning Classes,Disability Sports,Swimming Lessons For Toddlers,Kayaking for children,Mummy And Me Exercise,Street Dance For Kids,Contemporary Classes For Kids,2 Years And Up Swimming Lessons,Swimming Lessons For Kids,Toys,Board Games,Papo,Magic Tricks,Playing Cards,Mechanical Puzzles,Village Games Stocks Jigsaws,Scrabble And Monopoly,Classic Board games,Traditional Toy Shop,Children's Martial Arts",
  "Hospitals,Scouts,Sports Clubs & Associations,Private Clubs,Health Clubs,Arts Organizations,Environmental Activities,Team Building Games And Activities,Homework & Academics Activity Club For Children Of All Abilities,Children's Charities Disabled Charities",
];
