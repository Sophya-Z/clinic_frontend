export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponce {
    surname: string,
    user_name: string,
    patronymic?: string,
    birthday: Date,
    passportSeries: number,
    passportNumber: number,
    passportBeenUsed: string,
    departmentCode: number,
    dateIssue: Date,
    snils: string,
    inn: number,
    residentialAddress?: string,
    phoneNumber: string,
}