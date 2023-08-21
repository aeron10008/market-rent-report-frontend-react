import { Affix, Col, Layout, Row, Typography } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/Context';
import { useNavigate } from 'react-router-dom';
import { REQUEST_DELETE_INFO } from '../store/types';

function Top() {
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();
    const handleLogoClick = async () => {
        await dispatch({ type: REQUEST_DELETE_INFO, payload: '' });
        navigate('/');
    }
    return (
        <Affix offsetTop={0}>
            <Layout.Header style={{ 'background': 'white', 'height': '70px' }}>
                <Row justify='center' align='top' style={{ 'backgroundColor': 'white', 'height': '100%' }}>
                    <Row justify='start' align='top' style={{ 'maxWidth': '2000px', 'width': '100%', 'height': '100%', 'backgroundColor': 'white' }}>
                        <Col offset={1} style={{ 'cursor': 'pointer' }} onClick={() => { window.scrollTo(0, 0) }}>
                            <Row justify='center' align='bottom' onClick={handleLogoClick}>
                                <Col>
                                    <Typography.Title level={3} style={{ 'color': 'black', 'marginLeft': '10px' }}>{state.appName}</Typography.Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Layout.Header>
        </Affix>
    )
}

export default Top
