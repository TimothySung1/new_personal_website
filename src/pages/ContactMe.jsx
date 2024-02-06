import Title from "../components/Title";
import linkedin from '../assets/LI-In-Bug.png';
import github from '../assets/github-mark.svg';
import mail from '../assets/mail.png';
import { useState } from "react";


function ContactMe() {
  return (
    <div className="mb-20">
      <Title text={'Contact Me'}/>
      <div className="text-white text-xl lg:ml-32 mb-32 lg:text-left text-center sm:mx-0 mx-2">
        <p>
          Feel free to contact me or look through my projects through the icons on the right.
        </p>
        <p>
          You can also send me a message by filling the form down below!
        </p>
      </div>
      <div className="flex flex-col items-center justify-between">
        <p className="text-white text-2xl font-bold text-center">
          Send Me a Message
        </p>
        <hr className="border-none h-[2px] bg-neon-green w-[276px] mx-auto"/>
        <hr className="mt-1 border-none h-[2px] bg-light-neon-green w-60 mx-auto mb-16"/>
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
    <form onSubmit={sendEmail} className="bg-gradient-to-b from-gray to-black px-6 py-2 rounded-lg">
      <div className="mb-10 relative lg:w-[700px] h-[540px] sm:h-[410px] w-[340px] sm:w-[500px] min-w-[340px] sm:min-w-[500px] sm:block flex flex-col">
        <div className="flex flex-col items-start sm:absolute">
          <p className=" text-neon-green font-bold">Name: </p>
          <input placeholder="Enter your name" type="text" name="name" className="h-8 px-2 rounded mt-2 sm:w-auto w-full"/>
        </div>
        <div className="flex flex-col items-start sm:absolute sm:right-0 sm:mt-0 mt-8">
          <p className=" text-neon-green font-bold">Email (optional): </p>
          <input placeholder="Enter your email" type="text" name="email" className="h-8 px-2 rounded sm:w-[256px] mt-2 w-full"/>
        </div>
        <div className="flex flex-col items-start sm:absolute sm:bottom-0 sm:mt-0 mt-8">
          <p className=" text-neon-green font-bold mb-3">Message</p>
          <textarea placeholder="Your message here..." type="text" name="message" className="py-4 px-6 lg:w-[700px] sm:w-[500px] w-full sm:h-[200px] h-[250px] resize-none rounded mb-4"/>
          <button type="submit" className={"self-center text-white font-bold text-xl border-2 px-4 py-2 rounded-2xl transition-colors hover:bg-gray" + (state.pending ? ' bg-gray text-white/70' : '')} disabled={state.pending}>
            {state.pending ? 'Sending...' : 'Send'}
          </button>
        </div>
        {
          !state.pending && state.success && <p className="text-light-neon-green absolute -bottom-10 left-1/2 -translate-x-1/2 font-bold -mr-[100%]">Message sent successfuly</p>
        }
        {
          !state.pending && state.error && <p className="absolute -bottom-[40px] left-1/2 -translate-x-1/2 text-red-700 w-[350px] text-center font-bold">{state.error}</p>
        }
        {
          !state.pending && !state.validName && <p className="absolute left-0 top-[66px] sm:top-[70px] text-red-700 underline">Please enter your name</p>
        }
        {
          !state.pending && !state.validEmail && <p className="absolute left-0 sm:left-auto sm:right-0 top-[164px] sm:top-[70px] text-red-700 underline">Please enter a valid email address</p>
        }
        {
          !state.pending && !state.validMsg && <p className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 -bottom-[40px] sm:bottom-8 text-red-700 underline sm:w-auto w-full text-center sm:text-left">Please enter a message</p>
        }
      </div>
    </form>
  )
}

function Socials() {
  return (
    <div className="lg:mt-0 mt-4 lg:fixed lg:right-10 lg:top-1/2 lg:-translate-y-1/2 h-fit py-4 lg:py-[30px] w-[260px] lg:w-fit bg-gray rounded-full border-4 border-neon-green">
      <div className="flex flex-row lg:flex-col justify-center items-center h-full">
        <div className="relative">
          <a href="https://www.linkedin.com/in/t-sung/" target="_blank" rel='noreferrer' className="relative z-10">
            <img src={linkedin} alt="linkedin" className="w-12 lg:ml-2 hover:brightness-150 transition" />
          </a>
          <div className="absolute top-1 bg-white h-8 ml-[1px] w-8 lg:w-9 lg:left-2 left-1"></div>
        </div>
        <a href="https://github.com/TimothySung1" target="_blank" rel='noreferrer'>
          <img src={github} alt="github" className="w-12 lg:my-4 mx-4 brightness-[1.8] hover:invert transition" />
        </a>
        <a href="mailto:tsung333@gmail.com" target="_blank" rel='noreferrer'>
          <img src={mail} alt="email" className="w-12 brightness-125 hover:invert transition" />
        </a>
      </div>
    </div>
  )
}

export default ContactMe;