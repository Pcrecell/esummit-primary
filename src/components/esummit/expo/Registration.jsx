import { useState } from "react";

const Registration = () => {
  const [form, setForm] = useState({
    companyName: "",
    teamLeadName: "",
    uniqueId: "",
    phoneNumber: "",
    yourIdea: "",
    teammates: ["", ""], // Initial two teammate fields
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Teammate change handler
  const handleTeammateChange = (index, value) => {
    const newTeammates = [...form.teammates];
    newTeammates[index] = value;
    setForm({ ...form, teammates: newTeammates });
  };

  // Add teammate field
  const addTeammate = () => {
    setForm({ ...form, teammates: [...form.teammates, ""] });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to terms & conditions");
      return;
    }
    console.log("Submitting registration:", form);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Registration successful!");
        // Reset form
        setForm({
          companyName: "",
          teamLeadName: "",
          uniqueId: "",
          phoneNumber: "",
          yourIdea: "",
          teammates: ["", ""],
        });
        setAgreedToTerms(false);
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[60vh] w-full">
      {/* Mobile Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/admr8uj75/Register%20phone%20(1).png?updatedAt=1755081336691')",
        }}
      ></div>
      
      {/* Tablet Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block lg:hidden"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/admr8uj75/Register%20phone%20(1).png?updatedAt=1755081336691')",
        }}
      ></div>
      
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/admr8uj75/Frame%20258.png?tr=w-1920,q-100,fo-auto&updatedAt=1755023127771')",
        }}
      ></div>

      {/* Content Container */}
      <div className="relative flex items-center justify-center min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Top black gradient overlay */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-24 sm:h-32 md:h-40 lg:h-48 bg-gradient-to-b from-black to-transparent z-10"></div>
        
        <div className="relative z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">Register</h1>
          </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Company Name */}
          <div className="relative">
            <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="xyz"
              className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
              required
            />
          </div>

          {/* Team Lead Name */}
          <div className="relative">
            <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
              Team Lead Name
            </label>
            <input
              type="text"
              name="teamLeadName"
              value={form.teamLeadName}
              onChange={handleChange}
              placeholder="xyz"
              className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
              required
            />
          </div>

          {/* Unique ID */}
          <div className="relative">
            <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
              Unique ID
            </label>
            <div className="relative">
              <input
                type="text"
                name="uniqueId"
                value={form.uniqueId}
                onChange={handleChange}
                placeholder="number"
                className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 pr-6 sm:pr-8 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
                required
              />
              <div className="absolute right-0 top-1.5 sm:top-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder=""
              className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
              required
            />
          </div>

          {/* Your Idea */}
          <div className="relative">
            <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
              Your Idea
            </label>
            <textarea
              name="yourIdea"
              value={form.yourIdea}
              onChange={handleChange}
              placeholder=""
              rows="3"
              className="w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 py-1.5 sm:py-2 px-0 focus:outline-none focus:border-white transition-colors text-sm sm:text-base resize-none"
              required
            />
          </div>

          {/* Teammates */}
          <div className="relative">
            <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">
              Teammates
            </label>
            <div className="space-y-3 mb-4">
              {form.teammates.map((teammate, index) => (
                <input
                  key={index}
                  type="text"
                  value={teammate}
                  onChange={(e) => handleTeammateChange(index, e.target.value)}
                  placeholder=""
                  className="w-full bg-transparent border border-gray-400 rounded-md text-white placeholder-gray-400 py-2 sm:py-3 px-3 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addTeammate}
              className="text-white text-sm sm:text-base hover:text-green-300 transition-colors"
            >
              +Add Teammate
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}

            
            className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-white transition-all duration-200 text-sm sm:text-base ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#06671C] to-[#B7AD97] hover:from-[#06671C] hover:to-[#8e8a7a] shadow-lg hover:shadow-xl"
            }`}
            style={{ backgroundImage: isSubmitting ? undefined : 'linear-gradient(to right, #06671C, #B7AD97)' }}
          >
            {isSubmitting ? "Registering..." : "Registration Starting Soon..."}
          </button>

          {/* Sign up link */}
          <div className="text-center mt-3 sm:mt-4">
            <p className="text-white text-xs sm:text-sm">
              Don't have an account? 
              <a href="/signup" className="text-white hover:text-green-300 ml-1">
                Sign up
              </a>
            </p>
          </div>
        </form>
        </div>
        <div className="pointer-events-none absolute inset-0 z-30">
        <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      </div>
    </div>
  );
};

export default Registration;
