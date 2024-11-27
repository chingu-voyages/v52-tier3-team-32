import React from 'react';
import './home.css';
function BenefitItem() {}

export default function BenefitsSection() {
  return (
    <section className="w-1/2 flex flex-col gap-4 font-instrumental_sans">
      <div className=" benefits-item-bg rounded-xl shadow-lg">
        <div className="background-image-eco p-4 ">
          <div className="w-1/2">
            <h3 className="gradient-text-green text-3xl font-semibold">
              Eco-Friendly
            </h3>
            <p className="gradient-text-green my-5 font-medium text-xl">
              Reduce your carbon footprint and help combat climate change by
              using clean, renewable energy.
            </p>
          </div>
        </div>
      </div>
      <div className=" benefits-item-bg rounded-xl shadow-lg">
        <div className="background-image-cost-saving p-4 ">
          <div className="w-3/5">
            <h3 className="gradient-text-blue text-3xl font-semibold">
              Cost Savings
            </h3>
            <p className="gradient-text-blue my-5 font-medium text-xl">
              Reduce your carbon footprint and help combat climate change by
              using clean, renewable energy.
            </p>
          </div>
        </div>
      </div>
      <div className=" benefits-item-bg rounded-xl shadow-lg">
        <div className="background-image-energy-independent p-4 ">
          <div className="w-3/5">
            <h3 className="gradient-text-yellow text-3xl font-semibold">
              Energy Independence
            </h3>
            <p className="gradient-text-yellow my-5 font-medium text-xl">
              Reduce reliance on the grid and protect yourself from rising
              energy costs and power outages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
