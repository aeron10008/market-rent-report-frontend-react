import {
    Layout,
} from 'antd'




import Top from '../layouts/Top'
import Bottom from '../layouts/Bottom'
import DetailsForm from '../layouts/DetailsForm'

function Desktop(props) {
    return (
        <Layout style={{ 'width': '100%' }}>
            <Top />

            <Layout.Content>
                <DetailsForm />
                <Bottom />

            </Layout.Content>

        </Layout>
    )
}

export default Desktop
