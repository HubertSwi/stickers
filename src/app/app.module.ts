import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from './app.component';
import { ToolBarComponent } from './home/tool-bar/tool-bar.component';
import { ToolsComponent } from './home/tool-bar/tools/tools.component';
import { StickerTableComponent } from './home/sticker-table/sticker-table.component';
import { StickerListComponent } from './home/sticker-table/sticker-list/sticker-list.component';
import { StickerComponent } from './home/sticker-table/sticker-list/sticker/sticker.component';
import { DraggableModule } from './draggable/draggable.module';
import { AddStickerService } from './services/utils/add-sticker.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { UserProfileComponent } from './home/tool-bar/user-profile/user-profile.component';
import { HttpService } from './services/http/http.service';
import { CanDeactivateGuard } from './services/utils/can-deactivate-guard.service';
import { AppConfigModule } from './app-config/app-config.module';
import { SettingsComponent } from './home/settings/settings.component';
import { ProfPicComponent } from './home/settings/prof-pic/prof-pic.component';
import { ProfDetComponent } from './home/settings/prof-det/prof-det.component';
import { environment } from '../environments/environment';
import { LoggedGuard } from './services/auth/logged-guard.service';
import { SessionService } from './services/session/session.service';
import { HttpFirebaseService } from './services/http/http.firebase.service';
import { AvatarService } from './services/firebase/avatar.service';
import { HttpStickersService } from './services/http/http.stickers.service';
import { HttpUsersService } from './services/http/http.users.service';
import { ImagePreloadDirective } from './image-preloader/image-preload.directive';
import { LoadingSpinnerComponent } from './home/loading-spinner/loading-spinner.component';
import { StickersErrorComponent } from './home/stickers-error/stickers-error.component';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaxStickerSnackBarComponent } from './home/tool-bar/tools/max-sticker-snack-bar/max-sticker-snack-bar.component';
import { LoggingService } from './services/utils/logging.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    ToolsComponent,
    StickerTableComponent,
    StickerListComponent,
    StickerComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UserProfileComponent,
    SettingsComponent,
    ProfPicComponent,
    ProfDetComponent,
    ImagePreloadDirective,
    LoadingSpinnerComponent,
    StickersErrorComponent,
    MaxStickerSnackBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DraggableModule,
    AppRoutingModule,
    AppConfigModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ImageCropperModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [
    MaxStickerSnackBarComponent,
  ],
  providers: [
    AddStickerService,
    AuthService,
    SessionService,
    HttpService,
    HttpStickersService,
    HttpUsersService,
    HttpFirebaseService,
    AuthGuard,
    LoggedGuard,
    CanDeactivateGuard,
    AngularFirestore,
    AvatarService,
    LoggingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
