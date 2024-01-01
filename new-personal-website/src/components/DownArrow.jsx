import PropTypes from 'prop-types';

function DownArrow({animate, thick, scale, clickHandler}) {
  return (
    <div className={'-mb-3'
      + (animate ? ' animate-bounce' : '')
      + (scale ? ' hover:scale-125 transition cursor-pointer': '')
      }
      onClick={clickHandler}>
      <hr className={'rotate-45 w-6 inline-block border-none bg-white/50'
        + (thick ? ' h-[2px] ' : ' h-[1px]')
      } />
      <hr className={'-rotate-45 w-6 -ml-2 inline-block border-none bg-white/50'
        + (thick ? ' h-[2px] ' : ' h-[1px]')
      } />
    </div>
  )
}

DownArrow.propTypes = {
  animate: PropTypes.bool,
  thick: PropTypes.bool,
  scale: PropTypes.bool,
  clickHandler: PropTypes.func,
}

export default DownArrow;