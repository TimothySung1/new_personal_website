import '../App.css';
import { InfoSection } from '../App';

export default function Test() {
  return (
    <div>
      <InfoSection title="A little bit about me" bulletPoints={
        [
          'I currently live in Georgia and attend the Georgia Institute of Technology to pursue a Bachelor’s (and maybe a Master’s) degree in Computer Science.',
          'I enjoy learning new things and applying them to create meaningful applications.',
          'Click <link>here</link> to learn more.'
        ]
      } />
    </div>
  );
}