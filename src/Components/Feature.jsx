import React from "react";

const Feature = () => {
  return (
    <section className="bg-gray-100 px-6 md:px-10 lg:px-16 xl:px-32 pt-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center text-main">
          Why SkillSculpt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white p-6 border-t-4 border-t-main shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-main">
              Trade Skills, Foster Connections
            </h3>
            <p className="text-gray-700">
              Engage in a novel barter system where knowledge becomes currency.
              Exchange skills and services, forging meaningful connections
              within our community. Choose SkillSculpt for a unique approach to
              skill-sharing.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white p-6 shadow-md border-t-4 border-t-main">
            <h3 className="text-xl font-semibold mb-4 text-main">
              Learn and Teach Simultaneously
            </h3>
            <p className="text-gray-700">
              Unlock the power of reciprocal learning. Post a skill you want to
              learn and offer your expertise in return. SkillSculpt fosters a
              collaborative environment where everyone contributes and benefits.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white p-6 shadow-md border-t-4 border-t-main">
            <h3 className="text-xl font-semibold mb-4 text-main">
              Explore Limitless Possibilities
            </h3>
            <p className="text-gray-700">
              Join a vibrant community where diverse skills converge. From
              coding wizards to fitness enthusiasts, SkillSculpt offers a wide
              array of expertise, ensuring you find the perfect mentor or
              learner for your skill journey.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white p-6 border-t-4 border-t-main shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-main">
              Build Trust and Credibility
            </h3>
            <p className="text-gray-700">
              A robust reputation and review system allow learners to assess the
              expertise of potential mentors. Users can leave reviews and
              ratings, creating a trustworthy environment and helping others
              make informed decisions when choosing a mentor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
