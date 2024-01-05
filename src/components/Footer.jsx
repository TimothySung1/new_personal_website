import linkedin from '../assets/LI-In-Bug.png';
import github from '../assets/github-mark-white.svg';
import '../styles/footer.css'

function Footer() {
  return (
    <div className='absolute bottom-0 w-full mt-auto'>
      <div className="w-full flex flex-row justify-center items-center border-t-2 border-gray mt-20 h-20 bg-dark-gray">
        <a href="https://www.linkedin.com/in/t-sung/" target="_blank" rel="noopener noreferrer" className=''>
          <img src={linkedin} alt="linkedin" className='h-12 z-50 relative sm:mx-0 mx-2' />
          {/* <div className='h-10 w-10 sm:w-11 bg-white absolute bottom-5 sm:ml-0 ml-[3.1vw]'></div> */}
        </a>
        <p className='text-base sm:text-xl text-white mx-0 sm:ml-20 sm:mr-20 pointer-events-none'>
          Developed by Timothy Sung
        </p>
        <a href="https://github.com/TimothySung1" target="_blank" rel="noopener noreferrer" className=''>
          <img src={github} alt="github" className='h-12 sm:mx-0 mx-2' />
        </a>
      </div>
    </div>
    
  )
}

export default Footer;