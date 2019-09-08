import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AvatarService } from '../../services/firebase/avatar.service';
import { ProfPicComponent } from './prof-pic/prof-pic.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  @ViewChild(ProfPicComponent) profPicComponent;

  constructor(private router: Router,
              private avatarService: AvatarService) { }

  onSettingsSave() {
    this.avatarService.uploadAvatar(this.profPicComponent.croppedImage256, this.profPicComponent.croppedImage64);
    this.router.navigate(['/']);
  }

  onSettingsBack() {
    this.profPicComponent.croppedImage256 = null;
    this.profPicComponent.croppedImage64 = null;
    this.router.navigate(['/']);
  }
}
