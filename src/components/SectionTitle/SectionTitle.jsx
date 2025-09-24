import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

const SectionTitle = ({ title, desc }) => {
    const { theme } = useAuth()
    return (
        <div className='text-center px-5 md:px-0' data-aos="fade-in">
            <h1 className={`text-4xl font-bold ${theme === "" ? "text-black" : "text-gray-200"}`}>{title}</h1>
            <p className={`leading-loose mt-3 text-black text-lg ${theme === "" ? "text-black" : "text-gray-200"}`}>{desc}</p>
        </div>
    )
}


SectionTitle.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string
}


export default SectionTitle