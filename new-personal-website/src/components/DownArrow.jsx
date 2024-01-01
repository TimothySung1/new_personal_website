import PropTypes from 'prop-types';

function DownArrow({animate}) {
  return (
    <div className={animate ? 'animate-bounce' : ''}>
      <div className='flex flex-row mb-2'>
        <hr className='text-white/50 rotate-45 w-6' />
        <hr className='text-white/50 -rotate-45 w-6 -ml-2' />
      </div>
    </div>
  )
}

DownArrow.propTypes = {
  animate: PropTypes.bool,
}

export default DownArrow;