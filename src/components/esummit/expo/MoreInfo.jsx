import React, { useEffect } from 'react';

// Load Bayon font from Google Fonts
const loadBayonFont = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Bayon&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

// Reusable InfoSection component
const InfoSection = ({ backgroundImage, children, sectionId }) => {
  return (
    <section 
      id={sectionId}
      className="relative w-full min-h-[80vh] sm:min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        fontFamily: 'Bayon, sans-serif'
      }}
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black to-transparent"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {children}
      </div>
    </section>
  );
};

const MoreInfo = () => {
  // Load Bayon font when component mounts
  useEffect(() => {
    loadBayonFont();
  }, []);

  return (
    <div className="w-full" style={{ fontFamily: 'Bayon, sans-serif' }}>
      {/* Participant Categories & Fees Section */}
      <InfoSection 
        backgroundImage="https://ik.imagekit.io/admr8uj75/Frame%20264.png?updatedAt=1755083037338"
        sectionId="participant-fees"
      >
        {/* Main Heading */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#FFB641' }}>
            PARTICIPANT CATEGORIES & FEES
          </h1>
        </div>

        {/* Categories and Fees Table */}
        <div className="p-3 sm:p-6 lg:p-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
            {/* Category Column */}
            <div>
              <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-white mb-3 sm:mb-6 lg:mb-8">
                CATEGORY
              </h2>
              <div className="space-y-2 sm:space-y-4 lg:space-y-6">
                <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl font-medium">
                  COMPANY-LED STARTUPS
                </div>
                <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl font-medium">
                  SPONSORSHIP TIER
                </div>
                <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl font-medium">
                  STUDENTS
                </div>
              </div>
            </div>

            {/* Participation Fee Column */}
            <div>
              <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-white mb-3 sm:mb-6 lg:mb-8">
                PARTICIPATION FEE
              </h2>
              <div className="space-y-2 sm:space-y-4 lg:space-y-6">
                <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl">
                  ₹15,000
                </div>
                <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl">
                  ₹50,000 MINIMUM (PARTICIPATION FEE WAIVED)
                </div>
                <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl">
                  FREE OF COST
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-600">
            <p className="text-white text-sm sm:text-base lg:text-lg text-center italic">
              *SPONSORS ENJOY EXCLUSIVE BRANDING OPPORTUNITIES, ACCESS TO VIP NETWORKING ZONES, AND PREMIUM BOOTH LOCATIONS.
            </p>
          </div>
        </div>
      </InfoSection>

      {/* Tent Requirements Section */}
      <InfoSection 
        backgroundImage="https://ik.imagekit.io/admr8uj75/Frame%20264.png?updatedAt=1755083037338"
        sectionId="tent-requirements"
      >
        {/* Main Heading */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-4" style={{ color: '#FFB641' }}>
            TENT REQUIREMENTS (FOR ALL EXHIBITORS)
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-xl font-medium mb-8">
            EACH BOOTH WILL BE PRE-ARRANGED WITH THE FOLLOWING AMENITIES:
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="p-3 sm:p-6 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Column 1 */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-15">
              <div className="flex items-start space-x-3">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  HIGH-SPEED WI-FI ACCESS
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  DISPLAY SCREEN (IF REQUIRED)
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  DUSTBIN - 1 PER STALL
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="flex items-start space-x-3">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  TABLES AND CHAIRS - (AS REQUIRED BY THE COMPANY)
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  FIRE EXTINGUISHING SYSTEM
                </div>
              </div>
              <div className="flex items-start space-x-3 lg:mt-15">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  PROPER LIGHTING
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-15">
              <div className="flex items-start space-x-3">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  ELECTRICITY CONNECTION
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  WATER BOTTLES
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-white text-lg sm:text-xl lg:text-2xl">•</div>
                <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  KIIT HOSPITALITY STALL
                </div>
              </div>
            </div>
          </div>
        </div>
      </InfoSection>

      {/* General Guidelines Section */}
      <InfoSection 
        backgroundImage="https://ik.imagekit.io/admr8uj75/Download%20AI%20generated%20Realistic%20deep%20forest%20,Deep%20Forest%20Fantasy%20Backdrop%20Concept%20Art%20Realistic%20Illustration%20Background%20Ai%20generated%20for%20free%201%20(1).png?updatedAt=1755191518195"
        sectionId="general-guidelines"
      >
        {/* Main Heading */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8" style={{ color: '#FFB641' }}>
            GENERAL GUIDELINES
          </h1>
        </div>

        {/* Guidelines List */}
        <div className="p-3 sm:p-6 lg:p-10">
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Guideline 1 */}
            <div className="flex items-start space-x-4">
              <div className="text-white text-lg sm:text-xl lg:text-3xl mt-1">•</div>
              <div className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-medium leading-relaxed">
                ALL PARTICIPANTS MUST REGISTER VIA THE OFFICIAL GOOGLE FORM.
              </div>
            </div>

            {/* Guideline 2 */}
            <div className="flex items-start space-x-4">
              <div className="text-white text-lg sm:text-xl lg:text-3xl mt-1">•</div>
              <div className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-medium leading-relaxed">
                TENTS MUST BE ATTENDED AT ALL TIMES BY AT LEAST ONE TEAM REPRESENTATIVE.
              </div>
            </div>

            {/* Guideline 3 */}
            <div className="flex items-start space-x-4">
              <div className="text-white text-lg sm:text-xl lg:text-3xl mt-1">•</div>
              <div className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-medium leading-relaxed">
                MAINTAIN CLEANLINESS, PUNCTUALITY, AND PROFESSIONAL BEHAVIOR.
              </div>
            </div>

            {/* Guideline 4 */}
            <div className="flex items-start space-x-4">
              <div className="text-white text-lg sm:text-xl lg:text-3xl mt-1">•</div>
              <div className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-medium leading-relaxed">
                ALL TECHNICAL OR LOGISTICAL ISSUES MUST BE COMMUNICATED VIA THE WHATSAPP CHANNEL.
              </div>
            </div>

            {/* Guideline 5 */}
            <div className="flex items-start space-x-4">
              <div className="text-white text-lg sm:text-xl lg:text-3xl mt-1">•</div>
              <div className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-medium leading-relaxed">
                FEEDBACK FORMS WILL BE DISTRIBUTED AT THE END OF DAY 2 FOR CONTINUOUS IMPROVEMENT.
              </div>
            </div>
          </div>
        </div>
      </InfoSection>

      {/* Event Timeline Section - Combined Day 1 & Day 2 */}
      <InfoSection 
        backgroundImage="https://ik.imagekit.io/admr8uj75/new%20image.png?updatedAt=1755191883847"
        sectionId="event-timeline"
      >
        {/* Main Heading */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#FFB641' }}>
            EVENT TIMELINE
          </h1>
        </div>

        {/* Day 2 Section */}
        <div>
          {/* Day 2 Timeline Table */}
          <div className="p-3 sm:p-6 lg:p-10">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                {/* Activity Column */}
                <div>
                  <h3 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
                    ACTIVITY
                  </h3>
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl font-medium text-center">
                      PARTICIPANT REPORTING
                    </div>
                    <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl font-medium text-center">
                      EXPO OPEN FOR VISITORS
                    </div>
                    <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl font-medium text-center">
                      NETWORKING OVER LUNCH
                    </div>
                    <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl font-medium text-center">
                      JUDGEMENT ROUND
                    </div>
                  </div>
                </div>

                {/* Timing Column */}
                <div>
                  <h3 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
                    TIMING
                  </h3>
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl text-center">
                      8:30 AM
                    </div>
                    <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl text-center">
                      9:00 AM - 3:30 PM
                    </div>
                    <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl text-center">
                      1:00 PM - 2:00 PM
                    </div>
                    <div className="text-white text-xs sm:text-base md:text-lg lg:text-xl text-center">
                      4:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InfoSection>
     
    </div>
  );
};

export default MoreInfo;
