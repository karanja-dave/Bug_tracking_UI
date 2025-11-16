import { ArrowRight } from "lucide-react"
import { Navbar } from "../components/nav/Navbar"
import { Hero } from "../components/Hero"
import { Features } from "../components/features/Features"
import { FooterInfo } from "../components/footer/FooterInfo"

export const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Features/>
        {/* Final CTA */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-indigo-100 mb-8">
              Join teams shipping faster with Velocity
            </p>
            <button className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Start free trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </section>
        <FooterInfo/>
    </div>
  )
}
