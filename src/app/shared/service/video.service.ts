import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) { }

  public async getAllVideo(): Promise<number[]> {
    const serviceURL: string = this.apiURL + 'getAllVideo';
    const result = this.http.get(serviceURL).toPromise();
    return <number[]><unknown>result;
  }
}
