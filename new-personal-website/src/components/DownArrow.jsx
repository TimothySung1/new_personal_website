import PropTypes from 'prop-types';

function DownArrow({animate}) {
  return (
    <div className={'-mb-3 ' + (animate ? 'animate-bounce' : '')}>
      <hr className='text-white/50 rotate-45 w-6 inline-block' />
      <hr className='text-white/50 -rotate-45 w-6 -ml-2 inline-block' />
    </div>
  )
}

DownArrow.propTypes = {
  animate: PropTypes.bool,
}

export default DownArrow;