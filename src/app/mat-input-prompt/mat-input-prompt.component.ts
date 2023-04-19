import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { polCls } from '../quotation/quotation.component';
import { Observable, map, startWith } from 'rxjs';
import { QuotationServiceService } from '../quotation-service.service';
export interface podCls {
  name: string;
  code: string;
}

@Component({
  selector: 'app-mat-input-prompt',
  templateUrl: './mat-input-prompt.component.html',
  styleUrls: ['./mat-input-prompt.component.css']
})

export class MatInputPromptComponent implements OnInit {
  form: FormGroup;
  podArr = new Array<any>();
  officeArray = new Array<any>();
  selectedCountryValue='';


  myControlpod = new FormControl<string | podCls>(''); 
  filteredOptionspod: Observable<podCls[]> | undefined;
  optionpod: any;
  
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
    public dialogRef: MatDialogRef<MatInputPromptComponent> ,public quotService:QuotationServiceService
  ) 
  {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      country: [''],
    });
  }
  ngOnInit(): void {
    this.FillPOD();
    this.filteredOptionspod = this.myControlpod.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.podArr.slice();
      }),
    );


  }
  private _filter(name: string): podCls[] {
    const filterValue = name.toLowerCase();

    return this.podArr.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  
  displayFnPod(user: podCls): string {
    return user && user.name ? user.name : '';
  }
  getPosts(userId: any){
    // alert(userId);
    this.selectedCountryValue= userId.id; 
  }
  search(): void {
       
   this.FillSearch();
   //this.FillPOD();
  }

  public FillPOD() {
    this.quotService.getPOD().subscribe(response => {
    this.podArr = response.results;
    
   });
 }

 public FillSearch() {
  this.quotService.getSearchResult(this.selectedCountryValue).subscribe(response => {
  this.officeArray = response; 
 });
}
  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form,
    });
  } 
  submitSelection(form: any) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form,
    });
  }
}
