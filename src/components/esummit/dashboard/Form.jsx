import React from "react";
import { Github, Presentation } from "lucide-react";

const Form = () => {
  const handleGithub = async () => {
    try {
        const res = await fetch()
    } catch (error) {
        console.error("bhai backend bana to le pehle")
    }
  };

  const handlePitchdeck = async () => {
    try {
        const res = await fetch()
    } catch (error) {
        onsole.error("bhai backend bana to le pehle")
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-4">
      <div className="form-details w-full max-w-md">
        <div className="h-auto border border-white flex flex-col rounded-xl gap-y-6 p-6 sm:p-8 bg-black/20 backdrop-blur-sm">
          <div className="text-center text-2xl sm:text-3xl text-green-600/90 font-bold">
            Submit your work
          </div>
          
          <input
            className="border border-green-700/60 bg-green-900/70 px-4 py-3 rounded-xl text-white placeholder-green-300/60 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors w-full"
            type="text"
            placeholder="Enter your team name"
          />
          
          <input
            className="border border-green-700/60 bg-green-900/70 px-4 py-3 rounded-xl text-white placeholder-green-300/60 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors w-full"
            type="text"
            placeholder="Enter your team id"
          />
          
          <input
            className="border border-green-700/60 bg-green-900/70 px-4 py-3 rounded-xl text-white placeholder-green-300/60 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors w-full"
            type="number"
            placeholder="Enter the number of members"
          />
          
          <input
            className="border border-green-700/60 bg-green-900/70 px-4 py-3 rounded-xl text-white placeholder-green-300/60 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors w-full"
            type="number"
            placeholder="Enter your contact number"
          />
          
          <input
            className="border border-green-700/60 bg-green-900/70 px-4 py-3 rounded-xl text-white placeholder-green-300/60 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors w-full"
            type="email"
            placeholder="Enter your email"
          />
          
          <div className="submission-icons">
            <div className="text-lg sm:text-xl font-semibold text-white text-center pb-4">
              Submit here
            </div>
            
            <div className="flex items-center justify-center gap-x-6">
              <button 
                onClick={handleGithub}
                className="github flex items-center justify-center p-3 rounded-lg bg-green-800/30 hover:bg-green-700/50 transition-colors border border-green-600/30 hover:border-green-500/50"
                aria-label="Submit GitHub repository"
              >
                <Github size={28} className="text-green-400" />
              </button>
              
              <button 
                onClick={handlePitchdeck}
                className="pitch-deck flex items-center justify-center p-3 rounded-lg bg-green-800/30 hover:bg-green-700/50 transition-colors border border-green-600/30 hover:border-green-500/50"
                aria-label="Submit pitch deck"
              >
                <Presentation size={28} className="text-green-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;