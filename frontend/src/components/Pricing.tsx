import { Link } from "react-router-dom";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      features: [
        "50 ad generations/month",
        "AI image & copywriting",
        "3 social platforms",
        "Basic analytics",
        "Email support"
      ],
      buttonText: "Get Started",
      buttonClass: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      borderClass: "border-2 border-gray-200 hover:border-blue-500",
      bgClass: "bg-gradient-to-br from-white/20 to-white/40 text-white"
      
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      popular: true,
      features: [
        "200 ad generations/month",
        "Advanced AI features",
        "All social platforms",
        "Advanced analytics",
        "Priority support",
        "Brand kit storage"
      ],
      buttonText: "Get Started",
      buttonClass: "bg-white text-blue-600 hover:bg-gray-100",
      bgClass: "bg-gradient-to-br from-blue-600/40 to-blue-700/40 text-white"
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: [
        "Unlimited generations",
        "Custom AI training",
        "All platforms + API",
        "Custom analytics",
        "24/7 support",
        "Team collaboration",
        "Dedicated account manager"
      ],
      buttonText: "Contact Sales",
      buttonClass: "bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600",
      borderClass: "border-2 border-gray-200 hover:border-blue-500",
      bgClass: "bg-gradient-to-br from-white/20 to-white/40 text-white"
    }
  ];

  return (
    <section id="pricing" className="py-20 gradient-bg-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Choose the perfect plan for your business</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${
                plan.bgClass || `bg-white ${plan.borderClass}`
              } rounded-2xl p-8 transition transform ${
                plan.popular ? "md:scale-105 shadow-2xl" : ""
              } relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-bold">
                  POPULAR
                </div>
              )}
              <h3 className={`text-2xl font-bold ${plan.bgClass ? "" : "text-gray-900"} mb-2`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-5xl font-bold ${plan.bgClass ? "" : "text-gray-900"}`}>
                  {plan.price}
                </span>
                <span className={plan.bgClass ? "text-blue-200" : "text-gray-600"}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <i className={`fas fa-check ${plan.bgClass ? "text-yellow-300" : "text-green-500"} mt-1 mr-3`}></i>
                    <span className={plan.bgClass ? "" : "text-gray-700"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`w-full block text-center py-3 rounded-lg font-semibold transition ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
