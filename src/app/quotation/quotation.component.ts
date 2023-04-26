import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { QuotationServiceService } from '../quotation-service.service';
import { Observable, map, startWith } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddPortsComponent } from '../add-ports/add-ports.component';
import { MatInputPromptComponent } from '../mat-input-prompt/mat-input-prompt.component';
import { PostQuotation, lineInfo } from '../model/quotation';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats, NativeDateAdapter} from '@angular/material/core';



export interface LineCls {
  name: string;
  code: string;
  id: number
}
export interface polCls {
  name: string;
  code: string;
  id: number
}
export interface podCls {
  name: string;
  code: string;
  id: number
}



@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css'],
  
})

export class QuotationComponent  implements OnInit {
  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger | undefined;

   linearr = new Array<any>();
   polArr = new Array<any>(); 
   TpolArr = new Array<any>(); 
   TpodArr = new Array<any>(); 
   CurrArr = new Array<any>();
   CargoArr = new Array<any>();
   StuffingArr = new Array<any>();
   DestuffingArr = new Array<any>();
   PartyArr = new Array<any>();
   ContainerArr = new Array<any>();
   Quoteno = [''];
   referenceNo ='';
   podPortID ='';
   podSelectedPort ='';
  firstFormGroup = this._formBuilder.group({
    lblQuotationNo: [ ''],
    line: [''],
    polagent: [''],
    podagent: [''],
    party: [''],
   
  });
  addQuote: PostQuotation ={
    ref_number: 0,
    valid_from: '',
    valid_to: '',
    line: 0,
    pol_office: 0,
    pod_office: 0,
    party: 0,
    currency: 0,
    licd: 0,
    licd_pol_trans_mode: 0,
    pol: 0,
    pod: 0,
    dicd_pod_trans_mode: 0,
    dicd: 0,
    cargo_type: 0,
    cargo_sub_type: 0,
    un_no: 0,
    stuffing: 0,
    de_stuffing: 0
  }
  // control = new FormControl('polagent');

myControl = new FormControl<string | LineCls>('');
myControlpol = new FormControl<string | polCls>(''); 
myControlTpol = new FormControl<string | polCls>(''); 
myControlTpod = new FormControl<string | polCls>(''); 
filteredOptions: Observable<LineCls[]> | undefined;
filteredOptionspol: Observable<polCls[]> | undefined;

filteredOptionsTpol: Observable<polCls[]> | undefined;

filteredOptionsTpod: Observable<podCls[]> | undefined;


// myControlpol = new FormControl<string | LineCls>('');

QuotationNo: any;
  dataFromDialog: any;
  title = 'matDialog';
  lineSelected: any;
  line=0;
  selectedDate = new FormControl();

ngOnInit(): void {
    this.FillLine();
    this.FillQuotNo();
    this.FillPOL();
    this.FillCurrency();
    this.FillCargoType();
    this.FillStuffing();
    this.FillDestuffing();
    this.FillParty();
    this.FillPort();
    this.FillContainerType();
 

  }

  displayFn(user: LineCls): string {
    
    return user && user.code ? user.code : '';
  }

  displayFnPol(user: polCls): string {
    return user && user.code ? user.code : '';
  }

  private _filter(name: string): LineCls[] {
    const filterValue = name.toLowerCase();

    return this.linearr.filter(option => option.code.toLowerCase().includes(filterValue));
  }

  private _filterpol(name: string): polCls[] {
    const filterValuepol = name.toLowerCase();

    return this.polArr.filter(option => option.code.toLowerCase().includes(filterValuepol));
  }
  private _filterTpol(name: string): polCls[] {
    const filterValuepol = name.toLowerCase();

    return this.TpolArr.filter(option => option.code.toLowerCase().includes(filterValuepol));
  }
  private _filterTpod(name: string): podCls[] {
    const filterValueTpod = name.toLowerCase();

    return this.TpodArr.filter(option => option.code.toLowerCase().includes(filterValueTpod));
  }

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(private _formBuilder: FormBuilder,public quotService:QuotationServiceService, public dialog: MatDialog) {
    

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value1 => {
        const name1 = typeof value1 === 'string' ? value1 : value1?.code;
        return name1 ? this._filter(name1 as string) : this.linearr.slice();
      }),
    );

    this.filteredOptionspol = this.myControlpol.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.code;
        return name ? this._filterpol(name as string) : this.polArr.slice();
      }),
    );

    this.filteredOptionsTpol = this.myControlTpol.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.code;
        return name ? this._filterTpol(name as string) : this.TpolArr.slice();
      }),
    );

    this.filteredOptionsTpod = this.myControlTpod.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.code;
        return name ? this._filterTpod(name as string) : this.TpodArr.slice();
      }),
    );

  }
  default: string = '';

  showPrompt(): void {
    const dialogRef = this.dialog.open(MatInputPromptComponent, {
      width: '800px',
      height: '500px',
    });
   
    dialogRef.afterClosed().subscribe((data) => {
      this.dataFromDialog = data.form;
      if (data.clicked === 'submit') {
          this.podSelectedPort=data.form.officeName;
          this.podSelectedPort = this.podSelectedPort + '- ' +data.form.officeCode
          this.podPortID=data.form.officeId;
          this.addQuote.pod_office = data.form.officeId;
        console.log('Sumbit button clicked');
        this.FillParty();
      }
    });
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.addQuote.line=event.option.value.id;
}
onSelectionChangedpol(event: MatAutocompleteSelectedEvent) {
  console.log(event.option.value);
  this.addQuote.pol_office=event.option.value.id;
}

