import { Component, OnInit } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';

import { AvatarService } from '../../../services/firebase/avatar.service';

@Component({
  selector: 'app-prof-pic',
  templateUrl: './prof-pic.component.html',
  styleUrls: ['./prof-pic.component.css']
})
export class ProfPicComponent implements OnInit {

  avatarImg = '';

  isLoadingAvatar: boolean;

  private imageChangedEvent: any = '';
  public croppedImage256: Blob;
  public croppedImage64: Blob;


  constructor(private avatarService: AvatarService) { }

  ngOnInit() {
    this.avatarImg = this.avatarService.getAvatarPath_256();

    this.avatarService.avatarImg256Sub.asObservable().subscribe(
      val => {
        this.avatarImg = val;
      }
    );
  }

  onUploadAvatarImg(event: any) {
    if (event.target.files.length === 1) {
      this.imageChangedEvent = event;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage256 = event.file;
    this.croppedImage64 = event.file;
  }
}
