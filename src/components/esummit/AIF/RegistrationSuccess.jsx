import React from "react";

const RegistrationSuccess = ({ onClose, onJoinDiscord }) => {
  const handleJoinDiscord = () => {
    // Replace with your actual Discord invite link
    const discordInviteLink = "https://discord.gg/your-server-invite";
    window.open(discordInviteLink, "_blank", "noopener,noreferrer");
    if (onJoinDiscord) onJoinDiscord();
  };

  return (
    <div className="relative flex items-center justify-center w-full bg-black/0 min-h-[600px]">
      {/* Desktop Layout */}
      <div className="relative max-w-2xl w-full hidden md:flex items-center justify-center md:min-h-[600px] bg-transparent">
        {/* Decorative frame image */}
        <img
          src="https://i.ibb.co/qMjzxJcd/download-70-removebg-preview-cleanup-1.png"
          alt="Decorative Frame"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Success content */}
        <div className="relative z-10 w-full max-w-md mx-auto px-8 py-12 text-center">
          {/* Success checkmark animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  className="w-10 h-10 text-white animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              {/* Sparkle effects */}
              <div className="absolute -top-2 -right-2 text-yellow-400 animate-ping">✨</div>
              <div className="absolute -bottom-1 -left-2 text-yellow-300 animate-ping delay-300">⭐</div>
              <div className="absolute top-2 -left-3 text-yellow-500 animate-ping delay-500">✨</div>
            </div>
          </div>

          {/* Success title */}
          <h1
            className="text-3xl font-bold uppercase tracking-widest text-white drop-shadow-lg mb-4"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Registration
            <br />
            Successful!
          </h1>

          {/* Success message */}
          <p
            className="text-white/90 text-lg mb-8 leading-relaxed"
            style={{ fontFamily: "Inria Serif, serif" }}
          >
            Welcome to <span className="text-yellow-400 font-semibold">Alice in Founderland!</span>
            <br />
            Your journey into the entrepreneurial wonderland begins now.
          </p>

          {/* Discord join section */}
          <div className="mb-8">
            <p
              className="text-white/80 text-sm mb-4 font-bold"
              style={{ fontFamily: "Inria Serif, serif" }}
            >
              Join our discord server to participate in the event.
            </p>

            {/* Discord button */}
            <button
              onClick={handleJoinDiscord}
              className="group transform transition-all duration-300 hover:scale-110 relative mb-6"
            >
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 rounded-xl px-8 py-4 flex items-center space-x-3 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Discord icon */}
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span
                  className="text-white font-bold text-lg tracking-wider"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Join Discord
                </span>
              </div>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="group transform transition-all duration-300 hover:scale-110 relative"
          >
            <img
              src="https://i.ibb.co/C3kCrrPy/The-PNG-Stock-removebg-preview-1.png"
              alt="Continue"
              className="h-28 w-auto transition-all duration-300 hover:brightness-110 hover:drop-shadow-2xl filter drop-shadow-lg"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg tracking-wider transition-all duration-300"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              CONTINUE
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden w-full max-w-sm mx-auto px-4">
        <div className="bg-gradient-to-b from-gray-900/50 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 shadow-2xl text-center">
          {/* Success checkmark animation */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  className="w-8 h-8 text-white animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              {/* Sparkle effects */}
              <div className="absolute -top-1 -right-1 text-yellow-400 animate-ping text-sm">✨</div>
              <div className="absolute -bottom-1 -left-1 text-yellow-300 animate-ping delay-300 text-sm">⭐</div>
            </div>
          </div>

          {/* Success title */}
          <h1
            className="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-lg mb-4"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Registration
            <br />
            Successful!
          </h1>

          {/* Success message */}
          <p
            className="text-white/90 text-base mb-6 leading-relaxed"
            style={{ fontFamily: "Inria Serif, serif" }}
          >
            Welcome to <span className="text-yellow-400 font-semibold">Alice in Founderland!</span>
            <br />
            Your entrepreneurial journey begins now.
          </p>

          {/* Discord join section */}
          <div className="mb-6">
            <p
              className="text-white/80 text-sm mb-4"
              style={{ fontFamily: "Inria Serif, serif" }}
            >
              Join our community for updates and networking!
            </p>

            {/* Discord button */}
            <button
              onClick={handleJoinDiscord}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 rounded-xl px-6 py-3 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
            >
              {/* Discord icon */}
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span
                className="text-white font-bold text-base tracking-wider"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Join Discord
              </span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 rounded-full px-6 py-3 font-bold text-lg tracking-wider text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;