import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { QuotationServiceService } from '../quotation-service.service';
import { Observable, map, startWith } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddPortsComponent } from '../add-ports/add-ports.component';
import { MatInputPromptComponent } from '../mat-input-prompt/mat-input-prompt.component';
import { PostQuotation } from '../model/quotation';

export interface LineCls {
  name: string;
  code: string;
}
export interface polCls {
  name: string;
  code: string;
}
@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})

export class QuotationComponent  implements OnInit {

   linearr = new Array<any>();
   polArr = new Array<any>(); 
   CurrArr = new Array<any>();
   CargoArr = new Array<any>();
   StuffingArr = new Array<any>();
   DestuffingArr = new Array<any>();
   PartyArr = new Array<any>();
   Quoteno = [''];
   referenceNo ='';
   podPortID ='';
   podSelectedPort ='';
  firstFormGroup = this._formBuilder.group({
    lblQuotationNo: [ '', Validators.required],
    line: ['', Validators.required],
    polagent: ['', Validators.required],
    podagent: ['', Validators.required],
    party: ['', Validators.required],
   
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
filteredOptions: Observable<LineCls[]> | undefined;
filteredOptionspol: Observable<polCls[]> | undefined;


// myControlpol = new FormControl<string | LineCls>('');

QuotationNo: any;
  dataFromDialog: any;
  title = 'matDialog';

ngOnInit(): void {
    this.FillLine();
    this.FillQuotNo();
    this.FillPOL();
    this.FillCurrency();
    this.FillCargoType();
    this.FillStuffing();
    this.FillDestuffing();
    this.FillParty();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.linearr.slice();
      }),
    );

    this.filteredOptionspol = this.myControlpol.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterpol(name as string) : this.polArr.slice();
      }),
    );

  }

  displayFn(user: LineCls): string {
    return user && user.name ? user.name : '';
  }

  displayFnPol(user: polCls): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): LineCls[] {
    const filterValue = name.toLowerCase();

    return this.linearr.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterpol(name: string): polCls[] {
    const filterValuepol = name.toLowerCase();

    return this.polArr.filter(option => option.name.toLowerCase().includes(filterValuepol));
  }

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(private _formBuilder: FormBuilder,public quotService:QuotationServiceService, public dialog: MatDialog) {
    
  }

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
          this.podPortID=data.officeid;
        console.log('Sumbit button clicked');
      }
    });
  }



  
  //Fill functions FORM1
  public FillQuotNo() {
    this.quotService.getQuotNo().subscribe(response => {
      this.referenceNo= response.referenceNumber;
   
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
  this.quotService.getParty().subscribe(response => {
  this.PartyArr = response.results;
  
 });
}

createQuote(): void {
  const data = {
    ref_number: this.addQuote.ref_number,
    valid_from: this.addQuote.valid_from,
    valid_to: this.addQuote.valid_to,
    line: this.addQuote.line,
    pol_office: this.addQuote.pol_office,
    pod_office: this.addQuote.pod_office,
    party: this.addQuote.party,
    currency: this.addQuote.currency,
    licd: this.addQuote.licd,
    licd_pol_trans_mode: this.addQuote.licd_pol_trans_mode,
    pol: this.addQuote.pol,
    pod: this.addQuote.pod,
    dicd_pod_trans_mode: this.addQuote.dicd_pod_trans_mode,
    dicd: this.addQuote.dicd,
    cargo_type: this.addQuote.cargo_type,
    cargo_sub_type: this.addQuote.cargo_sub_type,
    un_no: this.addQuote.un_no,
    stuffing: this.addQuote.stuffing,
    de_stuffing: this.addQuote.de_stuffing,


  };
}

}
