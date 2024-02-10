import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Form, Input, Button } from "antd";
import { useEffect, useMemo } from "react";
import { DOCTOR_PATH, REGISTER_PATH } from "../routing/layouts/constants";
import { useAuthControllerSignInMutation } from "../redux/doctorApi";

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';
interface LoginFormState {
    [EMAIL_NAME]: string,
    [PASSWORD_NAME]: string
}

const FormLogin = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [signIn, result] = useAuthControllerSignInMutation({ fixedCacheKey: 'shared-update-post' })

    // const isAuth = useAppSelector(viewerSelectors.selectIsAuth);
    const isAuth = useMemo(() => result.data != null, [result.data]);
    //const loginStatus = 
    //const errorText = useAppSelector(viewerSelectors.selectErrorText);

    useEffect(() => {
        if (isAuth) navigate(DOCTOR_PATH, { replace: true });
    }, [isAuth])

    const onFinish = (values: LoginFormState) => {
        // dispatch(login({
        //     mail: values[EMAIL_NAME],
        //     password: values[PASSWORD_NAME]
        // }));
        signIn({ signInDto: { email: values[EMAIL_NAME], password: values[PASSWORD_NAME] } })
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
                display: 'flex',
                justifyContent: 'center',
            }}
                onFinish={onFinish}
                autoComplete="off">
                <div>
                    <h1 style={{textAlign: "center"}}>Авторизация</h1>
                    <Form.Item
                        name={EMAIL_NAME}
                        rules={[{ required: true, message: 'Введите email' },
                        { type: 'email', message: 'Неверный формат email' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name={PASSWORD_NAME}
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>

                    <div>
                        <Form.Item>
                            <Button style={{
                                backgroundColor: '#4164EE',
                                borderRadius: '48px',
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                fontStyle: 'normal',
                                fontSize: '16px',
                                color: '#FEFEFE',
                                padding: '0px 140px',
                                border: 'none'
                            }} htmlType='submit' loading={result.isLoading}>Войти</Button>
                        </Form.Item>
                        <Button style={{
                            backgroundColor: '#4164EE',
                            borderRadius: '48px',
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            fontStyle: 'normal',
                            fontSize: '16px',
                            color: '#FEFEFE',
                            padding: '0px 120px',
                            border: 'none'
                        }} onClick={() => navigate(REGISTER_PATH)} loading={result.isLoading}>Регистрация</Button>
                    </div>
                </div>
            </Form>

        </>

    )
}

export default FormLogin;