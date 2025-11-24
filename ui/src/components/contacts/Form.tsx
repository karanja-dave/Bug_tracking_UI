import { motion } from "framer-motion";
import React from "react";

export type Category =
  | "technical"
  | "pricing"
  | "general"
  | "feedback"
  | "feature"
  | "partnerships";

interface ModalFormProps {
  open: boolean;
  category: Category | undefined;
  onClose: () => void;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  open,
  category,
  onClose,
}) => {
  if (!open) return null;

  const titles: Record<Category, string> = {
    technical: "Technical Support",
    pricing: "Pricing & Account",
    general: "General Questions",
    feedback: "Share Feedback",
    feature: "Feature Suggestion",
    partnerships: "Partnership Inquiry",
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {category ? titles[category] : "Contact Us"}
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Write your message here..."
              className="w-full border rounded-lg px-3 py-2"
            ></textarea>
          </div>

          <button
            type="button"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Close button */}
        <button
          className="mt-4 text-gray-600 hover:underline w-full text-center"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};
