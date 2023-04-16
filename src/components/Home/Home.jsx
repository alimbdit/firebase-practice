import React from 'react';

const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to My App
          </h1>
          <p className="text-lg mb-8">
            This is the Home page of my application
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Learn More
          </button>
        </div>
      </div>
    );
};

export default Home;