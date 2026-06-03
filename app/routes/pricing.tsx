import { useState } from "react";
import Navbar from "../../components/Navbar"; // Adjust this path if your Navbar is in a different folder

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for testing out Roomify's core AI rendering engines.",
      price: billingPeriod === "monthly" ? 0 : 0,
      features: [
        "3 complimentary AI renders per month",
        "Standard definition generation (720p)",
        "Access to default community material presets",
        "Web-based dashboard tracking",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro Studio",
      description: "For independent architects, designers, and active creators.",
      price: billingPeriod === "monthly" ? 29 : 19,
      features: [
        "Unlimited lightning-fast AI generations",
        "Ultra 4K resolution render outputs",
        "Custom architectural prompt fine-tuning",
        "Priority dedicated rendering queue status",
        "Commercial usage rights license",
        "Early access to new layout features",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Team Suite",
      description: "Built for small design studios managing multiple active projects.",
      price: billingPeriod === "monthly" ? 79 : 59,
      features: [
        "Everything in Pro Studio plan",
        "Up to 5 shared team member seats",
        "Shared project asset workspace library",
        "Advanced version control history tracking",
        "Centralized team billing portal",
      ],
      cta: "Deploy Team Suite",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "Can I cancel or change my plan at any time?",
      a: "Yes, absolutely. You can upgrade, downgrade, or cancel your subscription straight from your dashboard account settings at any point.",
    },
    {
      q: "What is the difference between Monthly and Annual billing?",
      a: "Choosing annual billing saves you over 30% across the year. The price displayed reflects the monthly equivalent cost when billed yearly.",
    },
    {
      q: "Do unused renders roll over to the next month?",
      a: "On our Starter free tier, monthly credits reset at the end of your billing cycle and do not roll over.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Keeps your exact navbar locked safely at the top */}
      <Navbar />

      {/* Main Pricing Content wrapper */}
      <main className="flex-1 py-20 px-6 max-w-7xl mx-auto w-full">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full">
            Pricing Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-4">
            Simple pricing for beautiful spaces
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Choose the workspace capability that matches your design rhythm.
          </p>

          {/* Billing Toggle Selector Button Switch */}
          <div className="mt-8 inline-flex items-center gap-1 bg-white border border-gray-200 p-1.5 rounded-xl shadow-sm">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                billingPeriod === "annual"
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md">
                Save 30%+
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Pricing Cards Grid Wrapper */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white border rounded-2xl p-8 shadow-sm flex flex-col justify-between transition-all duration-200 ${
                plan.popular
                  ? "border-2 border-orange-600 relative md:-translate-y-2 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wider">
                  MOST POPULAR
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">${plan.price}</span>
                  <span className="text-sm font-medium text-gray-500 ml-1">/mo</span>
                </div>
                {billingPeriod === "annual" && plan.price > 0 && (
                  <p className="text-xs text-green-600 font-medium mt-1">Billed annually</p>
                )}

                {/* Separation line spacer */}
                <hr className="my-6 border-gray-100" />

                {/* Features List wrapper */}
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className={`shrink-0 text-base ${plan.popular ? "text-orange-600" : "text-gray-400"}`}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger Buttons */}
              <button
                className={`mt-8 w-full py-3.5 px-4 rounded-xl font-semibold transition-all text-sm tracking-wide shadow-sm ${
                  plan.popular
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Area Section */}
        <div className="mt-32 max-w-4xl mx-auto border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}