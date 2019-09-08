import { Component, HostListener, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth/auth.service';
import { AvatarService } from '../../../services/firebase/avatar.service';
import {error} from 'util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isUserMenuShown = false;
  isImgLoaded = false;

  avatarImg = '';

  constructor(private authService: AuthService,
              private avatarService: AvatarService) { }

  ngOnInit() {
    this.avatarService.avatarImg64Sub.asObservable().subscribe(
      (avatarPath: string) => {
        this.avatarImg = avatarPath;
      }
    );

    this.avatarImg = this.avatarService.getAvatarPath_64();

    setTimeout(() => {
      this.isImgLoaded = true;
    }, 100);
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if (event.srcElement.id === 'user-avatar') {
      this.isUserMenuShown = !this.isUserMenuShown;

    } else {
      this.isUserMenuShown = false;
    }
  }

  onClickLogout() {
    this.isUserMenuShown = false;
    this.authService.logoutUser();
  }
}
