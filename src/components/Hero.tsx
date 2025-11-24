// import packages 
import { useState } from "react";
import { ArrowRight } from "lucide-react";
// import images 
import heroImg from "../assets/images/hero-img.png"; 

export const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for your interest! We'll contact ${email} soon.`);
    setEmail("");
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

      {/* heading  */}
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
        Project management
        <br />
        <span className="text-blue-600">made simple</span>
      </h1>

      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Track tasks and bugs in one place. Built for small teams who want to ship fast.
      </p>

      {/* email form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
      >
        <input
          type="email"
          value={email}
          required
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get started
          <ArrowRight className="ml-2 w-5 h-5" /> {/* right arrow icon  */}
        </button>
      </form>

      <p className="text-sm text-gray-500">Free for teams up to 3 members</p>

      {/* preview img of product */}
      <div className="mt-16 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
        <img
          src={heroImg}
          alt="Project board preview"
          className="w-full h-auto object-cover"
        />
      </div>

    </section>
  );
};
