import Title from "../components/Title";
import linkedin from '../assets/LI-In-Bug.png';
import github from '../assets/github-mark.svg';
import mail from '../assets/mail.png';
import { useState } from "react";


function ContactMe() {
  return (
    <div>
      <Title text={'Contact Me'}/>
      <div className="text-white text-xl ml-32 mb-32">
        <p>
          Feel free to contact me or look through my projects through the icons on the right.
        </p>
        <p>
          You can also send me a message by filling the form down below!
        </p>
      </div>
      <div className="relative">
        <p className="text-white text-2xl font-bold text-center">
          Send Me a Message
        </p>
        <hr className="border-none h-[2px] bg-neon-green w-[276px] mx-auto"/>
        <hr className="mt-1 border-none h-[2px] bg-light-neon-green w-60 mx-auto"/>
        <ContactForm />
        <Socials />
      </div>
      
    </div>
  )
}

function ContactForm() {
  const [state, setState] = useState({
    pending: false,
    error: null,
    success: false,
    validMsg: true,
    validName: true,
    validEmail: true,
  });
  async function sendEmail(event) {
    event.preventDefault();
    setState({
      pending: true,
      error: null,
      success: false,
      validMsg: true,
      validName: true,
      validEmail: true,
    });

    const newState = {
      pending: true,
      error: null,
      success: false,
      validMsg: true,
      validName: true,
      validEmail: true,
    };

    const message = event.target[2].value;
    const from_name = event.target[0].value;
    const from_email = event.target[1].value;

    if (message === '') {
      newState.validMsg = false;
    }
    if (from_name === '') {
      newState.validName = false;
    }
    if (!/^\S+@\S+\.\S+$/.test(from_email) && from_email !== '') {
      newState.validEmail = false;
    }

    if (newState.validEmail && newState.validName && newState.validMsg) {
      const data = {
        service_id: 'gmail_service',
        template_id: 'contact_template',
        user_id: 'WxEjvv2eRkr_AI_6f',
        template_params: {
          message,
          from_name,
          from_email
        }
      }
  
      try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          throw new Error('Error sending your message. Please try again or reach me from other contacts.');
        } else {
          newState.success = true;
          newState.error = null;
        }
      } catch(error) {
        newState.error = error.message;
        newState.success = false;
      }
    }
    
    newState.pending = false;
    setState(newState);
  }
  return (
    <form onSubmit={sendEmail} className="absolute left-1/2 -translate-x-1/2 top-20">
      <div className="mb-10 relative w-[700px] h-[410px]">
        <p className="inline-block text-neon-green absolute left-0 font-bold">Name: </p>
        <p className="inline-block text-neon-green absolute right-32 font-bold">Email (optional): </p>
        <p className="absolute text-neon-green left-0 top-28 font-bold">Message</p>
        <input placeholder="Enter your name" type="text" name="name" className="absolute left-0 top-8 h-8 px-2 rounded"/>
        <input placeholder="Enter your email" type="text" name="email" className="absolute right-0 top-8 h-8 px-2 rounded w-[256px]"/>
        <textarea placeholder="Your message here..." type="text" name="message" className="absolute left-0 top-36 py-4 px-6 w-[700px] h-[200px] resize-none rounded"/>
        <button type="submit" className={"absolute bottom-0 left-1/2 -translate-x-1/2 text-white font-bold text-xl border-2 px-4 py-2 rounded-2xl transition-colors hover:bg-gray" + (state.pending ? ' bg-gray text-white/70' : '')} disabled={state.pending}>
          {state.pending ? 'Sending...' : 'Send'}
        </button>
        {
          !state.pending && state.success && <p className="text-light-neon-green absolute -bottom-10 left-1/2 -translate-x-1/2 font-bold">Message sent successfuly</p>
        }
        {
          !state.pending && state.error && <p className="absolute -bottom-[55px] left-1/2 -translate-x-1/2 text-red-700 w-[350px] text-center font-bold">{state.error}</p>
        }
        {
          !state.pending && !state.validName && <p className="absolute left-0 top-[70px] text-red-700 underline">Please enter your name</p>
        }
        {
          !state.pending && !state.validEmail && <p className="absolute right-0 top-[70px] text-red-700 underline">Please enter a valid email address</p>
        }
        {
          !state.pending && !state.validMsg && <p className="absolute left-0 bottom-8 text-red-700 underline">Please enter a message</p>
        }
      </div>
    </form>
  )
}

function Socials() {
  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 h-[286px] w-20 bg-gray rounded-full border-4 border-neon-green">
      <div className="flex flex-col justify-center items-center h-full">
        <a href="https://www.linkedin.com/in/t-sung/" target="_blank" rel='noreferrer'>
          <img src={linkedin} alt="linkedin" className="w-12 ml-2 hover:brightness-150 transition" />
        </a>
        <a href="https://github.com/TimothySung1" target="_blank" rel='noreferrer'>
          <img src={github} alt="github" className="w-12 my-4 brightness-[1.8] hover:invert transition" />
        </a>
        <a href="mailto:tsung333@gmail.com" target="_blank" rel='noreferrer'>
          <img src={mail} alt="email" className="w-12 brightness-125 hover:invert transition" />
        </a>
      </div>
      <div className="w-8 h-8 bg-white absolute top-16 left-5 -z-10"></div>
    </div>
  )
}

export default ContactMe;