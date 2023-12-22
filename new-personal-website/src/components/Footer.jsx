import linkedin from '../assets/linkedin.png';
import github from '../assets/github.png';

function Footer() {
  return (
    <div className="w-full flex flex-row justify-center items-center border-t-2 border-gray mt-20 py-4">
      <a href="https://www.linkedin.com/in/t-sung/" target="_blank" rel="noopener noreferrer">
        <img src={linkedin} alt="linkedin" className='h-12 w-12' />
      </a>
      <p className='text-xl text-white ml-20 mr-20 pointer-events-none'>
        Developed by Timothy Sung
      </p>
      <a href="https://github.com/TimothySung1" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className='h-12 w-12' />
      </a>
    </div>
  )
}

export default Footer;