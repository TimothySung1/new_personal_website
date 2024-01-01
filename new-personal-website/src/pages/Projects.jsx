import Title from "../components/Title";
import PropTypes from 'prop-types';
import DownArrow from "../components/DownArrow";

function Projects() {
  return (
    <div>
      <Title text={'Projects'} />
      <div className="text-white text-xl ml-32 mb-32">
        <p>
          Here are some projects that I have worked on or am currently working on!
        </p>
      </div>
      <CardSection />
    </div>
  )
}

function CardSection() {
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="rotate-180 mb-2">
        <DownArrow />
      </div>
      <div className="relative">
        <Card 
          title='Project Title'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at lacus nunc. Sed laoreet, ex id vulputate tincidunt, magna libero tempus lacus, quis laoreet dolor erat nec enim. Aenean sodales ligula consequat tellus mollis, eu convallis dolor vulputate. In a bibendum urna. Duis at suscipit mi. Suspendisse potenti. Nulla varius fringilla sagittis. Curabitur porttitor commodo finibus. Sed consequat justo non quam sollicitudin, facilisis bibendum justo viverra. Donec maximus, magna nec lobortis convallis, nisl erat porta orci, vitae porttitor magna augue nec lacus. Donec auctor aliquam ipsum quis fringilla. Aenean id sagittis lectus, in venenatis odio. Phasellus et sem lacinia nisl gravida lobortis.'
          url='https://github.com'
        />
        <div className="absolute top-1/2 -translate-y-1/2 -right-12">
          <Dots count={5} index={0} />
        </div>
      </div>
      
      <div className="mt-2">
        <DownArrow />
      </div>
    </div>
  )
}

function Card({title, description, url}) {
  console.log(url);
  return (
    <div className="w-[950px] h-[300px] border border-white rounded-xl mx-auto pt-4">
      <p className="text-3xl text-light-neon-green ml-16 mt-6">{title}</p>
      <hr className="mt-4 mx-8 border-none h-[2px] bg-mid-dark-green" />
      <p className="mt-6 mx-12 text-white/80">{description}</p>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

function Dots({count, index}) {
  return (
    <div className="ml-8 border-2 border-white rounded-full px-1">
      {
        new Array(count).fill(0).map((_, i) => 
          <div key={i} className={"border border-white my-2 w-4 h-4 rounded-full " + (index === i ? ' bg-gray' : 'bg-white/70')}></div>
        )
      }
    </div>
  )
}

Dots.propTypes = {
  count: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

export default Projects;