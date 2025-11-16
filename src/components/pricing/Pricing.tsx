import { Check } from 'lucide-react'

export const Pricing = () => {
  return (
    <>
      {/* Simple Pricing */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple pricing
          </h2>
          <p className="text-gray-600 mb-12">Start free, upgrade as you grow</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Free Plan */}
            <div className="p-8 border-2 border-gray-200 rounded-2xl bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">$0</div>

              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Up to 3 team members</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Unlimited projects</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Basic bug tracking</span>
                </li>
              </ul>

              <button className="w-full py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                Get started free
              </button>
            </div>

            {/* Team Plan */}
            <div className="p-8 border-2 border-indigo-600 rounded-2xl bg-white relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">Team</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $12<span className="text-lg text-gray-500">/member/mo</span>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Unlimited team members</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Advanced workflows</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Priority support</span>
                </li>
              </ul>

              <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                Start 14-day trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
