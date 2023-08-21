import { Button, Col, Form, Input, Modal, Row, Typography, message } from 'antd';
import React, { useContext, useEffect } from 'react'
import { Context } from '../store/Context';
import {
    motion,
} from 'framer-motion'
import {
    SearchOutlined
} from '@ant-design/icons'
import { REQUEST_DELETE_INFO, REQUEST_FAILED } from '../store/types';
import { useNavigate } from 'react-router-dom';

function OfferRentForm(props) {
    const { state, dispatch } = useContext(Context);
    const [messageApi, contextHolder] = message.useMessage();
    const messageError = (message) => {
        messageApi.error(message);
    };
    const navigate = useNavigate();
    const goToFirst = async () => {
        await dispatch({ type: REQUEST_DELETE_INFO, payload: '' });
        navigate('/');
    }
    const { success } = Modal;
    const showModal = (message) => {
        success({
            title: 'Congratulations!',
            content: message,
            okText: 'Go to the first page',
            okType: 'primary',
            onOk: () => {
                goToFirst()
            },
        })
    }
    let mailHtml = ``;
    if (state.offerRent.length > 0) {
        mailHtml = `
            <main style="padding-top: 2rem; padding-bottom: 4rem; background-color: white;">
                <div
                    style="display: flex; justify-content: space-between; padding-left: 1rem; padding-right: 1rem; max-width: 1280px; margin-left: auto; margin-right: auto;">
                    <article style="margin-left: auto;margin-right: auto;width: 100%;">
                        <header style="margin-bottom: 1rem;">
                            <h1 style="color: rgb(17, 24, 39);font-size: 1.875rem; font-weight: 800;line-height: 1.25;margin-bottom: 1rem;">
                                Market rent report as of&nbsp;${new Date().toDateString()}
                            </h1>
                        </header>`;
        state.offerRent.forEach(item => {
            let {
                comparables,
                offerRentRange,
                addressGoogle,
                typeOfDwelling,
                noBedrooms,
                offerRent,
                yearBuilt,
            } = item.results;
            let comparablesHtml = ``;
            comparables.forEach((item, index) => {
                comparablesHtml += index % 2 === 0 ? `
                <tr style="background-color: white;border-bottom-width: 1px;font-size:1.125rem;line-height:1.75rem">
                <th scope="row"
                                                                style="color: rgb(17, 24, 39);font-weight: 500;padding: 1rem 1.5rem;">
                  ${index + 1}
                </th>
                <td style="padding: 1rem 1.5rem;">
                ${item.address}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.date}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.beds}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.floorNumber ? item.floorNumber : '-'}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.floorAreaFinTotal ? item.floorAreaFinTotal : '-'}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.yearBuilt ? item.yearBuilt : '-'}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.price}
                </td>
              </tr>
                ` : `<tr key="${index}" style="background-color: rgb(229,231,235);border-bottom-width: 1px;font-size:1.125rem;line-height:1.75rem">
                <th scope="row"
                style="color: rgb(17, 24, 39);font-weight: 500;padding: 1rem 1.5rem;">
                  ${index + 1}
                </th>
                <td style="padding: 1rem 1.5rem;">
                  ${item.address}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.date}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.beds}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.floorNumber ? item.floorNumber : '-'}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.floorAreaFinTotal ? item.floorAreaFinTotal : '-'}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.yearBuilt ? item.yearBuilt : '-'}
                </td>
                <td style="padding: 1rem 1.5rem;">
                  ${item.price}
                </td>
              </tr>
                `;
            });
            mailHtml += `
                                            <section class="not-format">
                                            <div
                                            style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);overflow-x: auto;margin: 2.5rem 1rem 1.5rem 1rem;position: relative;">
                                            <div
                                                style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);padding: 1.5rem;background-color: white;border-color: rgb(229, 231, 235);border-width: 1px;border-radius: 0.5rem;">
                                                <div>
                                                    <h5
                                                        style="margin-bottom: 0.5rem;font-size: 1.5rem;line-height: 2rem;font-weight: 700;letter-spacing: -0.025em;color: rgb(17, 24, 39);">
                                                        ${addressGoogle}
                                                    </h5>
                                                </div>
                                                        <div style="display: grid;grid-template-columns: repeat(2, minmax(0, 1fr));gap: 1rem;">
                        <div style="padding-top: 1rem;padding-bottom: 1rem;">
                            <ul
                                style="max-width: 28rem;list-style: none;margin: 0;padding: 0;border: 0 solid #e5e7eb;box-sizing: border-box;">
                                <li style="padding-top: 1rem;padding-bottom: 1rem;">
                                    <div style="display: flex;align-items: center;overflow: hidden;">
                                        <div style="flex-shrink: 0;">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                stroke="currentColor" width="60" height="60"
                                                viewBox="0 0 24 24">
                                                <path xmlns="http://www.w3.org/2000/svg" stroke="#0642FF"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M4 10V8a2 2 0 012-2h12a2 2 0 012 2v2M4 10h16M4 10v6a2 2 0 002 2h12a2 2 0 002-2v-6M7 15h5" />
                                            </svg>
                                        </div>
                                        <div style="flex: 1 1 0%;min-width: 0;max-width: 40%;">
                                            <p
                                                style="color: rgb(17, 24, 39);font-weight: 500;font-size: 1.25rem;line-height: 1.75rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin: 0;">
                                                                Price:
                                                            </p>
                                                        </div>
                                                        <div
                                                            style="color: rgb(17, 24, 39);font-weight: 600;font-size: 1.5rem;line-height: 2rem;align-items: center;display: inline-flex;max-width: 40%;text-overflow: ellipsis;">
                                                            $ ${offerRent}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li style="padding-top: 1rem;padding-bottom: 1rem;">
                                                    <div style="display: flex;align-items: center;overflow: hidden;">
                                                        <div style="flex-shrink: 0;">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                stroke="currentColor" width="60" height="60"
                                                                viewBox="0 0 24 24">
                                                                <path xmlns="http://www.w3.org/2000/svg" stroke="#0642FF"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M4 10V8a2 2 0 012-2h12a2 2 0 012 2v2M4 10h16M4 10v6a2 2 0 002 2h12a2 2 0 002-2v-6M7 15h5" />
                                                            </svg>
                                                        </div>
                                                        <div style="flex: 1 1 0%;min-width: 0;max-width: 40%;">
                                                            <p
                                                                style="color: rgb(17, 24, 39);font-weight: 500;font-size: 1.25rem;line-height: 1.75rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin: 0;">
                                                                Confidence Level:
                                                            </p>
                                                        </div>
                                                        <div
                                                            style="color: rgb(17, 24, 39);font-weight: 600;font-size: 1.5rem;line-height: 2rem;align-items: center;display: inline-flex;max-width: 40%;text-overflow: ellipsis;">
                                                            High
                                                        </div>
                                                    </div>
                                                </li>
                                                <li style="padding-top: 1rem;padding-bottom: 1rem;">
                                                    <div style="display: flex;align-items: center;overflow: hidden;">
                                                        <div style="flex-shrink: 0;">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                stroke="currentColor" width="60" height="60"
                                                                viewBox="0 0 24 24">
                                                                <path xmlns="http://www.w3.org/2000/svg" stroke="#0642FF"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M4 10V8a2 2 0 012-2h12a2 2 0 012 2v2M4 10h16M4 10v6a2 2 0 002 2h12a2 2 0 002-2v-6M7 15h5" />
                                                            </svg>
                                                        </div>
                                                        <div style="flex: 1 1 0%;min-width: 0;max-width: 40%;">
                                                            <p
                                                                style="color: rgb(17, 24, 39);font-weight: 500;font-size: 1.25rem;line-height: 1.75rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin: 0;">
                                                                                Range:
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style="color: rgb(17, 24, 39);font-weight: 600;font-size: 1.5rem;line-height: 2rem;align-items: center;display: inline-flex;max-width: 40%;text-overflow: ellipsis;">
                                                                            $ ${offerRentRange[0]} - ${offerRentRange[1]}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div style="padding-top: 1rem;padding-bottom: 1rem;">
                                                        <ul
                                                            style="max-width: 28rem;list-style: none;margin: 0;padding: 0;border: 0 solid #e5e7eb;box-sizing: border-box;">
                                                            <li style="padding-top: 1rem;padding-bottom: 1rem;">
                                                                <div style="display: flex;align-items: center;overflow: hidden;">
                                                                    <div style="flex-shrink: 0;">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                            stroke="currentColor" width="60" height="60"
                                                                            viewBox="0 0 24 24">
                                                                            <path xmlns="http://www.w3.org/2000/svg" stroke="#0642FF"
                                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                                stroke-width="2"
                                                                                d="M4 10V8a2 2 0 012-2h12a2 2 0 012 2v2M4 10h16M4 10v6a2 2 0 002 2h12a2 2 0 002-2v-6M7 15h5" />
                                                                        </svg>
                                                                    </div>
                                                                    <div style="flex: 1 1 0%;min-width: 0;max-width: 40%;">
                                                                        <p
                                                                            style="color: rgb(17, 24, 39);font-weight: 500;font-size: 1.25rem;line-height: 1.75rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin: 0;">
                                                                                            Home Type:
                                                                                        </p>
                                                                                    </div>
                                                                                    <div
                                                                                    style="color: rgb(17, 24, 39);font-weight: 600;font-size: 1.5rem;line-height: 2rem;align-items: center;display: inline-flex;max-width: 40%;text-overflow: ellipsis;">
                                                                                    ${typeOfDwelling}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li style="padding-top: 1rem;padding-bottom: 1rem;">
                                                                <div style="display: flex;align-items: center;overflow: hidden;">
                                                                    <div style="flex-shrink: 0;">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                            stroke="currentColor" width="60" height="60"
                                                                            viewBox="0 0 24 24">
                                                                            <path xmlns="http://www.w3.org/2000/svg" stroke="#0642FF"
                                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                                stroke-width="2"
                                                                                d="M4 10V8a2 2 0 012-2h12a2 2 0 012 2v2M4 10h16M4 10v6a2 2 0 002 2h12a2 2 0 002-2v-6M7 15h5" />
                                                                        </svg>
                                                                    </div>
                                                                    <div style="flex: 1 1 0%;min-width: 0;max-width: 40%;">
                                                                        <p
                                                                            style="color: rgb(17, 24, 39);font-weight: 500;font-size: 1.25rem;line-height: 1.75rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin: 0;">
                                                                                            No of Bedrooms:
                                                                                        </p>
                                                                                    </div>
                                                                                    <div
                                                                                    style="color: rgb(17, 24, 39);font-weight: 600;font-size: 1.5rem;line-height: 2rem;align-items: center;display: inline-flex;max-width: 40%;text-overflow: ellipsis;">
                                                                                    ${noBedrooms}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li style="padding-top: 1rem;padding-bottom: 1rem;">
                                                                <div style="display: flex;align-items: center;overflow: hidden;">
                                                                    <div style="flex-shrink: 0;">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                            stroke="currentColor" width="60" height="60"
                                                                            viewBox="0 0 24 24">
                                                                            <path xmlns="http://www.w3.org/2000/svg" stroke="#0642FF"
                                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                                stroke-width="2"
                                                                                d="M4 10V8a2 2 0 012-2h12a2 2 0 012 2v2M4 10h16M4 10v6a2 2 0 002 2h12a2 2 0 002-2v-6M7 15h5" />
                                                                        </svg>
                                                                    </div>
                                                                    <div style="flex: 1 1 0%;min-width: 0;max-width: 40%;">
                                                                        <p
                                                                            style="color: rgb(17, 24, 39);font-weight: 500;font-size: 1.25rem;line-height: 1.75rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin: 0;">
                                                                                            YearBuilt:
                                                                                        </p>
                                                                                    </div>
                                                                                    <div
                                                                                    style="color: rgb(17, 24, 39);font-weight: 600;font-size: 1.5rem;line-height: 2rem;align-items: center;display: inline-flex;max-width: 40%;text-overflow: ellipsis;">
                                                                                    ${!yearBuilt || yearBuilt === 'null' ? 'N/A' : yearBuilt}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);overflow-x: auto;margin: 2.5rem 1rem 1.5rem 1rem;position: relative;">
                                                            <div
                                                                style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);padding: 1.5rem;background-color: white;border-color: rgb(229, 231, 235);border-width: 1px;border-radius: 0.5rem;">
                                                                <div>
                                                                    <h5
                                                                        style="margin-bottom: 0.5rem;font-size: 1.5rem;line-height: 2rem;font-weight: 700;letter-spacing: -0.025em;color: rgb(17, 24, 39);">
                                                                        Recent Comparables
                                                                    </h5>
                                                                </div>
                                                                        <table
                                                            style="width: 100%;font-size: .875rem;line-height: 1.25rem;text-align: left;color: rgb(107, 114, 128);">
                                                            <thead
                                                                style="font-size: 1rem;line-height: 1.25rem;color: rgb(55, 65, 81);text-transform: uppercase;background-color: rgb(249, 250, 251);">
                                                                <tr>
                                                                    <th scope="col" style="padding: 0.75rem 1.5rem;">
                                                                        #
                                                                    </th>
                                                                    <th scope="col" style="padding: 0.75rem 1.5rem;">
                                                                        Address
                                                                    </th>
                                                                    <th scope="col" style="padding: 0.75rem 1.5rem;">
                                                                        Date
                                                                    </th>
                                                                    <th scope="col" style="padding: 0.75rem 1.5rem;">
                                                                        Beds
                                                                    </th>
                                                                    <th scope="col" style="padding: 0.75rem 1.5rem;">
                                                                        Floor Number
                                                                    </th>
                                                                    <th scope="col" style="padding: 0.75rem 1.5rem;">
                                                                        SqFt
                                                                    </th>
                                                                    <th scope="col" style="padding: 0.75rem 1.5rem;">
                                                                        YearBuilt
                                                                    </th>
                                                                    <th scope="col" style="padding: 0.75rem 1.5rem;">
                                                                        Price
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                ${comparablesHtml}
                                                            </tbody>
                                                        </table>
            
                                                    </div>
                                                </div>
                                            </section>
              `;
        });
        mailHtml += `
                                    </article>
                                </div>
                            </main>`;
    }
    const [form1] = Form.useForm();
    const onFinish1 = (values) => {
        const name = values.name === undefined || values.name === null ? '' : values.name;
        const email = values.email === undefined || values.email === null ? '' : values.email;
        if (state.offerRent.length > 0) {
            const mailData = {
                to: email,
                subject: `To ${name}`,
                html: mailHtml,
            }
            const url = `${process.env.REACT_APP_SERVER_URL}send-mail`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mailData)
            }
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    showModal(data);
                })
                .catch(err => dispatch({ type: REQUEST_FAILED, payload: err }));
        }
    };
    useEffect(() => {
        if (state.errors) {
            messageError('An Error was occured.')
        }
    });
    return (<>
        {
            state.responseDetails ? (

                <Row justify='center' align='middle' style={{ 'width': '100%', 'minHeight': '90vh', 'backgroundImage': `url(${state.offerBgImage})`, 'backgroundRepeat': 'no-repeat', 'backgroundSize': 'cover' }}>
                    {contextHolder}
                    <Row justify='center' align='middle' style={{ 'width': '100%' }}>

                        <motion.div
                            style={{ 'width': '75%', 'backgroundColor': 'white', 'borderRadius': 10 }}
                            initial={{ y: 300, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1, transition: { type: 'spring', bounce: 0, duration: 1 } }}
                            viewport={{ once: true }}>
                            <Row justify='center'>
                                <Typography.Title style={{ color: '#e53157' }}>
                                    {state.offerRentPageTitle}
                                </Typography.Title>
                            </Row>

                            <Row justify='center' style={{ 'width': '100%', 'marginTop': '50px' }}>
                                <Form
                                    form={form1}
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ 'width': '80%' }}
                                    layout='inline'
                                    name="horizontal_login"
                                    initialValues={{
                                        province: state.responseDetails.results.province,
                                        city: state.responseDetails.results.city,
                                        address: state.responseDetails.results.address,
                                        addressUnit: state.responseDetails.results.addressUnit,
                                        noBedrooms: state.responseDetails.results.noBedrooms,
                                        typeOfDwelling: state.responseDetails.results.typeOfDwelling,
                                    }}
                                    onFinish={onFinish1}>
                                    <Col span={12} style={{ 'marginBottom': 20 }}>
                                        <Form.Item
                                            label="Your Name"
                                            name="name"
                                            rules={[{ required: true, message: 'Please input your name!' }]}
                                        >
                                            <Input
                                                name="name"
                                                placeholder="Input name"
                                                size='large'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ 'marginBottom': 20 }}>
                                        <Form.Item
                                            label="Your Email Address"
                                            name="email"
                                            rules={[{ type: 'email', message: 'The input is not valid E-mail!' },
                                            { required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input
                                                name="email"
                                                type='email'
                                                placeholder="Input email"
                                                size='large'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ 'marginBottom': 20 }}>
                                        <Form.Item
                                            label="Your Phone Number"
                                            name="phoneNumber"
                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                        >
                                            <Input
                                                name="phoneNumber"
                                                placeholder="Input phpne number"
                                                size='large'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            shouldUpdate
                                            wrapperCol={{
                                                offset: 12,
                                                span: 16,
                                            }}>
                                            {() => (
                                                <Button
                                                    type='primary'
                                                    htmlType='submit'
                                                    icon={<SearchOutlined />}
                                                    size='large'
                                                >
                                                    Submit
                                                </Button>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Form>
                            </Row>
                        </motion.div>

                    </Row>
                </Row>
            ) : ''
        }
    </>)
}

export default OfferRentForm
