import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerCreate: build.mutation<
      UsersControllerCreateApiResponse,
      UsersControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/users`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    usersControllerGetAll: build.query<
      UsersControllerGetAllApiResponse,
      UsersControllerGetAllApiArg
    >({
      query: () => ({ url: `/users` }),
    }),
    doctorsControllerCreate: build.mutation<
      DoctorsControllerCreateApiResponse,
      DoctorsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/doctors`,
        method: "POST",
        body: queryArg.createDoctorDto,
      }),
    }),
    doctorsControllerGetAll: build.query<
      DoctorsControllerGetAllApiResponse,
      DoctorsControllerGetAllApiArg
    >({
      query: () => ({ url: `/doctors` }),
    }),
    doctorsControllerGetById: build.query<
      DoctorsControllerGetByIdApiResponse,
      DoctorsControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/doctors/${queryArg.id}` }),
    }),
    doctorsControllerAddTimeSlots: build.mutation<
      DoctorsControllerAddTimeSlotsApiResponse,
      DoctorsControllerAddTimeSlotsApiArg
    >({
      query: (queryArg) => ({
        url: `/doctors/add-time-slots`,
        method: "POST",
        body: queryArg.addTimeSlotsDto,
      }),
    }),
    doctorsControllerGetAvailableDates: build.query<
      DoctorsControllerGetAvailableDatesApiResponse,
      DoctorsControllerGetAvailableDatesApiArg
    >({
      query: (queryArg) => ({
        url: `/doctors/${queryArg.id}/avaliable-dates`,
        params: { startDate: queryArg.startDate, endDate: queryArg.endDate },
      }),
    }),
    appointmentsControllerCreate: build.mutation<
      AppointmentsControllerCreateApiResponse,
      AppointmentsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/appointments`,
        method: "POST",
        body: queryArg.createAppointmentDto,
      }),
    }),
    appointmentsControllerGetAll: build.query<
      AppointmentsControllerGetAllApiResponse,
      AppointmentsControllerGetAllApiArg
    >({
      query: () => ({ url: `/appointments` }),
    }),
    authControllerSignIn: build.mutation<
      AuthControllerSignInApiResponse,
      AuthControllerSignInApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.signInDto,
      }),
    }),
    authControllerGetProfile: build.query<
      AuthControllerGetProfileApiResponse,
      AuthControllerGetProfileApiArg
    >({
      query: () => ({ url: `/auth/profile` }),
    }),
    adminsControllerCreate: build.mutation<
      AdminsControllerCreateApiResponse,
      AdminsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/admins`,
        method: "POST",
        body: queryArg.createAdminDto,
      }),
    }),
    adminsControllerGetAll: build.query<
      AdminsControllerGetAllApiResponse,
      AdminsControllerGetAllApiArg
    >({
      query: () => ({ url: `/admins` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as doctorApi };
export type UsersControllerCreateApiResponse = /** status 200  */ User;
export type UsersControllerCreateApiArg = {
  createUserDto: CreateUserDto;
};
export type UsersControllerGetAllApiResponse = /** status 200  */ User[];
export type UsersControllerGetAllApiArg = void;
export type DoctorsControllerCreateApiResponse = /** status 200  */ Doctor;
export type DoctorsControllerCreateApiArg = {
  createDoctorDto: CreateDoctorDto;
};
export type DoctorsControllerGetAllApiResponse = /** status 200  */ Doctor[];
export type DoctorsControllerGetAllApiArg = void;
export type DoctorsControllerGetByIdApiResponse = /** status 200  */ Doctor;
export type DoctorsControllerGetByIdApiArg = {
  id: number;
};
export type DoctorsControllerAddTimeSlotsApiResponse =
  /** status 200  */ Doctor[];
export type DoctorsControllerAddTimeSlotsApiArg = {
  addTimeSlotsDto: AddTimeSlotsDto;
};
export type DoctorsControllerGetAvailableDatesApiResponse =
  /** status 200  */ Doctor[];
export type DoctorsControllerGetAvailableDatesApiArg = {
  id: number;
  startDate: string;
  endDate: string;
};
export type AppointmentsControllerCreateApiResponse =
  /** status 200  */ Appointment;
export type AppointmentsControllerCreateApiArg = {
  createAppointmentDto: CreateAppointmentDto;
};
export type AppointmentsControllerGetAllApiResponse =
  /** status 200  */ Appointment;
export type AppointmentsControllerGetAllApiArg = void;
export type AuthControllerSignInApiResponse = unknown;
export type AuthControllerSignInApiArg = {
  signInDto: SignInDto;
};
export type AuthControllerGetProfileApiResponse = /** status 200  */ User;
export type AuthControllerGetProfileApiArg = void;
export type AdminsControllerCreateApiResponse = /** status 200  */ Admin;
export type AdminsControllerCreateApiArg = {
  createAdminDto: CreateAdminDto;
};
export type AdminsControllerGetAllApiResponse = /** status 200  */ Admin[];
export type AdminsControllerGetAllApiArg = void;
export type User = {
  /** id */
  id: number;
  /** Фамилия */
  surname: string;
  /** Имя */
  name: string;
  /** Отчество */
  patronymic: string;
  /** Дата рождения */
  birthday: string;
  /** Серия паспорта */
  passportSeries: number;
  /** Номер паспорта */
  passportNumber: number;
  /** Паспорт выдан */
  passportBeenUsed: string;
  /** Код организации */
  departmentCode: number;
  /** Дата выдачи */
  dateIssue: string;
  /** СНИЛС */
  snils: string;
  /** ИНН */
  inn: number;
  /** Адрес проживания */
  residentialAddress: string;
  /** Номер телефона */
  phoneNumber: string;
};
export type CreateUserDto = {
  /** Фамилия */
  surname: string;
  /** Имя */
  name: string;
  /** Отчество */
  patronymic: string;
  /** Дата рождения */
  birthday: string;
  /** Серия паспорта */
  passportSeries: number;
  /** Номер паспорта */
  passportNumber: number;
  /** Паспорт выдан */
  passportBeenUsed: string;
  /** Код организации */
  departmentCode: number;
  /** Дата выдачи */
  dateIssue: string;
  /** СНИЛС */
  snils: string;
  /** ИНН */
  inn: number;
  /** Адрес проживания */
  residentialAddress: string;
  /** Номер телефона */
  phoneNumber: string;
  /** Адрес электронной почты */
  email: string;
  /** Пароль */
  password: string;
};
export type Doctor = {
  /** id */
  id: number;
  /** Фамилия */
  surname: string;
  /** Имя */
  name: string;
  /** Отчество */
  patronymic: string;
  /** Дата рождения */
  birthday: string;
  /** Описание */
  description: string;
  /** Номер телефона */
  phone: string;
  /** График */
  timeSlots: string[];
};
export type CreateDoctorDto = {
  /** Фамилия */
  surname: string;
  /** Имя */
  name: string;
  /** Отчество */
  patronymic: string;
  /** Дата рождения */
  birthday: string;
  /** Описание */
  description: string;
  /** Номер телефона */
  phoneNumber: string;
  /** Адрес электронной почты */
  email: string;
  /** Пароль */
  password: string;
};
export type AddTimeSlotsDto = {
  /** Доктор ID */
  id: number;
  /** Доктор ID */
  timeSlots: string[];
};
export type Appointment = {};
export type CreateAppointmentDto = {};
export type SignInDto = {
  /** Адрес электронной почты */
  email: string;
  /** Пароль */
  password: string;
};
export type Admin = {
  /** id */
  id_admin: number;
  /** Фамилия */
  surname: string;
  /** Имя */
  name: string;
  /** Отчество */
  patronymic: string;
  /** Дата рождения */
  birthday: string;
  /** Номер телефона */
  phone_number: string;
};
export type CreateAdminDto = {
  /** Фамилия */
  surname: string;
  /** Имя */
  name: string;
  /** Отчество */
  patronymic: string;
  /** Дата рождения */
  birthday: string;
  /** Номер телефона */
  phoneNumber: string;
  /** Адрес электронной почты */
  email: string;
  /** Пароль */
  password: string;
};
export const {
  useUsersControllerCreateMutation,
  useUsersControllerGetAllQuery,
  useDoctorsControllerCreateMutation,
  useDoctorsControllerGetAllQuery,
  useDoctorsControllerGetByIdQuery,
  useDoctorsControllerAddTimeSlotsMutation,
  useDoctorsControllerGetAvailableDatesQuery,
  useAppointmentsControllerCreateMutation,
  useAppointmentsControllerGetAllQuery,
  useAuthControllerSignInMutation,
  useAuthControllerGetProfileQuery,
  useAdminsControllerCreateMutation,
  useAdminsControllerGetAllQuery,
} = injectedRtkApi;
