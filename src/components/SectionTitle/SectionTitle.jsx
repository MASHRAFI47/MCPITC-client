import PropTypes from 'prop-types';

const SectionTitle = ({ title, desc }) => {
    return (
        <div className='text-center px-5 md:px-0' data-aos="fade-in">
            <h1 className='text-4xl font-bold text-white'>{title}</h1>
            <p className='leading-loose	mt-3 text-white text-lg'>{desc}</p>
        </div>
    )
}


SectionTitle.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string
}


export default SectionTitle