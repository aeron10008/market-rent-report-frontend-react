import { Button, Checkbox, Col, Form, Row, Select, Typography, message } from 'antd'
import React, { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import {
    motion,
} from 'framer-motion'
import {
    SearchOutlined
} from '@ant-design/icons'
import { Context } from '../store/Context';
import { REQUEST_DETAILS, REQUEST_FAILED, REQUEST_GOOGLE_API_FIND_ADDRESS, REQUEST_GOOGLE_API_GET_PROVINCE_LOCATION, REQUEST_OFFER_RENT } from '../store/types';
import { useNavigate } from 'react-router-dom';

function DetailsForm(props) {
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();
    const { provinces, addresses, typesOfDwelling, responseDetails, location } = state;
    const [messageApi, contextHolder] = message.useMessage();
    const messageError = (message) => {
        messageApi.error(message);
    };
    const [form] = Form.useForm();
    const handleChangeProvince = (value) => {
        const url = `${process.env.REACT_APP_SERVER_URL}google-maps-api-get-province-location?key=${value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => dispatch({ type: REQUEST_GOOGLE_API_GET_PROVINCE_LOCATION, payload: data }))
            .catch(err => dispatch({ type: REQUEST_FAILED, payload: err }));
    }
    const handleChangeAddress = (value) => {
        if (location) {
            const south = location.southwest.lat;
            const west = location.southwest.lng;
            const north = location.northeast.lat;
            const east = location.northeast.lng;
            const url = `${process.env.REACT_APP_SERVER_URL}google-maps-api-find-address?key=${value}&location=rectangle:${south},${west}|${north},${east}`;
            fetch(url)
                .then(res => res.json())
                .then(data => dispatch({ type: REQUEST_GOOGLE_API_FIND_ADDRESS, payload: data }))
                .catch(err => dispatch({ type: REQUEST_FAILED, payload: err }));
        }
    }
    const onFinish = (values) => {
        const province = values.province === undefined ? '' : values.province;
        const address = values.address === '' ? '' : values.address;
        const addressArray = address === '' ? [] : address.split(',');
        const city = addressArray.length === 0 ? '' : addressArray[addressArray.length - 3].trim();
        const extractedProvince = addressArray.length === 0 ? '' : addressArray[addressArray.length - 2].trim();
        if (province.trim() === extractedProvince) {
            if (responseDetails) {
                console.log(values.noBedrooms);
                const typeOfDwelling = !values.typeOfDwelling || values.typeOfDwelling === undefined ? '' : values.typeOfDwelling;
                const noBedrooms = !values.noBedrooms.length === 0 ? [] : values.noBedrooms;
                noBedrooms.forEach(item => {
                    const url = `${process.env.REACT_APP_SERVER_URL}offerrent?province=${province}&city=${city}&address=${address}&noBedrooms=${item}&typeOfDwelling=${typeOfDwelling}`;
                    fetch(url)
                        .then(res => { return res.json() })
                        .then(data => { dispatch({ type: REQUEST_OFFER_RENT, payload: data }) })
                        .catch(err => dispatch({ type: REQUEST_FAILED, payload: err }));
                });
            } else {
                const url = `${process.env.REACT_APP_SERVER_URL}details?province=${province}&city=${city}&address=${address}`
                fetch(url)
                    .then(res => { return res.json() })
                    .then(data => dispatch({ type: REQUEST_DETAILS, payload: data }))
                    .catch(err => dispatch({ type: REQUEST_FAILED, payload: err }));
            }
        } else {
            messageError('The province of selected address must be equal to select')
        }
    };
    useEffect(() => {
        if (form.getFieldValue('noBedrooms')) {
            if (state.offerRent.length >= form.getFieldValue('noBedrooms').length) {
                if (state.offerRent[0].hasOwnProperty("results")) {
                    navigate('/offerrent');
                } else {
                    messageError('An Error was occurred.')
                }
            }
        }
    });
    return (
        <Row justify='center' align='middle' style={{ 'width': '100%', 'minHeight': '90vh', 'backgroundImage': `url(${state.coverImage})`, 'backgroundRepeat': 'no-repeat', 'backgroundSize': 'cover' }}>
            {contextHolder}
            <Row justify='center' align='middle' style={{ 'width': '100%' }}>

                <motion.div
                    style={{ 'width': '100%' }}
                    initial={{ y: 300, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1, transition: { type: 'spring', bounce: 0, duration: 1 } }}
                    viewport={{ once: true }}>
                    <Row justify='center'>
                        <Typography.Title style={{ color: '#e53157' }}>
                            {state.detailPageTitle}
                        </Typography.Title>
                    </Row>
                    <Row justify='center'>
                        <Typography style={{ 'fontSize': '24px' }}>
                            {state.detailPageDescription}
                        </Typography>
                    </Row>

                    <Row justify='center' align='middle' style={{ 'maxWidth': '1024px', 'padding': '50px', 'margin': '50px auto', 'background': 'white', 'borderRadius': 10 }}>
                        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} style={{ 'width': '100%' }}>
                            <Col span={5}>
                                <Form.Item
                                    name="province"
                                    rules={[{ required: true, message: 'Please a province!' }]}
                                >
                                    <Select
                                        showSearch
                                        name="province"
                                        placeholder="Select a province"
                                        optionFilterProp="children"
                                        size='large'
                                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                        options={provinces}
                                        onChange={handleChangeProvince}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={15}>
                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'Please a address!' }]}
                                >
                                    <Select
                                        showSearch
                                        name="address"
                                        placeholder="Search a address"
                                        optionFilterProp="children"
                                        size='large'
                                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                        options={addresses}
                                        onSearch={handleChangeAddress}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item shouldUpdate>
                                    {() => (
                                        <Button style={{ 'width': '100%' }}
                                            type='primary'
                                            htmlType='submit'
                                            icon={<SearchOutlined />}
                                            size='large'
                                            disabled={
                                                !form.getFieldValue('province') ||
                                                !form.getFieldValue('address')
                                            }
                                        >
                                            Search
                                        </Button>
                                    )}
                                </Form.Item>
                            </Col>
                            {responseDetails ? (
                                <>
                                    <Col span={5} style={{ 'marginTop': '15px' }}>
                                        <Form.Item
                                            name="typeOfDwelling"
                                            rules={[{ required: true, message: 'Please a address!' }]}
                                        >
                                            <Select
                                                showSearch
                                                name="typeOfDwelling"
                                                placeholder="Type of Dwelling"
                                                optionFilterProp="children"
                                                size='large'
                                                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                options={typesOfDwelling}
                                                onSearch={handleChangeAddress}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={15} style={{ 'marginTop': '20px' }}>
                                        <Form.Item
                                            label="No Bedrooms"
                                            name="noBedrooms"
                                            rules={[{ required: true, message: 'Please a address!' }]}
                                        >
                                            <Checkbox.Group options={state.noBedrooms} />
                                        </Form.Item>
                                    </Col>
                                </>
                            ) : ''}
                        </Form>
                    </Row>
                </motion.div>

            </Row>
        </Row>
    )
}

export default DetailsForm
