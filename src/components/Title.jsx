import PropTypes from 'prop-types';

function Title({text}) {
  return (
    <div className="mt-28 sm:mt-32 mb-12 sm:mb-20">
      <p className="text-white text-4xl sm:ml-20 font-bold text-center sm:text-left">{text}</p>
    </div>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Title;