onSelectionChangedTPol(event: MatAutocompleteSelectedEvent) {
  console.log(event.option.value);
  this.addQuote.pol=event.option.value.id;
}
onSelectionChangedTPod(event: MatAutocompleteSelectedEvent) {
  console.log(event.option.value);
  this.addQuote.pod=event.option.value.id;
}

selectedParty(event: any) {
  this.addQuote.party=event;
}
  
selectedCurrency(event: any) {
  this.addQuote.currency=event;
}
  
selectedCargoType(event: any) {
  this.addQuote.cargo_type=event;
}
selectedStuffingType(event: any) {
  this.addQuote.stuffing=event;
}

selectedDeStuffingType(event: any) {
  this.addQuote.de_stuffing=event;
}

fromDateChange(event: any) {
  var date = new Date(event.value);
  if (!isNaN(date.getTime())) {
         this.addQuote.valid_from= date.getFullYear() + '-' +(("0" + (date.getMonth() + 1)).slice(-2)) + '-' + (("0" + (date.getDate())).slice(-2))  ;
     }
}
toDateChange(event: any) {
  var date = new Date(event.value);
    if (!isNaN(date.getTime())) {
        this.addQuote.valid_to= date.getFullYear() + '-' +(("0" + (date.getMonth() + 1)).slice(-2)) + '-' + (("0" + (date.getDate())).slice(-2))  ;
    }
}

//Second form events

selectedContainerType(event: any) {
  //this.addQuote.de_stuffing=event;
}


  //Fill functions FORM1
  public FillQuotNo() {
    this.quotService.getQuotNo().subscribe(response => {
      this.referenceNo= response.referenceNumber;
    this.addQuote.ref_number= response.referenceNumber;
   });
 }
  public FillLine() {
     this.quotService.getLine().subscribe(response => {
     this.linearr = response.results;
     
    });
  }
  public FillPOL() {
    this.quotService.getPOL().subscribe(response => {
    this.polArr = response.results;
    // this.TpolArr = this.polArr
    // this.TpodArr = this.polArr
   });
 }

 public FillPort() {
  this.quotService.getPOD().subscribe(response => {
  this.TpolArr = response.results;
  this.TpodArr = this.TpolArr
 });
}

  public FillCurrency() {
    this.quotService.getCurrency().subscribe(response => {
    this.CurrArr = response.results;
    
   });
 }
 public FillCargoType() {
  this.quotService.getCargoType().subscribe(response => {
  this.CargoArr = response.results;
  
 });
}
public FillStuffing() {
  this.quotService.getStuffing().subscribe(response => {
  this.StuffingArr = response.results;
  
 });
}

public FillDestuffing() {
  this.quotService.getStuffing().subscribe(response => {
  this.DestuffingArr = response.results;
  
 });
}

public FillParty() {
  this.quotService.getParty(this.addQuote.pol_office).subscribe(response => {
  this.PartyArr = response.results;
  
 });
}
//Second Group

public FillContainerType() {
  this.quotService.ContainerType().subscribe(response => {
  this.ContainerArr = response.results;
  
 });
}

createQuote(): void {

// const test =  this.firstFormGroup.controls['line'].value;

  const data = {
    ref_number: this.addQuote.ref_number,
    valid_from: this.addQuote.valid_from,//"2023-05-10",//this.addQuote.valid_from,
    valid_to: this.addQuote.valid_to,//"2023-05-11",//this.addQuote.valid_to,
    line:this.addQuote.line,
    pol_office: this.addQuote.pol_office,
    pod_office: this.addQuote.pod_office,
    party: this.addQuote.party,
    currency: this.addQuote.currency,
    licd: null,//this.addQuote.licd,
    licd_pol_trans_mode: null,// this.addQuote.licd_pol_trans_mode,
    pol: this.addQuote.pol, 
    pod: this.addQuote.pod,
    dicd_pod_trans_mode: null,//this.addQuote.dicd_pod_trans_mode,
    dicd: null,//this.addQuote.dicd,
    cargo_type: this.addQuote.cargo_type,
    cargo_sub_type: null,// this.addQuote.cargo_sub_type,
    un_no: null,//this.addQuote.un_no,
    stuffing: this.addQuote.stuffing,
    de_stuffing: this.addQuote.de_stuffing


  };
  console.log(data);
this.quotService.createQuotation(data)
  .subscribe(
    response => {
      console.log(response);
      alert(response.message)
    },
    error => {
      console.log(error);
      alert(error["error"].toString())
    });
}



}


export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};