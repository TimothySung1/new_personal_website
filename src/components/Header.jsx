import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import '../styles/header.css';

// TODO: make header fixed, but only appear if mouse goes towards the top

function Header() {
  const titles = ['Home', 'About', 'Projects', 'Hobbies', 'Contact Me'];
  return (
    <div className="absolute top-2 sm:top-8 sm:w-auto w-[95%] sm:left-auto left-1/2 -translate-x-1/2 sm:translate-x-0 sm:right-12 mx-2 flex flex-row flex-wrap justify-center items-center lg:block z-10">
      {titles.map((title, i) => 
        <HeaderButton key={i} index={i} text={title} link={title.toLowerCase().replaceAll(' ', '-')}/>
      )}
      <ResumeButton />
    </div>
  )
}

function HeaderButton({text, link, index}) {
  return (
    <div className="inline-block mr-6 lg:mr-14 align-middle lg:mt-0 mt-[6px]">
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
        <p className="text-base sm:text-xl lg:text-2xl text-white">{text}</p>
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
  return (
    <Link to='/resume.pdf' target="_blank">
      <div className="inline-block border-2 border-mid-dark-green bg-dark-green px-2 py-1 hover:border-dark-green hover:bg-mid-dark-green duration-200 transition text-white">
        <p className="text-base sm:text-xl lg:text-2xl">Resume</p>
      </div>
    </Link>
  )
}

export default Header;