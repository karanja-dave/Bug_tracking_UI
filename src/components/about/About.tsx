import { Footer } from "../footer/Footer";
import { Navbar } from "../nav/Navbar";

export const About = () => {
  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-20 space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-blue-600 font-semibold uppercase tracking-wider">
            About Us
          </h3>
          <h2 className="text-4xl font-bold mt-2">
            Built to Help Teams Move Faster
          </h2>
          <p className="text-gray-600 mt-4">
            Our platform empowers teams to manage projects, track bugs, and stay
            organized with a clean and intuitive interface. Whether you're a solo
            developer or a growing team, we give you tools to plan, execute, and
            deliver with confidence.
          </p>
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              We aim to simplify project management by giving teams a workspace
              where tasks, bugs, and goals stay together. No clutter, no
              confusion, just a clean flow from planning to execution.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow">
            <div className="bg-blue-100 h-48 flex items-center justify-center text-blue-700 font-semibold text-xl">
              Mission Image
            </div>
          </div>
        </div>

        {/* Why Us */}
        <section>
          <h3 className="text-3xl font-bold text-center mb-8">Why Us?</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded-xl text-center">
              <h4 className="text-xl font-bold mb-2">Simple</h4>
              <p className="text-gray-600">
                Everything is designed to be clean, clear, and easy to use.
              </p>
            </div>

            <div className="p-6 bg-white shadow rounded-xl text-center">
              <h4 className="text-xl font-bold mb-2">Organized</h4>
              <p className="text-gray-600">
                Tasks, bugs, and updates all live in one simple workspace.
              </p>
            </div>

            <div className="p-6 bg-white shadow rounded-xl text-center">
              <h4 className="text-xl font-bold mb-2">Fast</h4>
              <p className="text-gray-600">
                Get more done with a lightweight interface built for speed.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h3 className="text-3xl font-bold text-center mb-8">How It Works</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border shadow-sm rounded-xl text-center">
              <h4 className="text-xl font-semibold">1. Create a Project</h4>
              <p className="text-gray-600 mt-2">
                Start by setting up your workspace in seconds.
              </p>
            </div>

            <div className="p-6 bg-white border shadow-sm rounded-xl text-center">
              <h4 className="text-xl font-semibold">2. Add Tasks & Bugs</h4>
              <p className="text-gray-600 mt-2">
                Keep everything organized and easy to follow.
              </p>
            </div>

            <div className="p-6 bg-white border shadow-sm rounded-xl text-center">
              <h4 className="text-xl font-semibold">3. Track Progress</h4>
              <p className="text-gray-600 mt-2">
                See updates clearly and finish work faster.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-10">
          <h3 className="text-2xl font-bold mb-3">Ready to get started?</h3>
          <p className="text-gray-600 mb-6">Join teams who run smoother with our workspace.</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

      </section>

      <Footer />
    </>
  );
};







