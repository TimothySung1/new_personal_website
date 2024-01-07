import Title from "../components/Title";
import PropTypes from 'prop-types';
import DownArrow from "../components/DownArrow";
import { useState } from "react";

function Projects() {
  return (
    <>
      <Title text={'Projects'} />
      <div className="text-white text-xl mx-4 lg:ml-32 mb-32 lg:text-left text-center">
        <p>
          Here are some projects that I have worked on or am currently working on!
        </p>
        <p>
          Click on the <span className="text-light-neon-green">Project Title</span> to go to its link.
        </p>
      </div>
      <CardSection />
    </>
  )
}

// TODO: have 2 cards, one dummy one visual. on index switch, set background/invisible card to have updated info
// then change opacity on front and back with transition
// similar method to dot transitions
// add date that I worked on them ?
function CardSection() {
  const [index, setIndex] = useState(0);

  const setIndexHandler = (index) => {
    setIndex(index);
  }

  const data = [
    {
      title: 'Group Planning',
      description: `With social networks becoming increasingly complex, planning events with a group of people has become ever so challenging.
      This web app was made to easily invite people to events and create groups to plan ahead. I worked on both the React.js frontend and the Node.js, Express.js and MongoDB backend.
      During this project with Georgia Tech's Web Development Club, I gained familiarity with API endpoints and database management, as I created my own endpoints and accessed others to communicate between 
      the user, database, and Google Calendar.`,
      url: 'https://github.com/GT-WebDev-Group-Planning/group-planning',
    },
    {
      title: 'Code Commenter',
      description: `My interest in AI and LLMs, like OpenAI's ChatGPT, grew exponentially. As such, I wanted to develop an AI code commenter
      which can easily explain complex or muddled code. So, I created this program on Python, which uses ChatGPT's API to create comments for Python code, 
      which can then be converted into HTML Sphinx documentation in one seemless execution. It is a relatively short project, but it introduced me to the
      extremely large world of AI, as well as APIs.`,
      url: 'https://github.com/TimothySung1/OpenAICodeComment',
    },
    {
      title: 'Multithreaded Image Processor',
      description: `To get one step deeper into creating effective and efficient programs, I decided to dive into the sea of multithreading.
      Here, I developed a multithreaded image processing application using just Java and JavaFX. Instead of relying on slow websites or large
      desktop applications, this program is simple and lightweight, allowing users to apply various simple transformations to any image. Such
      features include grayscale, contrast, rotations, and inversions.`,
      url: 'https://github.com/TimothySung1/parallel_image_processing/blob/main/src/imageprocessing/ParallelIP.java',
    }
  ];

  const length = data.length;

  return (
    <div className="flex flex-col items-center mt-12 mb-20">
      <div className={"rotate-180 mb-2 transition-opacity duration-300" + (index === 0 ? ' opacity-0 pointer-events-none' : '')}>
        <DownArrow thick scale clickHandler={() => setIndexHandler(index - 1)} />
      </div>
      <div className="relative">
        <Card 
          title={data[index].title}
          description={data[index].description}
          url={data[index].url}
          absolute={false}
          transparent={false}
        />
        {/* <Card
          title={data[prevIndex].title}
          description={data[prevIndex].description}
          url={data[prevIndex].url}
          absolute
          transparent
        /> */}
        <div className="absolute top-1/2 -translate-y-1/2 lg:-right-12 -right-10">
          <Dots count={length} index={index} setIndexHandler={setIndexHandler} />
        </div>
      </div>
      
      <div className={"mt-2 transition-opacity duration-300" + (index === length - 1 ? ' opacity-0 pointer-events-none' : '')}>
        <DownArrow thick scale clickHandler={() => setIndexHandler(index + 1)} />
      </div>
    </div>
  )
}

function Card({title, description, url, transparent, absolute}) {
  return (
    <div className={"transition-opacity duration-[350ms] lg:w-[900px] sm:w-[560px] w-[360px] lg:h-[325px] h-fit border border-white rounded-xl mx-auto py-8 px-2 sm:px-4" + (absolute ? ' absolute top-0' : '') + (transparent ? ' opacity-0 pointer-events-none': '')}>
      <div className="flex flex-row justify-center lg:block">
        <a href={url} target="_blank" rel="noreferrer" className="lg:text-left text-center text-2xl lg:text-3xl text-light-neon-green mx-auto lg:ml-16 hover:text-neon-green/80 transition">
          {title}
        </a>
      </div>
      
      <hr className="mt-4 mx-8 border-none h-[2px] bg-mid-dark-green" />
      <p className="mt-6 mx-12 text-white/80">{description}</p>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  transparent: PropTypes.bool,
  absolute: PropTypes.bool,
}

function Dots({count, index, setIndexHandler}) {
  return (
    <div className="ml-8 border-2 border-white rounded-full px-1">
      {
        new Array(count).fill(0).map((_, i) => 
          <div key={i} className={"cursor-pointer border border-white my-2 w-4 h-4 rounded-full transition ease-in-out duration-300 hover:bg-white/75 " + (index === i ? ' bg-white/70' : 'bg-gray')}
            onClick={() => setIndexHandler(i)}
          ></div>
        )
      }
    </div>
  )
}

Dots.propTypes = {
  count: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  setIndexHandler: PropTypes.func.isRequired,
}

export default Projects;