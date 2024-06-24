import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ExecutiveDisplay from './ExecutiveDisplay';


const ExecutiveYearsCol = ({ year }) => {
    // eslint-disable-next-line no-unused-vars
    const [params, setParams] = useSearchParams();

    const executive = params.get('executive');
    console.log(executive)


    const navigate = useNavigate()

    const handleYear = () => {
        const currentQuery = { executive: year?.yearRange };

        const url = queryString.stringifyUrl({
            url: '/executives',
            query: currentQuery,
        })
        navigate(url)
    }

    return (
        <div className='mt-5'>
            <h3 onClick={handleYear} className={`text-white font-bold text-xl border inline-block px-4 py-2 rounded-full cursor-pointer ${executive == year?.yearRange ? "text-blue-800 bg-base-100" : ""}`}>{year?.yearRange}</h3>
            <ExecutiveDisplay />
        </div>
    )
}

ExecutiveYearsCol.propTypes = {
    year: PropTypes.object
}

export default ExecutiveYearsCol