import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("mqazkkgl");

  if (state.succeeded) {
    return <p className="mt-4 text-center">Thanks for your message!</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orangePeel"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orangePeel"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orangePeel"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-pumpkin hover:bg-safetyOrange text-white font-bold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Connect with Me</h2>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/ndungu-kinyanjui-581976281/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pumpkin hover:text-safetyOrange"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/MaVeN-13TTN"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pumpkin hover:text-safetyOrange"
          >
            GitHub
          </a>
          <a
            href="https://x.com/Maven_TTN?t=J16KvC5RlQVFdoAWmIFEhQ&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pumpkin hover:text-safetyOrange"
          >
            X
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p>Email: kinyanjuindungu1324@gmail.com</p>
        <p>Location: Nairobi, Kenya</p>
      </div>
    </div>
  );
};

export default Contact;
