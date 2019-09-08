export class User {
  constructor (
    public id: number,
    public uid: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public birthDate: Date,
  ) {}
}
