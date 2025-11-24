// import packages 
import { motion } from "framer-motion"; //for motion mvt in the component
import { CheckCircle, Bug, FolderKanban } from "lucide-react"; //for icons

// import images 
import taskIMG from "../../assets/images/task-image.png";
import bugIMG from "../../assets/images/bug-image.png";
import projectIMG from "../../assets/images/project-img.png";

export const FeaturesInfo = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 space-y-20">
      {/* intro sec */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h3 className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Features</h3>
        <h2 className="text-4xl font-bold mt-3">Everything you need to manage projects and track work effortlessly</h2>
        <p className="text-gray-600 mt-4">
          Organize tasks, squash bugs, manage milestones, and keep your entire team in sync.
          A single, intuitive workspace designed for speed, clarity, and seamless collaboration.
        </p>
      </div>

      {/* cards for features offered  */}
      <div className="space-y-24">
        {/* tasks */}
        <motion.div //elewa motion div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:gap-12 items-start"
        >
          {/* txt */}
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-600" /> {/* icon  */}
              <h2 className="text-2xl font-bold">Tasks</h2>
            </div>
            <p className="text-gray-600">
              Organize work effortlessly, assign tasks, set priorities, schedule hours, and 
              track progress from start to finish.
            </p>

            <ul className="text-gray-700 space-y-2 list-disc pl-5">
              <li>Set deadlines & work hours</li>
              <li>Automatic reminders</li>
              <li>Recurring tasks</li>
              <li>Real-time progress tracking</li>
            </ul>

            <button className="mt-4 text-blue-600 hover:underline font-medium">
              Learn more &rarr;
            </button>
          </div>

          {/* task img */}
          <div className="md:w-1/2 mt-6 md:mt-0 rounded-xl overflow-hidden shadow-lg dark:shadow-none dark:ring-1 dark:ring-gray-700">
            <img src={taskIMG} alt="Tasks feature preview" className="w-full" />
          </div>
        </motion.div>

        {/* bugs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row-reverse md:gap-12 items-start"
        >
          {/* txt */}
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center gap-2">
              <Bug className="w-6 h-6 text-red-600" /> {/*icon*/}
              <h2 className="text-2xl font-bold">Bug Tracking</h2>
            </div>
            <p className="text-gray-600">
              Capture issues instantly, prioritize them, and collaborate on fixes to maintain
              product quality.
            </p>
            <ul className="text-gray-700 space-y-2 list-disc pl-5">
              <li>Severity levels</li>
              <li>Developer & team assignment</li>
              <li>Workflow-based status control</li>
              <li>Attach screenshots & files</li>
            </ul>
            <button className="mt-4 text-blue-600 hover:underline font-medium">
              Learn more &rarr;
            </button>
          </div>

          {/* bug-img */}
          <div className="md:w-1/2 mt-6 md:mt-0 rounded-xl overflow-hidden shadow-lg dark:shadow-none dark:ring-1 dark:ring-gray-700">
            <img src={bugIMG} alt="Bug tracking preview" className="w-full" />
          </div>
        </motion.div>

        {/* project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:gap-12 items-start"
        >
          {/* txt */}
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-6 h-6 text-purple-600" /> {/*icon*/}
              <h2 className="text-2xl font-bold">Project Management</h2>
            </div>
            <p className="text-gray-600">
              Plan, monitor, and deliver projects with timelines, milestones, workload
              management, and automated tracking.
            </p>
            <ul className="text-gray-700 space-y-2 list-disc pl-5">
              <li>Milestones & timelines</li>
              <li>Team workload visibility</li>
              <li>Cross-project linking</li>
              <li>Automatic progress insights</li>
            </ul>
            <button className="mt-4 text-blue-600 hover:underline font-medium">
              Learn more &rarr;
            </button>
          </div>
          {/* Image */}
          <div className="md:w-1/2 mt-6 md:mt-0 rounded-xl overflow-hidden shadow-lg dark:shadow-none dark:ring-1 dark:ring-gray-700">
            <img src={projectIMG} alt="Project management preview" className="w-full" />
          </div>
        </motion.div>
        <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-semibold mb-4">Ready to streamline your workflow?</h3>
            <p className="text-gray-600 text-lg max-w-xl mx-auto mb-6">
            Bring your tasks, bugs, and projects together into one efficient and intuitive system.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Get Started
            </button>
            </div>
            
      </div>
    </section>
  );
};
