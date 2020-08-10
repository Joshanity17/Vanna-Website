import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/shared/service/video.service';
import { Video } from '../shared/model/Video.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public videoSource: Video[] = [];
  public swiperConfig: SwiperConfigInterface = {
    direction: 'vertical',
    slidesPerView: 1,
    navigation: false
  };
  public swiperIndex: number = 0;
  constructor(private videoService: VideoService) { }

  async ngOnInit() {
    this.videoSource = await this.videoService.getAllVideo();
  }

  swiperSlideChange(data) {
    const videoPlayer: any = this.videoSource[data.previousIndex].getVideoPlayer();
    videoPlayer.pause();
  }

  activeVideo(index: number) {
    const videoPlayer: any = this.videoSource[index].getVideoPlayer();
    this.videoSource[index].hasBeenLoaded = true;
    videoPlayer.currentTime = 0;
    videoPlayer.play();
  }

}
