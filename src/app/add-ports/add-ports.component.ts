import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PostPort } from '../model/ports';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-ports',
  templateUrl: './add-ports.component.html',
  styleUrls: ['./add-ports.component.css']
})
export class AddPortsComponent implements OnInit{

  secters = new Array<any>();
  contryarr = new Array<any>();
  statearr = new Array<any>();
  portarr = new Array<any>();
  submitted = false
  selectedSectorValue : number = 0;
  selectedCountryValue : string='';
  selectedPortValue : String = '';
  postPort: PostPort = {
    name: '',
    code: '',
    description: '',
    portType: this.selectedPortValue,
    latitude: '',
    longitude: '',
    countryId: '',
    stateId: '',
    cityId: '',
    pincode: '',
    sector: this.selectedSectorValue,
    localIgmRequired: false,
    transhipmentIgmRequired: false,
    localEgmRequired: false,
    countryName: '',
    countryCode: '',
    stateName: '',
    stateCode: '',
    cityName: '',
    cityCode: '',
    sectorName: '',
    sectorCode: '',
    currencyId: '',
    currencyCode: '',
    primaryOfficeId: '',
    isoLocode: ''
  };
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getSector().subscribe(response => {
        this.secters = response.results;
    });
    this.userService.getCountry().subscribe(response => {
      this.contryarr = response.results;
    });
    this.FillPort();
  }

  public FillState() {
    this.userService.getState(this.selectedCountryValue).subscribe(response => {
      this.statearr = response.results;
     });
  }
  public FillPort() {
    this.userService.getPort().subscribe(response => {
      this.portarr = response.results;
    });
  }
 
  createPort(): void {
    const data = {
      name: this.postPort.name,
      code: this.postPort.code,
      description: this.postPort.description,
      portType: this.selectedPortValue,
      country:  this.postPort.countryId,
      stateId:  this.postPort.stateId,
      cityId:  this.postPort.cityId,
      pincode:  this.postPort.pincode,
      sector:  this.selectedSectorValue
    };

    this.userService.createPort(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
}
