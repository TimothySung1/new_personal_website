import Title from "../components/Title";
import PropTypes from 'prop-types';

function Projects() {
  return (
    <div>
      <Title text={'Projects'} />
      <div className="text-white text-xl ml-32">
        <p>
          Here are some projects that I have worked on or am currently working on!
        </p>
      </div>
    </div>
  )
}

// css conic gradient or gradients is general
function Card({title, description, link}) {
  return (
    <div>

    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default Projects;