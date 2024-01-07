import { Link } from 'react-router-dom';
import './App.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import MainCanvas from './components/MainCanvas';
import Loading from './components/Loading';
import DownArrow from './components/DownArrow';
import waving from './assets/waving.png';
import me from './assets/me1.jpg';

// TODO: make info sections wider (vertically) spaced, and make text larger
// TODO: add threejs stuff
// for about me, when mouse hover name or gt, make particles form the words or my image (is this possible?)

function App() {
  const [showbg, setShowbg] = useState(() => (function(a){
    return !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) 
  })(navigator.userAgent||navigator.vendor||window.opera));

  const setShowbgHandler = (showbg) => setShowbg(showbg);

  return (
    <>
      {showbg && <Loading />}
      {showbg && <MainCanvas />}
      <div className='flex flex-col lg:flex-row lg:mx-[10%] justify-between items-center lg:items-start lg:mt-72 sm:h-[120vh] h-auto lg:h-[100vh] lg:my-0 sm:mt-60 mt-[25vh]'>
        <Title setShowbgHandler={setShowbgHandler} showbg={showbg} />
        <Picture />
      </div>
      {(function(a){
        return !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) 
      })(navigator.userAgent||navigator.vendor||window.opera)
        && <ScrollHelper />}
      <MainContent />
    </>
  )
}

function Title({setShowbgHandler, showbg}) {
  return (
    <div className='w-[65%] lg:w-[50%] flex flex-col'>
      <p className="text-3xl sm:text-7xl text-white mb-8 lg:text-left text-center">
      Hello<img src={waving} alt="emoji" className='h-8 sm:h-16 inline-block align-top ml-2' />, <br />
      my name is Timothy Sung. <br />
      Welcome to my Website!
      </p>
      <hr className='mb-2 border-dark-green shadow shadow-dark-green'/>
      <hr className='ml-4 mr-4 mb-8 border-dark-green shadow shadow-dark-green'/>
      <p className='text-neon-green self-center mb-8 text-lg sm:text-2xl'>
        Software Developer
      </p>
      <p className='text-white/70 self-center text-base sm:text-xl text-center'>
        I make Full Stack web applications and enjoy learning all things AI, cloud, or computer-related.
      </p>
      <div className='cursor-pointer w-[190px] sm:w-fit self-center mt-4' onClick={() => setShowbgHandler(!showbg)}>
        <input type="checkbox" className='inline-block align-middle bg-white border-none h-3 w-3 sm:h-4 sm:w-4 cursor-pointer' checked={showbg} readOnly />
        <p className='inline-block text-neon-green font-bold ml-4 align-middle text-sm sm:text-base select-none'>
          Toggle 3D Background
        </p>
      </div>
    </div>
  );
}

Title.propTypes = {
  setShowbgHandler: PropTypes.func.isRequired,
  showbg: PropTypes.bool.isRequired,
}

function Picture() {
  return (
    <div className='flex flex-col'>
      <div className='bg-white h-60 w-60 sm:h-80 sm:w-80 rounded-full self-center mb-4 lg:mt-0 mt-20'>
        <img src={me} alt="My picture" className='h-[14.5em] sm:h-[19.5em] rounded-full m-auto my-1' />
      </div>
      <p className='text-white/70 self-center text-base sm:text-xl'>
        Anything you want to talk about?
      </p>
      <Link reloadDocument to='/contact-me'>
        <p className='font-bold text-white self-center text-center text-base sm:text-xl'>Contact me</p>
      </Link>
    </div>
  );
}

function ScrollHelper() {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const helper = document.getElementById('scroll-helper');
      helper.classList.add('opacity-0');
      helper.classList.remove('opacity-50');
    }, {once: true});
  }, []);
  return (
    <div className='transition-opacity flex flex-col left-1/2 -translate-x-1/2 items-center absolute top-[90vh] opacity-50' id='scroll-helper'>
      <p className='text-white/70 text-center mb-2'>
        -Scroll down-
      </p>
      <div className='-mt-2'>
        <DownArrow animate />
        <DownArrow animate />
      </div>

    </div>
  )
}

export function BulletPoint({text}) {
  return (
    <div className='flex flex-row mt-4 sm:ml-0 -ml-40'>
      <div className='flex flex-col mt-1.5'>
        <hr className='text-white/50 rotate-35 w-4' />
        <hr className='text-white/50 -rotate-35 w-4 mt-2' />
      </div>
      <p className='text-white ml-3 sm:text-base text-sm'>
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
      <div className={'flex flex-row w-[95%] mx-4 sm:mx-auto lg:w-1/2 ' + (options.mt ? 'mt-60' : 'mt-40') + (options.mb ? ' mb-40' : '')}>
        <p className='text-light-neon-green shrink-0 mr-8 text-base lg:text-xl'>{title}</p>
        <div className='mt-4'>
          <hr className='text-mid-dark-green w-full lg:w-auto -ml-2 -mr-2' />
          {bulletPoints.map((e, i) => {
            return (
              <BulletPoint key={i} text={e} />
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