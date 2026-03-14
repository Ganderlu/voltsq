"use client";

import { useLanguage } from "@/context/LanguageContext";

const plans = [
  {
    name: "Rare Plan",
    rate: "3% / Daily",
    price: "$100 - $999",
    features: [
      "Real-time market dashboard access",
      "Standard 24/7 customer support",
      "Weekly market analysis reports",
      "Secure multi-sig wallet integration",
      "Referral program: 5% commission",
    ],
  },
  {
    name: "Business Plan",
    rate: "10% / Daily",
    price: "$1,000 - $9,999",
    features: [
      "All Rare Plan features included",
      "Priority 24/7 fast-track support",
      "Monthly portfolio performance review",
      "Exclusive expert-led webinars",
      "Advanced risk management tools",
      "2% cashback on all new deposits",
    ],
  },
  {
    name: "Gold Plan",
    rate: "15% / Daily",
    price: "$10,000 - $49,999",
    features: [
      "All Business Plan features included",
      "Dedicated senior account manager",
      "Private investment pool access",
      "Personalized wealth coaching sessions",
      "VIP networking event invitations",
      "5% cashback on all new deposits",
      "Instant withdrawal processing",
    ],
  },
  {
    name: "Real Estate Plan",
    rate: "20% / Weekly",
    price: "$50,000 - $400,000",
    features: [
      "Institutional-grade security & legal",
      "Direct fractional property ownership",
      "Quarterly property yield distributions",
      "Early access to new listings",
      "Tax optimization consultation",
      "28% capital growth after 30 days",
    ],
  },
  {
    name: "Promo Plan",
    rate: "30% / Weekly",
    price: "$2,000 (Fixed)",
    features: [
      "High-yield short-term investment",
      "Special 30% promotional rate",
      "Limited time entry opportunity",
      "Automated daily profit distribution",
      "Principal protection guarantee",
      "24/7 premium support access",
    ],
  },
  {
    name: "Joint Investment Plan",
    rate: "50% / Daily",
    price: "$10,000 - $30,000",
    features: [
      "Collaborative wealth building",
      "Our highest daily return (50%)",
      "Shared risk and reward structure",
      "Monthly joint strategy meetings",
      "Full transparency & audit logs",
      "Dedicated joint account support",
    ],
  },
];

export default function PlansSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-background px-4 py-20 border-t border-border">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-foreground text-3xl md:text-4xl font-bold mb-4">
          {t("plans.heading")}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
          {t("plans.subheading")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-primary transition-colors duration-300"
          >
            <h3 className="text-foreground text-lg font-semibold mb-2">
              {plan.name}
            </h3>

            <p className="text-primary font-semibold text-sm mb-1">
              {plan.rate}
            </p>

            <p className="text-foreground text-sm mb-4">{plan.price}</p>

            <button className="bg-primary hover:bg-primary/90 transition text-primary-foreground text-sm font-semibold py-2 rounded-lg mb-2">
              {t("plans.apply")}
            </button>

            <p className="text-muted-foreground text-xs text-center mb-4">
              {t("plans.note")}
            </p>

            <p className="text-white text-sm font-semibold mb-3">
              {t("plans.benefits")}
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-purple-500 mt-1">●</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
