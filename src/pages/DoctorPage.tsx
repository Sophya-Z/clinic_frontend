import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Form, Input, Button, Flex } from "antd";
import { useEffect, useMemo } from "react";
import { APPOINTMENT_PATH, DOCTOR_PATH, REGISTER_PATH, TIMESLOTS_MANAGEMENT } from "../routing/layouts/constants";
import { useAuthControllerSignInMutation, useDoctorsControllerGetAllQuery } from "../redux/doctorApi";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, List, Space } from 'antd';

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';
interface LoginFormState {
    [EMAIL_NAME]: string,
    [PASSWORD_NAME]: string
}

const Doctors = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        data: post,
        isFetching,
        isLoading,
    } = useDoctorsControllerGetAllQuery()

    if (isLoading) return <div>Loading...</div>
    if (!post) return <div>Missing post!</div>

    // const isAuth = useAppSelector(viewerSelectors.selectIsAuth);
    //const isAuth = useMemo(() => result.data != null, [result.data]);
    //const loginStatus = 
    //const errorText = useAppSelector(viewerSelectors.selectErrorText);



    const data = Array.from({ length: 23 }).map((_, i) => ({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    }));

    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    // return (
    //     <>{post.map(doctor => <div>{doctor.name}</div>)}
    //     </>
    return (
        <Flex vertical={true} style={{width: '1200px', margin: '0 auto', marginTop:'120px'}}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={post}
                footer={null}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Button onClick={() => navigate(APPOINTMENT_PATH.replace(':doctorId', item.id.toString()))}>Выбрать</Button>,
                            <Button onClick={() => navigate(TIMESLOTS_MANAGEMENT.replace(':doctorId', item.id.toString()))}>Тайм слоты</Button>,
                            // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        {/* <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    /> */}
                        {item.surname} {item.name} {item.patronymic}
                        <div>Врач-офтальмолог</div>
                    </List.Item>
                )}
            />
        </Flex>
    )
}

export default Doctors;