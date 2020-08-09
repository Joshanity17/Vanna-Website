import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Video } from 'src/app/shared/model/Video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) { }

  public async getAllVideo(): Promise<Video[]> {
    const serviceURL: string = this.apiURL + 'getAllVideo';

    const videoData: any = await this.http.get(serviceURL).toPromise();
    return videoData.reduce((prev, curr) => {
      prev.push(new Video(curr.id, curr.name, this.apiURL + 'streamVideo?id=' + curr.id));
      return prev;
    }, [])
  }
}
