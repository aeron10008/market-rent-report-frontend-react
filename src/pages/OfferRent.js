import {
    Layout,
} from 'antd'



import {
    useContext, useEffect,
} from 'react'

import { Context } from '../store/Context'
import Top from '../layouts/Top'
import Bottom from '../layouts/Bottom'
import DetailsForm from '../layouts/DetailsForm'
import OfferRentForm from '../layouts/OfferRentForm'
import { useNavigate } from 'react-router-dom'

function OfferRent(props) {
    const { state } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (!state.responseDetails || state.offerRent.length === 0 || !state.offerRent[0].hasOwnProperty("results")) {
            navigate('/')
        }
    });
    return (
        <Layout style={{ 'width': '100%' }}>
            <Top />

            <Layout.Content>
                {/* endorsement list */}
                {state.responseDetails ?
                    <OfferRentForm /> : <DetailsForm />}
                <Bottom />

            </Layout.Content>
        </Layout>
    )
}

export default OfferRent