import { InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  toolbar: {
    width: number,
  };
  sticker: {
    width: number,
    height: number,
  };
}

export const APP_DI_CONFIG: AppConfig = {
  toolbar: {
    width: 70,
  },
  sticker: {
    width: 200,
    height: 300,
  }
};

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }
