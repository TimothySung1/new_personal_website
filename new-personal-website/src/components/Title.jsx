import PropTypes from 'prop-types';

function Title({text}) {
  return (
    <div className="mt-32 mb-20">
      <p className="text-white text-4xl ml-20">{text}</p>
    </div>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Title;