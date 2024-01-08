import PropTypes from 'prop-types';
import { useEffect } from 'react';

// fixed div with centered 3 dots bouncing, over everything, fade out after certain time
function Loading() {
  useEffect(() => {
    const loadingDiv = document.getElementById('loading');
    setTimeout(() => loadingDiv.style.zIndex = -100, 1100);
  });
  return (
    <div className="w-100vw h-100vh fixed z-50 bg-dark-gray animate-fadeout" id={'loading'}>
      <div className="flex flex-row justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <BouncingCircle offset={0}/>
        <BouncingCircle offset={1}/>
        <BouncingCircle offset={2}/>
      </div>
    </div>
  )
}

function BouncingCircle({offset}) {
  const style = {
    animationDelay: `${offset * 100}ms`,
  };
  return (
    <div className={'w-10 h-10 bg-white/30 rounded-full animate-ballbounce mx-4 border border-black'} style={style}></div>
  )
}

BouncingCircle.propTypes = {
  offset: PropTypes.number.isRequired,
}

export default Loading;