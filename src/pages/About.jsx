import AboutCanvas from "../components/AboutCanvas";
import Title from "../components/Title";

function About() {
  return (
    <>
      <AboutCanvas />
      <Title text={'About me'}/>
      <div className="">
        <div className="bg-black/50 text-white sm:text-left text-ellipsis text-xl w-[85%] sm:w-45% mx-auto sm:ml-32 sm:mr-auto mb-8 py-4 px-6 rounded-lg">
          <p className="mb-4">
            Hello, my name is <span className="font-bold underline">Timothy Sung</span>, and I am a student at <span className="font-bold text-[#B3A369] underline">Georgia </span> <span className="font-bold text-[#1D4769] underline">Tech</span>.
            My love for computer science stemmed from my interest in video games,
            which started several years ago. Despite my misconception that coding
            would allow me to instantly program any game (and that it would be as
            fun as playing), I continued to pursue software engineering.
          </p>
          <p className="mb-4">
          Now, I develop website applications, from <span className="font-bold underline">frontend</span> to <span className="font-bold underline">backend</span>, and I have
          experience in mobile and general program development. I always look for
          new tools and frameworks to use, so I can expand my skillset to eventually
          be able to learn and create anything I want. 
          </p>
          <p className="mb-4">
            The latest in my software engineering journey is to develop a nice looking personal website,
            which is this. Last Summer, I worked on <span className="font-bold underline">algorithms and problem solving</span>, as well as <span className="font-bold underline">AI</span>, which
            included both learning fundamental mathematical theory and practical application. Now, I am
            diving back into creating practical applications, from start to finish. 
          </p>
          <p>
          For the future, I would love to learn how to create desktop programs or VR/AR applications.
          I looked into Unity with C# a little bit before, so I might dive back into refreshing my knowledge
          on that, as well as dive into Unreal Engine or .NET for more general purpose software.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;