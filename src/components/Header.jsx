import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import '../styles/header.css';

// TODO: make header fixed, but only appear if mouse goes towards the top

function Header() {
  // const titles = ['Home', 'About', 'Projects', 'Hobbies', 'Contact Me'];
  const titles = ['Home', 'About', 'Projects', 'Contact Me'];
  return (
    <div className="absolute top-2 sm:top-8 sm:w-auto w-[95%] sm:left-auto left-1/2 -translate-x-1/2 sm:translate-x-0 sm:right-4 lg:right-12 mx-2 flex flex-row flex-wrap justify-center items-center lg:block z-10">
      {titles.map((title, i) => 
        <HeaderButton key={i} index={i} text={title} link={title.toLowerCase().replaceAll(' ', '-')}/>
      )}
      <ResumeButton />
    </div>
  )
}

function HeaderButton({text, link, index}) {
  return (
    <div className="inline-block mr-3 lg:mr-8 align-middle lg:mt-0 mt-[6px] bg-black bg-opacity-25 px-3 rounded-lg">
      <Link reloadDocument to={link} onMouseOver={
        () => {
          document.getElementById(index + '-0').classList.toggle('hovered0');
          document.getElementById(index + '-1').classList.toggle('hovered1');
        }
      } onMouseLeave={
        () => {
          document.getElementById(index + '-0').classList.toggle('hovered0');
          document.getElementById(index + '-1').classList.toggle('hovered1');
        }
      }>
        <p className="font-bold text-base sm:text-xl lg:text-2xl bg-gradient-to-br from-mid-dark-green to-neon-green bg-clip-text text-transparent">{text}</p>
      </Link>
      <hr className="hr0" id={index + "-0"}/>
      <hr className="hr1" id={index + "-1"}/>
    </div>
  );
}

HeaderButton.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  index: PropTypes.number,
}

function ResumeButton() {
  const resumePath = '/TimothySungResume2024.pdf'
  return (
    <Link to={resumePath} target="_blank">
      <div className="inline-block border-2 border-mid-dark-green bg-[#006946] px-2 py-1 hover:border-dark-green hover:bg-mid-dark-green duration-200 transition text-white rounded-lg">
        <p className="text-base sm:text-xl lg:text-2xl font-bold">Resume</p>
      </div>
    </Link>
  )
}

export default Header;