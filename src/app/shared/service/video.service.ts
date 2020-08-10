import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Video } from 'src/app/shared/model/Video.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      const video = new Video(curr.id, curr.name, this.apiURL + 'streamVideo?id=' + curr.id);
      video.viewCount = this.getVideoViewCount(video.id);
      prev.push(video);
      return prev;
    }, [])
  }

  public async viewVideo(id: number): Promise<void> {
    const serviceURL: string = this.apiURL + 'viewVideo';
    const videoData: any = await this.http.put(serviceURL, {
      id: id
    }).toPromise();
    return videoData;
  }

  public getVideoViewCount(id: number): Observable<number> {
    const serviceURL: string = this.apiURL + 'getVideoViewCount';
    return this.http.get(serviceURL, {
      params: {
        id: id.toString()
      }
    }).pipe(map((data) => <number>data['viewCount']));
  }
}
