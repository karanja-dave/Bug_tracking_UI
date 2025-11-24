import { Zap, Bug, Users, Calendar} from 'lucide-react'; // for icons 


export const Features = () => {
    // ask Kemboi kama we should have this data in a json file 
    const features = [
    {
      icon: Zap,
      title: "Quick Tasks",
      description: "Create and assign tasks in seconds"
    },
    {
      icon: Bug,
      title: "Bug Tracking",
      description: "Track and fix bugs faster"
    },
    {
      icon: Users,
      title: "Team Sync",
      description: "Keep everyone on the same page"
    },
    {
      icon: Calendar,
      title: "Sprint Planning",
      description: "Plan work in organized sprints"
    }
  ];

  return (
    <div>
      {/* features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything you need to start
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* list rendering  */}
            {features.map((feature, index) => {
              const Icon = feature.icon;// loop through each icon 

              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-blue-600 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
