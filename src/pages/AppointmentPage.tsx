import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Form, Input, Button, Card, Flex, Radio, notification } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useAppointmentsControllerCreateMutation, useAuthControllerGetProfileQuery, useAuthControllerSignInMutation, useDoctorsControllerGetAllQuery, useDoctorsControllerGetAvailableDatesQuery, useDoctorsControllerGetByIdQuery } from "../redux/doctorApi";
import { LeftOutlined, LikeOutlined, MessageOutlined, RightOutlined, StarOutlined } from '@ant-design/icons';
import moment from "moment";
import 'moment/locale/ru';

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';
interface LoginFormState {
    [EMAIL_NAME]: string,
    [PASSWORD_NAME]: string
}

const Appointment = () => {
    const { doctorId } = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    const [appointmentDate, setAppointmentDate] = useState<string>(Date.now().toString());
    const [dateOffset, setDateOffset] = useState<number>(0);

    const {
        data: doctor,
        // isFetching,
        // isLoading,
    } = useDoctorsControllerGetByIdQuery({ id: Number(doctorId) })

    const {
        data: schedule,
        isFetching,
        isLoading,
        refetch
    } = useDoctorsControllerGetAvailableDatesQuery({ id: Number(doctorId), startDate: moment(Date.now()).add(dateOffset, 'days').startOf('week').toISOString(), endDate: moment(Date.now()).startOf('week').add(6 + dateOffset, 'days').toISOString() })

    const [
        createAppointment,
        result,
    ] = useAppointmentsControllerCreateMutation()

    const {
        data: account
    } = useAuthControllerGetProfileQuery()


    if (isLoading) return <div>Loading...</div>
    if (!doctor) return <div>Missing post!</div>

    moment.locale('ru')

    return (
        <>
            <Flex style={{ width: '1200px', margin: '0 auto', marginTop: '120px' }} justify="center" vertical={true}>
                <h1>{`${doctor.surname} ${doctor.name} ${doctor.patronymic}`}</h1>
                <p>{doctor.description}</p>
                <p>Выбрать время для записи
                    <Button disabled={dateOffset <= 0} icon={<LeftOutlined />} onClick={() => setDateOffset(prev => prev -= 6)} />
                    <Button icon={<RightOutlined onClick={() => setDateOffset(prev => prev += 6)} />} />
                </p>

                {//@ts-ignore 
                    Object.entries(schedule).map((d, t) => <Radio.Group value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)}>
                        <Flex>
                            <p style={{ fontSize: '14px', width: '120px' }}>{moment(d[0]).format('dd, D MMMM')}</p>
                            <Flex align="center">
                                {//@ts-ignore
                                    d[1].map(t => <Radio.Button value={`${d[0]}T${t}`}>{t}</Radio.Button>)
                                }
                            </Flex>
                        </Flex>
                    </Radio.Group>)

                }

                <Button type="primary" style={{ width: '120px' }} onClick={async () => {
                    //@ts-ignore
                    await createAppointment({ createAppointmentDto: { date: `${appointmentDate}.000Z`, doctorId: Number(doctorId), userId: account.user.id } });
                    refetch();
                }}>Записаться</Button>
            </Flex>
        </>
    )
}

export default Appointment;