import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Video } from 'src/app/shared/model/Video.model';
import { Observable } from 'rxjs';
import { VideoService } from 'src/app/shared/service/video.service';

@Injectable({ providedIn: 'root' })
export class VideoResolver implements Resolve<Video[]> {
    constructor(private videoService: VideoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.videoService.getAllVideo();
    }
}