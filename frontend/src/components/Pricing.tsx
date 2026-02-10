import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Pricing() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      // First try to fetch plans, if empty, seed them
      let { data } = await axios.get("http://localhost:5000/api/plans");
      if (data.length === 0) {
        await axios.post("http://localhost:5000/api/plans/seed");
        const res = await axios.get("http://localhost:5000/api/plans");
        data = res.data;
      }
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans", error);
    }
  };

  return (
    <section id="pricing" className="py-20 gradient-bg-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Choose the perfect plan for your business</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan: any, index) => (
            <div
              key={index}
              className={`${plan.bgClass || `bg-white ${plan.borderClass}`
                } rounded-2xl p-8 transition transform ${plan.popular ? "md:scale-105 shadow-2xl" : ""
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
                {plan.features.map((feature: string, i: number) => (
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
