import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";

const Contact = () => {
  const [state, handleSubmit] = useForm("mqazkkgl");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (state.succeeded) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center text-2xl font-maven text-orange-peel"
      >
        Thanks for your message!
      </motion.p>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-titan text-princeton-orange mb-8"
      >
        Contact Me
      </motion.h1>
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <label
            htmlFor="name"
            className="block mb-2 font-maven text-orange-peel"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 bg-persian-indigo text-orange-peel border border-tekhelet rounded-md focus:outline-none focus:ring-2 focus:ring-princeton-orange"
          />
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            className="text-pumpkin"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <label
            htmlFor="email"
            className="block mb-2 font-maven text-orange-peel"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 bg-persian-indigo text-orange-peel border border-tekhelet rounded-md focus:outline-none focus:ring-2 focus:ring-princeton-orange"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-pumpkin"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <label
            htmlFor="message"
            className="block mb-2 font-maven text-orange-peel"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            className="w-full px-4 py-2 bg-persian-indigo text-orange-peel border border-tekhelet rounded-md focus:outline-none focus:ring-2 focus:ring-princeton-orange"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-pumpkin"
          />
        </motion.div>
        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={state.submitting}
          className="bg-pumpkin hover:bg-safety-orange text-russian-violet font-maven font-bold py-2 px-6 rounded-md transition-smooth"
        >
          Send Message
        </motion.button>
      </motion.form>

      <motion.div variants={itemVariants} className="mt-12">
        <h2 className="text-2xl font-titan text-princeton-orange mb-4">
          Contact Information
        </h2>
        <p className="font-maven text-orange-peel">
          Email: kinyanjuindungu1324@gmail.com
        </p>
        <p className="font-maven text-orange-peel">Location: Nairobi, Kenya</p>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
