import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { VideoResolver } from 'src/app/shared/resolver/Video.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VideoComponent,
    resolve: {
      video: VideoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
