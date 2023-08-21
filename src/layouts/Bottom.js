import React, { useContext } from 'react'
import { Context } from '../store/Context';
import { Col, Row, Typography } from 'antd';

function Bottom() {
    const { state } = useContext(Context);
    return (
        <Row justify="center" align='middle' style={{ 'backgroundColor': 'white', 'padding': '22px 0 22px 0' }}>
            <Col>
                <Typography.Text type="secondary" style={{ 'fontSize': 16 }}>
                    {state.appName} © {new Date().getFullYear()}
                </Typography.Text>
            </Col>
        </Row>
    )
}

export default Bottom
