import { Navbar } from "../nav/Navbar";
import { Footer } from "../footer/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { ModalForm } from "./Form";
import type { Category } from "./Form"; // <-- add this


export const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  const openForm = (type:Category) => {
    setCategory(type);
    setModalOpen(true);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 py-20"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Get in Touch</h1>
          <p className="text-gray-600 text-lg">
            Whether you need help or want to share an idea, we’re here for you.
          </p>
        </div>
      </motion.section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-16">

        {/* First Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-12"
        >
          {/* Technical Support */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">Technical Support</h3>
            <p className="text-gray-600">Having trouble using Hive? We’re here to help.</p>

            <button
              onClick={() => openForm("technical")}
              className="mt-6 px-5 py-2 text-gray-800 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Ask for Help
            </button>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">Pricing & Account</h3>
            <p className="text-gray-600">Need help with your subscription or plan?</p>

            <button
              onClick={() => openForm("pricing")}
              className="mt-6 px-5 py-2 text-gray-800 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Contact Team
            </button>
          </div>

          {/* General Questions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">General Questions</h3>
            <p className="text-gray-600">Have a question or just want to say hi?</p>

            <button
              onClick={() => openForm("general")}
              className="mt-6 px-5 py-2 text-gray-800 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Reach Out
            </button>
          </div>
        </motion.div>

        {/* Second Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-12"
        >

          {/* Feedback */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">Share Feedback</h3>
            <p className="text-gray-600">Tell us your thoughts about Hive.</p>

            <button
              onClick={() => openForm("feedback")}
              className="mt-6 px-5 py-2 text-gray-800 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Send Feedback
            </button>
          </div>

          {/* Feature Requests */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">Feature Suggestions</h3>
            <p className="text-gray-600">Have an idea that could make Hive better?</p>

            <button
              onClick={() => openForm("feature")}
              className="mt-6 px-5 py-2 text-gray-800 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Suggest Feature
            </button>
          </div>

          {/* Partnerships */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">Partnerships</h3>
            <p className="text-gray-600">Interested in working with us?</p>

            <button
              onClick={() => openForm("partnerships")}
              className="mt-6 px-5 py-2 text-gray-800 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Contact Partnerships
            </button>
          </div>

        </motion.div>
      </section>

      {/* Modal Form */}
      <ModalForm
        open={modalOpen}
        category={category}
        onClose={() => setModalOpen(false)}
      />

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-4 py-16"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {/* Q1 */}
          <div tabIndex={0} className="collapse collapse-arrow border border-gray-200 rounded-box">
            <div className="collapse-title text-lg font-medium">
              What problems does an issue tracking system solve?
            </div>
            <div className="collapse-content text-gray-600">
              An issue tracker helps teams never lose sight of bugs, feature requests, and general tasks. It provides a centralized system where you can prioritize issues, assign them to the right people, and track their status from open → in progress → resolved.
            </div>
          </div>

          {/* Q2 */}
          <div tabIndex={0} className="collapse collapse-arrow border border-gray-200 rounded-box">
            <div className="collapse-title text-lg font-medium">
              Can bug trackers be used for non‑technical tasks?
            </div>
            <div className="collapse-content text-gray-600">
              Yes — bug tracking systems are often used for tasks beyond programming. Teams use them for documentation, design tasks, project workflows, and general task management.
            </div>
          </div>

          {/* Q3 */}
          <div tabIndex={0} className="collapse collapse-arrow border border-gray-200 rounded-box">
            <div className="collapse-title text-lg font-medium">
              How do you decide which bugs to fix first?
            </div>
            <div className="collapse-content text-gray-600">
              Prioritisation is key. You should consider the bug’s severity, frequency, impact on users, and whether it blocks other functionality. Good bug‑tracking systems let you assign priorities (e.g., critical, major, minor).
            </div>
          </div>

          {/* Q4 */}
          <div tabIndex={0} className="collapse collapse-arrow border border-gray-200 rounded-box">
            <div className="collapse-title text-lg font-medium">
              How long will it take for a bug to be resolved?
            </div>
            <div className="collapse-content text-gray-600">
              This depends on the bug's complexity, its priority, and how many bugs are in the backlog. Some systems track bug history, developer workload, and dependencies to estimate resolution time.
            </div>
          </div>

          {/* Q5 */}
          <div tabIndex={0} className="collapse collapse-arrow border border-gray-200 rounded-box">
            <div className="collapse-title text-lg font-medium">
              What happens if a bug is rarely reported or hard to reproduce?
            </div>
            <div className="collapse-content text-gray-600">
              Not all bugs can be fixed immediately. Some may be marked as "known issues" if they occur infrequently or require significant work to reproduce. Proper classification and regular backlog grooming help manage such bugs.
            </div>
          </div>

          {/* Q6 */}
          <div tabIndex={0} className="collapse collapse-arrow border border-gray-200 rounded-box">
            <div className="collapse-title text-lg font-medium">
              How do you ensure bug fixes really solve the root cause?
            </div>
            <div className="collapse-content text-gray-600">
              It’s important to ask critical questions: “Is this bug an isolated incident, or part of a bigger problem?” and “What’s the root cause?” This helps avoid superficial fixes and ensures lasting improvements.
            </div>
          </div>

          {/* Q7 */}
          <div tabIndex={0} className="collapse collapse-arrow border border-gray-200 rounded-box">
            <div className="collapse-title text-lg font-medium">
              How do you evaluate a bug‑tracking system when choosing one?
            </div>
            <div className="collapse-content text-gray-600">
              Key criteria include usability, reporting capabilities, integration with code or task management tools, security (role-based access), and automation workflows.
            </div>
          </div>

          {/* Q8 */}
          <div tabIndex={0} className="collapse collapse-arrow border border-gray-200 rounded-box">
            <div className="collapse-title text-lg font-medium">
              What are some disadvantages or potential downsides of issue tracking systems?
            </div>
            <div className="collapse-content text-gray-600">
              <ul className="list-disc pl-5 space-y-2">
                <li>If not managed properly, the bug list can grow so large that it's hard to address everything.</li>
                <li>Overhead: teams may spend a lot of time classifying, prioritizing, or discussing tickets instead of resolving them.</li>
                <li>Misuse: without a clear process, priorities might be misassigned, or metrics misinterpreted.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      

      <Footer />
    </>
  );
};
