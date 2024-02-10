import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Form, Input, Button, Card, Flex, Radio, notification, TimePicker } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useAppointmentsControllerCreateMutation, useAuthControllerSignInMutation, useDoctorsControllerGetAllQuery, useDoctorsControllerGetAvailableDatesQuery, useDoctorsControllerGetByIdQuery } from "../redux/doctorApi";
import { LeftOutlined, LikeOutlined, MessageOutlined, PlusCircleOutlined, RightOutlined, StarOutlined } from '@ant-design/icons';
import moment from "moment";
import 'moment/locale/ru';

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';
interface LoginFormState {
    [EMAIL_NAME]: string,
    [PASSWORD_NAME]: string
}

const TimeSlotsManagement = () => {
    const { doctorId } = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const [timeSlots, setTimeSLots] = useState({
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
    })

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
                    Object.keys(timeSlots).map((timeSlot, s) => <Flex>
                        <p>{timeSlot}</p>
                        <Flex gap={"10px"}>
                            {//@ts-ignore
                                timeSlots[timeSlot].map(time => <div>{moment(time).format('hh:mm')}</div>)
                            }
                           <TimePicker   showNow={false} format={'HH:mm'} hideDisabledOptions minuteStep={15} disabledTime={() => {return {disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23, 24]};
                           }}></TimePicker>
                        </Flex>
                    </Flex>)
                }

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
                    await createAppointment({ createAppointmentDto: { date: `${appointmentDate}.000Z`, doctorId: Number(doctorId), userId: 1 } });
                    refetch();
                }}>Записаться</Button>
            </Flex>
        </>
    )
}

export default TimeSlotsManagement;