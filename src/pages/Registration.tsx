import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Form, Input, Button, DatePicker } from "antd";
import { useEffect, useMemo } from "react";
import { AUTH_ROUTE_PATH, DOCTOR_PATH } from "../routing/layouts/constants";
import { useAuthControllerSignInMutation, useUsersControllerCreateMutation } from "../redux/doctorApi";

const NAME = 'name';
const SURNAME = 'surname';
const PATRONYMIC = 'patronymic';
const BIRTHDAY = 'birthday';
const PASSPORT_SERIES = 'passportSeries';
const PASSPORT_NUMBER = 'passportNumber';
const PASSPORT_BEEN_USED = 'passportBeenUsed';
const DEPARTMENT_CODE = 'departmentCode';
const DATE_ISSUE = 'dateIssue';
const SNILS = 'snils';
const INN = 'inn';
const RESIDENTIAL_ADDRESS = 'residentialAddress';
const PHONE_NUMBER = 'phoneNumber';
const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';
interface LoginFormState {
    [NAME]: string,
    [SURNAME]: string,
    [PATRONYMIC]: string,
    [BIRTHDAY]: string,
    [PASSPORT_SERIES]: number,
    [PASSPORT_NUMBER]: number,
    [PASSPORT_BEEN_USED]: string,
    [DEPARTMENT_CODE]: number,
    [DATE_ISSUE]: string,
    [SNILS]: string,
    [INN]: number,
    [RESIDENTIAL_ADDRESS]: string,
    [PHONE_NUMBER]: string,
    [EMAIL_NAME]: string,
    [PASSWORD_NAME]: string
}

