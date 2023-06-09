import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationServiceService {

constructor(private http: HttpClient) {}
   
//Http Client get method
public getLine(): Observable<any> {
  // this.url = this.url+'lines/';
  const url = 'http://134.209.158.76:9010/core/base/v1/lines/';
  const username='admin';
  const password ='int123'
  const headers = new HttpHeaders(
      {
        Authorization: 'Basic ' + btoa(username +':'+password)
      });
  return this.http.get<any>(url, {headers}); 
  }
  public getQuotNo(): Observable<any> {
    // this.url = this.url+'lines/';
    const url = 'http://134.209.158.76:9010/exim/quotations/v1/get-reference-number/';
    const username='admin';
    const password ='int123'
    const headers = new HttpHeaders(
        {
          Authorization: 'Basic ' + btoa(username +':'+password)
        });
    return this.http.get<any>(url, {headers}); 
    }
  public getPOL(): Observable<any> {
      // this.url = this.url+'lines/';
      const url = 'http://134.209.158.76:9010/core/base/v1/offices/?code=&isIcd=false&statusSet=APPR,KYCP';
      const username='admin';
      const password ='int123'
      const headers = new HttpHeaders(
          {
            Authorization: 'Basic ' + btoa(username +':'+password)
          });
      return this.http.get<any>(url, {headers}); 
      }
  public getPOD(): Observable<any> {
      // this.url = this.url+'lines/';
      const url = 'http://134.209.158.76:9010/core/base/v1/ports/';
      const username='admin';
      const password ='int123'
      const headers = new HttpHeaders(
          {
            Authorization: 'Basic ' + btoa(username +':'+password)
          });
      return this.http.get<any>(url, {headers}); 
      }

    public getSearchResult(portid: string | undefined): Observable<any> {
        const url = 'http://134.209.158.76:9010/exim/quotations/v1/office-port-currency-mappings/?portId='+portid+'&statusSet=APPR,KYCP,PENA';
        const username='admin';
        const password ='int123'
        const headers = new HttpHeaders(
            {
              Authorization: 'Basic ' + btoa(username +':'+password)
            });
        return this.http.get<any>(url, {headers}); 
        }
        public getCurrency(): Observable<any> {
        const url = 'http://134.209.158.76:9010/core/base/v1/currencies/';
        const username='admin';
        const password ='int123'
        const headers = new HttpHeaders(
            {
              Authorization: 'Basic ' + btoa(username +':'+password)
            });
        return this.http.get<any>(url, {headers}); 
        }
    
        public getCargoType(): Observable<any> {
          const url = 'http://134.209.158.76:9010/core/base/v1/cargo-types/';
          const username='admin';
          const password ='int123'
          const headers = new HttpHeaders(
              {
                Authorization: 'Basic ' + btoa(username +':'+password)
              });
          return this.http.get<any>(url, {headers}); 
          }

          public getStuffing(): Observable<any> {
            const url = 'http://134.209.158.76:9010/core/base/v1/stuffing-types/';
            const username='admin';
            const password ='int123'
            const headers = new HttpHeaders(
                {
                  Authorization: 'Basic ' + btoa(username +':'+password)
                });
            return this.http.get<any>(url, {headers}); 
            }
            public getParty(): Observable<any> {
              const url = 'http://134.209.158.76:9010/core/base/v1/party-office-mappings/?office=1&partyStatusSet=APPR,KYCP,PENA';
              const username='admin';
              const password ='int123'
              const headers = new HttpHeaders(
                  {
                    Authorization: 'Basic ' + btoa(username +':'+password)
                  });
              return this.http.get<any>(url, {headers}); 
              }
}
