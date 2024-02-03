import PropTypes from 'prop-types';

function Title({text}) {
  return (
    <div className="mt-28 sm:mt-32 mb-8 sm:mb-20 ">
      <p className="text-white text-4xl sm:ml-20 font-bold text-center sm:text-left">{text}</p>
      <hr className='mx-16 mt-4 border-0 h-1 bg-white'/>
    </div>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Title;