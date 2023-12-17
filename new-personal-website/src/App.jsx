import './App.css'

function App() {
  return (
    <>
      <div className='flex flex-row justify-around items-center'>
        <Title />
        <Picture />
      </div>
      <ScrollHelper />
    </>
  )
}

function Title() {
  return (
    <div className='w-2/5 h-3/5 ml-24 mt-40 flex flex-col'>
      <p className="text-5xl text-white mb-8">
      Hello 👋, <br />
      my name is Timothy Sung. <br />
      Welcome to my Website!
      </p>
      <hr className='mb-2 border-dark-green'/>
      <hr className='ml-4 mr-4 mb-8 border-dark-green'/>
      <p className='text-neon-green self-center mb-8'>
        Software Developer
      </p>
      <p className='text-white/70 self-center'>
        I make Full Stack web applications and enjoy learning all things AI, cloud, or computer-related.
      </p>
    </div>
  );
}

function Picture() {
  return (
    <div className='flex flex-col'>
      <div className='bg-white h-40 w-40 rounded-full self-center'>
        temporary
      </div>
      <p className='text-white/70 self-center'>
        Anything you want to talk about?
      </p>
      <p className='font-bold text-white self-center'>Contact me</p>
    </div>
  );
}

function ScrollHelper() {
  return (
    <div className='flex flex-col absolute bottom-6 left-1/2 -translate-x-1/2 items-center'>
      <p className='text-white/70 text-center mb-3'>
        -Scroll down-
      </p>
      <DownArrow />
      <DownArrow />
    </div>
  )
}

function DownArrow() {
  return (
    <div className='animate-bounce'>
      <div className='flex flex-row mb-2'>
        <hr className='text-white/50 rotate-45 w-6' />
        <hr className='text-white/50 -rotate-45 w-6 -ml-2' />
      </div>
    </div>
  )
}

export function InfoSection({title, bulletPoints}) {
  return (
    <>
      <div className='flex flex-row'>
        <p className='text-light-neon-green'>{title}</p>
        <hr className='text-mid-dark-green' />
      </div>
    </>
  );
}

export default App