import linkedin from '../assets/LI-In-Bug.png';
import github from '../assets/github-mark-white.svg';
import '../styles/footer.css'

function Footer() {
  return (
    <div className='absolute bottom-0 w-full mt-auto'>
      <div className="w-full flex flex-row justify-center items-center border-t-2 border-gray mt-20 h-20 bg-dark-gray">
        <a href="https://www.linkedin.com/in/t-sung/" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="linkedin" className='h-12' />
          <div className='h-10 w-11 bg-white absolute bottom-5 -z-10'></div>
        </a>
        <p className='text-xl text-white ml-20 mr-20 pointer-events-none'>
          Developed by Timothy Sung
        </p>
        <a href="https://github.com/TimothySung1" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="github" className='h-12' />
        </a>
      </div>
    </div>
    
  )
}

export default Footer;