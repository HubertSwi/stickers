import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { User } from '../../../models/user.model';
import { HttpUsersService } from '../../../services/http/http.users.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-prof-det',
  templateUrl: './prof-det.component.html',
  styleUrls: ['./prof-det.component.css']
})
export class ProfDetComponent implements OnInit {

  private user = new User(0, '', '', '', '', null);

  private fNameMod = false;
  private lNameMod = false;
  private bdMod = false;
  private emailMod = false;

  @ViewChild('firstNameElem') firstNameElem: ElementRef;
  @ViewChild('lastNameElem') lastNameElem: ElementRef;
  @ViewChild('bdYearElem') bdYearElem: ElementRef;
  @ViewChild('bdMonthElem') bdMonthElem: ElementRef;
  @ViewChild('bdDayElem') bdDayElem: ElementRef;
  @ViewChild('emailElem') emailElem: ElementRef;

  wrongFnameFlag = false;
  wrongLnameFlag = false;
  wrongYearFlag = false;
  wrongMonthFlag = false;
  wrongDayFlag = false;
  wrongEmailFlag = false;

  constructor(private httpUsersService: HttpUsersService,
              private authService: AuthService,
              ) { }

  ngOnInit() {
    this.httpUsersService.sendFetchUser().subscribe(
      fetchedUser => {
        this.user = fetchedUser;
      });
  }

  editFnameOnClick(): void {
    this.fNameMod = true;
    this.wrongFnameFlag = false;

    this.cancelLnameOnClick();
    this.cancelBdOnClick();
    this.cancelEmailOnClick();
  }

  saveFnameOnClick(): void {
    const newFname = this.firstNameElem.nativeElement.value;

    if (newFname) {
      this.user.firstName = newFname;
      this.httpUsersService.sendSaveUser(this.user);
      this.fNameMod = false;

    } else {
      this.wrongFnameFlag = true;
    }
  }

  cancelFnameOnClick(): void {
    this.fNameMod = false;
  }

  editLnameOnClick(): void {
    this.lNameMod = true;
    this.wrongLnameFlag = false;

    this.cancelFnameOnClick();
    this.cancelBdOnClick();
    this.cancelEmailOnClick();
  }

  saveLnameOnClick(): void {
    const newLname = this.lastNameElem.nativeElement.value;

    if (newLname) {
      this.user.lastName = newLname;
      this.httpUsersService.sendSaveUser(this.user);
      this.lNameMod = false;

    } else {
      this.wrongLnameFlag = true;
    }
  }

  cancelLnameOnClick(): void {
    this.lNameMod = false;
  }

  editBdOnClick(): void {
    this.bdMod = true;

    this.wrongYearFlag = false;
    this.wrongMonthFlag = false;
    this.wrongDayFlag = false;

    this.cancelFnameOnClick();
    this.cancelLnameOnClick();
    this.cancelEmailOnClick();
  }

  saveBdOnClick(): void {
    const newYear = +this.bdYearElem.nativeElement.value;
    const newMonth = +this.bdMonthElem.nativeElement.value;
    const newDay = +this.bdDayElem.nativeElement.value;
    const newDay_1 = +this.bdDayElem.nativeElement.value + 1;

    this.wrongYearFlag = false;
    this.wrongMonthFlag = false;
    this.wrongDayFlag = false;

    if (newYear > new Date().getFullYear() || newYear < 1850) {
      this.wrongYearFlag = true;
    }
    if (newMonth > 12 || newMonth < 1) {
      this.wrongMonthFlag = true;
    }
    if (newDay > new Date(newYear, newMonth, 0).getDate() || newDay < 1) {
      this.wrongDayFlag = true;
    }

    if (!(this.wrongYearFlag || this.wrongMonthFlag || this.wrongDayFlag)) {
      this.httpUsersService.sendSaveUser(new User(
        this.user.id,
        this.user.uid,
        this.user.firstName,
        this.user.lastName,
        this.user.email,
        new Date(`${newYear}-${newMonth}-${newDay_1}`)));

      this.user.birthDate = new Date(`${newYear}-${newMonth}-${newDay}`);
      this.bdMod = false;
    }
  }

  cancelBdOnClick(): void {
    this.bdMod = false;
  }

  editEmailOnClick(): void {
    this.emailMod = true;
    this.wrongEmailFlag = false;

    this.cancelFnameOnClick();
    this.cancelLnameOnClick();
    this.cancelBdOnClick();
  }

  saveEmailOnClick(): void {
    const newEmail = this.emailElem.nativeElement.value;

    if (newEmail.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')) {
      this.user.email = newEmail;
      this.authService.changeUserEmail(newEmail);
      this.httpUsersService.sendSaveUser(this.user);
      this.emailMod = false;

    } else {
      this.wrongEmailFlag = true;
    }
  }

  cancelEmailOnClick(): void {
    this.emailMod = false;
  }

  getBdYear() {
    return new Date(this.user.birthDate).getFullYear();
  }

  getBdMonth() {
    return new Date(this.user.birthDate).getMonth() + 1;
  }

  getBdDay() {
    return new Date(this.user.birthDate).getDate();
  }
}
