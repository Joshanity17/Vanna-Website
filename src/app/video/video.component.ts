import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VideoService } from 'src/app/shared/service/video.service';
import { Video } from '../shared/model/Video.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { faEye, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit {

  public videoSource: Video[] = [];
  public swiperConfig: SwiperConfigInterface = {
    direction: 'vertical',
    slidesPerView: 1,
    navigation: false
  };
  public swiperIndex: number = 0;
  public faEye: IconDefinition = faEye;
  constructor(private videoService: VideoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.videoSource = this.route.snapshot.data.video;
  }

  ngAfterViewInit() {
    this.activeVideo(this.swiperIndex);
  }

  swiperSlideChange(data) {
    const video: Video = this.videoSource[data.previousIndex];
    const videoPlayer: any = video.getVideoPlayer();
    if (!videoPlayer.paused) {
      console.log(videoPlayer.currentTime);
      videoPlayer.pause();
    }
    if (video.hasBeenViewed) {
      this.videoService.logViewStatistic(
        video.id,
        (video.hasBeenEnded) ? videoPlayer.duration : videoPlayer.currentTime,
        !!video.hasBeenEnded
      );
    }
  }

  activeVideo(index: number) {
    const video: Video = this.videoSource[index];
    const videoPlayer: any = video.getVideoPlayer();

    if (!videoPlayer.onended) video.applyVideoEndedListener();

    video.hasBeenLoaded = true;
    videoPlayer.currentTime = 0;
    videoPlayer.play();
    video.viewCount = this.videoService.getVideoViewCount(video.id);

    if (!video.hasBeenViewed && !videoPlayer.paused) {
      video.hasBeenViewed = true;
      this.videoService.viewVideo(video.id);
    }
  }

}
