import { Link } from 'react-router-dom';
import './App.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import MainCanvas from './components/MainCanvas';
import Loading from './components/Loading';
import DownArrow from './components/DownArrow';
import waving from './assets/waving.png';

// TODO: make info sections wider (vertically) spaced, and make text larger
// TODO: add threejs stuff
// for about me, when mouse hover name or gt, make particles form the words or my image (is this possible?)

function App() {
  const [showbg, setShowbg] = useState(false);
  return (
    <>
      <div className='absolute left-1/2 -translate-x-1/2 top-[54em] cursor-pointer' onClick={() => setShowbg(!showbg)}>
        <input type="checkbox" className='inline-block align-middle bg-white border-none h-4 w-4 cursor-pointer' checked={showbg} />
        <p className='inline-block text-neon-green font-bold ml-4 align-middle text-base select-none'>
          Turn on 3D background
        </p>
      </div>
      {showbg && <Loading />}
      {showbg && <MainCanvas />}
      <div className='flex flex-row justify-around items-center h-98vh'>
        <Title />
        <Picture />
      </div>
      <ScrollHelper />
      <MainContent />
    </>
  )
}

function Title() {
  return (
    <div className='w-2/5 flex flex-col'>
      <p className=" text-7xl text-white mb-8">
      Hello<img src={waving} alt="emoji" className='h-16 inline-block align-top ml-2' />, <br />
      my name is Timothy Sung. <br />
      Welcome to my Website!
      </p>
      <hr className='mb-2 border-dark-green shadow shadow-dark-green'/>
      <hr className='ml-4 mr-4 mb-8 border-dark-green shadow shadow-dark-green'/>
      <p className='text-neon-green self-center mb-8 text-2xl'>
        Software Developer
      </p>
      <p className='text-white/70 self-center text-xl'>
        I make Full Stack web applications and enjoy learning all things AI, cloud, or computer-related.
      </p>
    </div>
  );
}

function Picture() {
  return (
    <div className='flex flex-col'>
      <div className='bg-white h-80 w-80 rounded-full self-center mb-4'>
        <p className='self-center text-center'>temporary</p>
      </div>
      <p className='text-white/70 self-center text-xl'>
        Anything you want to talk about?
      </p>
      <Link reloadDocument to='/contact-me'>
        <p className='font-bold text-white self-center text-center text-xl'>Contact me</p>
      </Link>
    </div>
  );
}

function ScrollHelper() {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const helper = document.getElementById('scroll-helper');
      helper.classList.add('opacity-0');
    }, {once: true});
  }, []);
  return (
    <div className='transition-opacity flex flex-col relative bottom-14 left-1/2 -translate-x-1/2 items-center' id='scroll-helper'>
      <p className='text-white/70 text-center mb-2'>
        -Scroll down-
      </p>
      <DownArrow animate />
      <DownArrow animate />
    </div>
  )
}

export function BulletPoint({text}) {
  return (
    <div className='flex flex-row mt-4'>
      <div className='flex flex-col mt-1.5'>
        <hr className='text-white/50 rotate-35 w-4' />
        <hr className='text-white/50 -rotate-35 w-4 mt-2' />
      </div>
      <p className='text-white ml-3'>
        {text}
      </p>
    </div>
  )
}
BulletPoint.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export function InfoSection({title, bulletPoints, options}) {
  if (typeof options === 'undefined') options = {mt: false, mb: false};
  return (
      <div className={'flex flex-row w-3/5 mx-auto ' + (options.mt ? 'mt-60' : 'mt-40') + (options.mb ? ' mb-40' : '')}>
        <p className='text-light-neon-green shrink-0 mr-8 text-xl'>{title}</p>
        <div className='mt-4'>
          <hr className='text-mid-dark-green w-auto -ml-2 -mr-2' />
          {bulletPoints.map((e, i) => {
            return (
              <BulletPoint key={i} text={e} className='mt-4 text-white' />
            );
          })}
        </div>
      </div>
  );
}

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  bulletPoints: PropTypes.array.isRequired,
  options: PropTypes.object,
}

function MainContent() {
  return (
    <>
      <InfoSection options={{ mt: true }} title="A little bit about me" bulletPoints={
        [
          'I currently live in Georgia and attend the Georgia Institute of Technology to pursue a Bachelor’s (and maybe a Master’s) degree in Computer Science.',
          'I enjoy learning new things and applying them to create meaningful applications.',
          ['Click ', <Link reloadDocument to='/about' className='font-bold' key='here-link'>here</Link>, ' to learn more.'],
        ]
      } />
      <InfoSection title="Projects I have worked on" bulletPoints={
        [
          'I am familiar with Java, Python, JavaScript and have worked on several projects, from web back-end, desktop applications, and AI/ChatGPT programs.',
          'These include an event planning website, a multithreaded image processing program, and an automatic Python code commenter.',
          ['Check out the ', <Link reloadDocument to='/projects' className='font-bold' key='projects-link'>Projects</Link>, ' tab for more information'],
        ]
      } />
      <InfoSection options={{ mb: true }}title='Hobbies I enjoy' bulletPoints={
        [
          'I love playing games, whether it’s a farming simulator or a competitive team game. Although my free time is shortening every day, I make sure to have a nice balance between work and having fun.',
          'I also regularly go to the gym. I like to make sure that I am mentally and physically healthy. Especially when I’m on the computer almost all day, I always make time to go outside or exercise.',
        ]
      } />
    </>
  );
}

export default App


/*
export function InfoSection({title, bulletPoints}) {
  return (
    <div className='absolute w-3/5 left-1/2 -translate-x-1/2 mt-40'>
      <p className='text-light-neon-green'>{title}</p>
      <div className=''>
        <hr className='text-mid-dark-green w-auto -mr-8 -ml-8' />
        {bulletPoints.map((e, i) => {
          return (
            <p key={i} className='mt-4 text-white'>
              {e}
            </p>
          );
        })}
      </div>
    </div>
  );
}
*/