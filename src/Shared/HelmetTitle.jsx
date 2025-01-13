import { Helmet } from 'react-helmet-async';
import propTypes from 'prop-types'

const HelmetTitle = ({title}) => {
    return (
        <Helmet>
            <title>{title} | Project Name</title>
        </Helmet>
    )
}

HelmetTitle.propTypes = {
    title : propTypes.string,
}

export default HelmetTitle
