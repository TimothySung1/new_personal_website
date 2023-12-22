import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import '../styles/header.css';

function Header() {
  const titles = ['Home', 'About', 'Projects', 'Hobbies', 'Contact Me'];
  return (
    <div className="absolute top-8 right-8">
      {titles.map((title, i) => 
        <HeaderButton key={i} index={i} text={title} link={title.toLowerCase().replaceAll(' ', '-')}/>
      )}
      <ResumeButton />
    </div>
  )
}

function HeaderButton({text, link, index}) {
  return (
    <div className="inline-block mr-14 align-middle">
      <Link to={link} onMouseOver={
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
        <p className="text-2xl text-white">{text}</p>
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
    <Link to='/resume'>
      <div className="inline-block mr-14 border-2 border-mid-dark-green bg-dark-green px-2 py-1 hover:border-dark-green hover:bg-mid-dark-green duration-200 transition text-white">
        <p className="text-2xl">Resume</p>
      </div>
    </Link>
  )
}

export default Header;