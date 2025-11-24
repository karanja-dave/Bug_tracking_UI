import { Navbar } from "../nav/Navbar";
import { Footer } from "../footer/Footer";

export const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      features: ["Up to 3 projects", "Basic support", "Community access"],
    },
    {
      name: "Pro",
      price: "$15/month",
      features: ["Unlimited projects", "Priority support", "Advanced analytics"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["All Pro features", "Dedicated account manager", "Custom integrations"],
    },
  ];

  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-20 space-y-12 text-center">
        {/* header  */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choose the plan that fits your team best. Simple, transparent pricing with no surprises.
          </p>
        </div>

        {/* pricing  */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-xl p-6 flex flex-col justify-between shadow hover:shadow-lg transition ${
                plan.popular ? "border-blue-600 bg-blue-50" : "bg-white"
              }`}
            >
              {plan.popular && (
                <span className="text-sm font-semibold text-blue-600 mb-2 uppercase">
                  Most Popular
                </span>
              )}

              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-3xl font-extrabold text-gray-900 my-4">{plan.price}</p>

              <ul className="mb-6 space-y-2 text-gray-700 text-left">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-auto py-2 rounded-lg font-medium ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                } transition`}
              >
                {plan.price === "Custom" ? "Contact Us" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};