const FormRegistration = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [signIn, result] = useUsersControllerCreateMutation({ fixedCacheKey: 'shared-update-post' });
    const isAuth = useMemo(() => result.data != null, [result.data]);

    useEffect(() => {
        if (isAuth) navigate(DOCTOR_PATH, { replace: true });
    }, [isAuth])

    const onFinish = (values: LoginFormState) => {
        // dispatch(login({
        //     mail: values[EMAIL_NAME],
        //     password: values[PASSWORD_NAME]
        // }));
        console.log(values);

        signIn({
            createUserDto: {
                surname: values[SURNAME],
                name: values[NAME],
                patronymic: values[PATRONYMIC],
                /** Дата рождения */
                birthday: values[BIRTHDAY],
                /** Серия паспорта */
                passportSeries: values[PASSPORT_SERIES],
                /** Номер паспорта */
                passportNumber: values[PASSPORT_NUMBER],
                /** Паспорт выдан */
                passportBeenUsed: values[PASSPORT_BEEN_USED],
                /** Код организации */
                departmentCode: values[DEPARTMENT_CODE],
                /** Дата выдачи */
                dateIssue: values[DATE_ISSUE],
                /** СНИЛС */
                snils: values[SNILS],
                /** ИНН */
                inn: values[INN],
                /** Адрес проживания */
                residentialAddress: values[RESIDENTIAL_ADDRESS],
                /** Номер телефона */
                phoneNumber: values[PHONE_NUMBER],
                email: values[EMAIL_NAME],
                password: values[PASSWORD_NAME]
            }
        })
    };

    return (
        <>
            <div>{result.isError ? "Неверный логин или пароль" : null}</div>
            <Form style={{
                width: '70vw',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '16px',
                margin: "0 auto",
                marginTop: "300px",
                marginBottom: "300px",
                display: 'flex',
                justifyContent: 'center',
            }}
                onFinish={onFinish}
                autoComplete="off">
                <div style={{
                    width: '600px',
                }}>
                    <h1 style={{ textAlign: "center" }}>Регистрация</h1>
                    <div>
                        <Form.Item
                            name={SURNAME}
                            rules={[{ required: true, message: 'Фамилия' }]}
                        >
                            <Input placeholder="Фамилия" />
                        </Form.Item>
                        <Form.Item
                            name={NAME}
                            rules={[{ required: true, message: 'Имя' }]}
                        >
                            <Input placeholder="Имя" />
                        </Form.Item>
                        <Form.Item
                            name={PATRONYMIC}
                            rules={[{ required: true, message: 'Отчество' }]}
                        >
                            <Input placeholder="Отчество" />
                        </Form.Item>
                        <Form.Item
                            name={BIRTHDAY}
                            rules={[{ required: true, message: 'Дата рождения' }]}
                        >
                            <DatePicker style={{
                                width: '600px',
                            }} placeholder="Дата рождения" />
                        </Form.Item>
                        <Form.Item
                            name={PASSPORT_SERIES}
                            rules={[{ required: true, message: 'Серия паспорта' }]}
                        >
                            <Input placeholder="Серия паспорта" />
                        </Form.Item>
                        <Form.Item
                            name={PASSPORT_NUMBER}
                            rules={[{ required: true, message: 'Номер паспорта' }]}
                        >
                            <Input placeholder="Номер паспорта" />
                        </Form.Item>
                        <Form.Item
                            name={PASSPORT_BEEN_USED}
                            rules={[{ required: true, message: 'Выдан' }]}
                        >
                            <Input placeholder="Выдан" />
                        </Form.Item>
                        <Form.Item
                            name={DEPARTMENT_CODE}
                            rules={[{ required: true, message: 'Код учреждения' }]}
                        >
                            <Input placeholder="Код учреждения" />
                        </Form.Item>
                        <Form.Item
                            name={DATE_ISSUE}
                            rules={[{ required: true, message: 'Дата выдачи' }]}
                        >
                            <DatePicker style={{
                                width: '600px',
                            }} placeholder="Дата выдачи" />
                        </Form.Item>
                        <Form.Item
                            name={SNILS}
                            rules={[{ required: true, message: 'СНИЛС' }]}
                        >
                            <Input placeholder="СНИЛС" />
                        </Form.Item>
                        <Form.Item
                            name={INN}
                            rules={[{ required: true, message: 'ИНН' }]}
                        >
                            <Input placeholder="ИНН" />
                        </Form.Item>
                        <Form.Item
                            name={RESIDENTIAL_ADDRESS}
                            rules={[{ required: true, message: 'Адрес проживания' }]}
                        >
                            <Input placeholder="Адрес проживания" />
                        </Form.Item>
                        <Form.Item
                            name={PHONE_NUMBER}
                            rules={[{ required: true, message: 'Номер телефона' }]}
                        >
                            <Input placeholder="Номер телефона" />
                        </Form.Item>
                        <Form.Item
                            name={EMAIL_NAME}
                            rules={[{ required: true, message: 'email' },
                            { type: 'email', message: 'Неверный формат email' }]}
                        >
                            <Input placeholder="E-mail" />
                        </Form.Item>
                        <Form.Item
                            name={PASSWORD_NAME}
                            rules={[{ required: true, message: 'Пароль' }]}
                        >
                            <Input.Password placeholder="Пароль" />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item>
                            <Button style={{
                                width: '600px',
                                backgroundColor: '#4164EE',
                                borderRadius: '48px',
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                fontStyle: 'normal',
                                fontSize: '16px',
                                color: '#FEFEFE',
                                border: 'none'
                            }} htmlType='submit' loading={result.isLoading}>Регистрация</Button>
                        </Form.Item>
                        <Button style={{
                            width: '600px',
                            opacity: '0.8',
                            backgroundColor: '#4164EE',
                            borderRadius: '48px',
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            fontStyle: 'normal',
                            fontSize: '16px',
                            color: '#FEFEFE',
                            border: 'none',
                        }} onClick={() => navigate(AUTH_ROUTE_PATH)} loading={result.isLoading}>Войти</Button>
                    </div>
                </div>
            </Form>

        </>

    )
}

export default FormRegistration;