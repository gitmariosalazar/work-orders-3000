export class WorkerModel{
  private workerId: number
  private identification: string
  private lastNames?: string
  private firstNames?: string
  private phoneNUmber?: string
  private cellPhone?: string
  private email?: string
  private address?: string

  constructor(
    workerId: number,
    identification: string,
    lastNames?: string,
    firstNames?: string,
    phoneNUmber?: string,
    cellPhone?: string,
    email?: string,
    address?: string
  ) {
    this.workerId = workerId
    this.identification = identification
    this.lastNames = lastNames
    this.firstNames = firstNames
    this.phoneNUmber = phoneNUmber
    this.cellPhone = cellPhone
    this.address = address
  }

  public getWorkerId(): number{
    return this.workerId;
  }

  public setWorkerId(workerId: number): void{
    this.workerId=workerId
  }

  public getIdentification(): string{
    return this.identification;
  }

  public setIdentification(identification: string): void{
    this.identification = identification;
  }

  public getLastNames(): string | undefined{
    return this.lastNames;
  }

  public setLastNames(lastNames: string): void{
    this.lastNames = lastNames;
  }

  public getFirstNames(): string | undefined{
    return this.firstNames;
  }

  public setFirstNames(firstNames: string): void{
    this.firstNames = firstNames;
  }

  public getPhoneNumber(): string | undefined{
    return this.phoneNUmber
  }

  public setPhoneNumber(phoneNUmber: string): void{
    this.phoneNUmber = phoneNUmber;
  }

  public getCellPhone(): string | undefined{
    return this.cellPhone;
  }

  public getEmail(): string|undefined{
    return this.email
  }

  public setEmail(email: string): void{
    this.email = email;
  }

  public getAddress(): string | undefined{
    return this.address;
  }

  public setAddress(address: string): void{
    this.address = address;
  }
}