import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contry, Ports, Sector, State } from './model/ports';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  
//Http Client get method
public getUsers(): Observable<any> {
  const url = 'http://134.209.158.76:9010/core/base/v1/stuffing-types/';
  const username='admin';
  const password ='int123'
  const headers = new HttpHeaders(
      {
        Authorization: 'Basic ' + btoa(username +':'+password)
      });
  return this.http.get<any>(url, {headers}); 
  }

  public getSector(): Observable<Sector> {
    const url = 'http://134.209.158.76:9010/core/base/v1/sectors/';
    const username='admin';
    const password ='int123'
    const headers = new HttpHeaders(
        {
          Authorization: 'Basic ' + btoa(username +':'+password)
        });
    return this.http.get<Sector>(url, {headers}); 
    }

  public getCountry(): Observable<Contry> {
      const url = 'http://134.209.158.76:9010/core/base/v1/countries/';
      const username='admin';
      const password ='int123'
      const headers = new HttpHeaders(
          {
            Authorization: 'Basic ' + btoa(username +':'+password)
          });
      return this.http.get<Contry>(url, {headers}); 
      }

   public getPort(): Observable<Ports> {
        const url = 'http://134.209.158.76:9010/core/base/v1/ports/';
        const username='admin';
        const password ='int123'
        const headers = new HttpHeaders(
            {
              Authorization: 'Basic ' + btoa(username +':'+password)
            });
        return this.http.get<Ports>(url, {headers}); 
        }

  public getState(countryId: string | undefined): Observable<State> {
        const url = 'http://134.209.158.76:9010/core/base/v1/states/?country='+countryId;
        const username='admin';
        const password ='int123'
        const headers = new HttpHeaders(
            {
              Authorization: 'Basic ' + btoa(username +':'+password)
            });
        return this.http.get<State>(url, {headers}); 
        }

create(data: any): Observable<any> {
  const urlpost = 'http://134.209.158.76:9010/core/base/v1/stuffing-types/';
  const usernamePost='admin';
  const passwordPost ='int123'
  // const headersPost = new HttpHeaders(
  //   {
  //     Authorization: 'Basic ' + btoa(usernamePost +':'+passwordPost)
  //   });
 
    // let httpHeaders= new HttpHeaders();
    // httpHeaders.append("Authorization", "Basic " + btoa("admin:int123"));
    
    // const httpOptions = {
    //    httpHeaders
    // };

    // const basicAuth = 'admin' + ':' + 'int123';
    // let Headers = new HttpHeaders();
    // Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));
  
    const headers = new HttpHeaders(
      {
        Authorization: 'Basic ' + btoa(usernamePost +':'+passwordPost)
      });
    //return this.http.post(urlpost, data, {headers});
    //return this.http.post(urlpost, { headers: Headers }, data);
    // const basicAuth = 'admin' + ':' + 'int123';
    // let Headers = new HttpHeaders();
    // Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));
     return this.http.post(urlpost, data, { headers: headers })
  }

  createPort(data: any): Observable<any> {
    const urlpost = 'http://134.209.158.76:9010/core/base/v1/ports/';
    const usernamePost='admin';
    const passwordPost ='int123'
    // const headersPost = new HttpHeaders(
    //   {
    //     Authorization: 'Basic ' + btoa(usernamePost +':'+passwordPost)
    //   });
   
      // let httpHeaders= new HttpHeaders();
      // httpHeaders.append("Authorization", "Basic " + btoa("admin:int123"));
      
      // const httpOptions = {
      //    httpHeaders
      // };
  
      // const basicAuth = 'admin' + ':' + 'int123';
      // let Headers = new HttpHeaders();
      // Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));
    
      const headers = new HttpHeaders(
        {
          Authorization: 'Basic ' + btoa(usernamePost +':'+passwordPost)
        });
      //return this.http.post(urlpost, data, {headers});
      //return this.http.post(urlpost, { headers: Headers }, data);
      // const basicAuth = 'admin' + ':' + 'int123';
      // let Headers = new HttpHeaders();
      // Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));
       return this.http.post(urlpost, data, { headers: headers })
    }
  }
