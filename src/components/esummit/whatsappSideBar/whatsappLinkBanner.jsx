import { useState } from 'react';
import { Bookmark, MessageCircle, X, Users, Phone } from 'lucide-react';

const SidebarIcon = ({ 
  whatsappLink = "https://wa.me/1234567890",
  bgColor = "black" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, '_blank');
    setIsOpen(false);
  };

  const handleMobileClick = () => {
    window.open(whatsappLink, '_blank');
  };

  // Dynamic background classes based on bgColor prop
  const getBgClasses = (variant = 'default') => {
    const colorMap = {
      black: {
        default: 'bg-black border-green-700',
        panel: 'bg-black border-green-800',
        hover: 'hover:bg-gray-800'
      },
      white: {
        default: 'bg-white border-green-300',
        panel: 'bg-white border-green-200',
        hover: 'hover:bg-gray-100'
      },
      gray: {
        default: 'bg-gray-900 border-green-600',
        panel: 'bg-gray-900 border-green-700',
        hover: 'hover:bg-gray-800'
      },
      blue: {
        default: 'bg-blue-900 border-blue-700',
        panel: 'bg-blue-900 border-blue-800',
        hover: 'hover:bg-blue-800'
      }
    };
    
    return colorMap[bgColor]?.[variant] || colorMap.black[variant];
  };

  const getTextClasses = () => {
    return bgColor === 'white' ? 'text-gray-800' : 'text-white';
  };

  const getSubtextClasses = () => {
    return bgColor === 'white' ? 'text-gray-600' : 'text-gray-300';
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block">
        {/* Main Icon */}
        <div className="fixed right-[-10]  border border-green-600 top-1/2 transform -translate-y-1/2 z-50">
          <button
            onClick={handleToggle}
            className={`${getBgClasses('default')} shadow-lg rounded-l-lg px-4 py-4 hover:shadow-xl transition-all duration-300 flex items-center space-x-3 ${
              isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium text-sm whitespace-nowrap">
              Can't find a team?
            </span>
          </button>
        </div>

        {/* Sliding Panel */}
        <div
          className={`fixed right-0 top-0  h-full w-96 ${getBgClasses('panel')} shadow-2xl border-l transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Content - Centered vertically */}
            <div className="flex-1 flex flex-col justify-center px-8">
              <div className="space-y-8">
                {/* Main Message */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h4 className={`text-lg font-medium ${getTextClasses()} mb-2`}>
                      Looking for Team Members?
                    </h4>
                    <p className={`${getSubtextClasses()} leading-relaxed`}>
                      Find Teammates that suit your style of working
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Join WhatsApp Community</span>
                </button>
              </div>
            </div>

            {/* Footer - Stays at bottom */}
            <div className={`px-8 py-4 border-t border-green-700`}>
              <p className={`${getSubtextClasses()} text-xs text-center`}>
                Any foul behaviour on the group will result in instant expulsion from the event
              </p>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={handleToggle}
          ></div>
        )}
      </div>

      {/* Mobile Version */}
      <div className="md:hidden fixed bottom-0 right-[-5] z-50">
        <button
          onClick={handleMobileClick}
          className={`${getBgClasses('default')} shadow-lg rounded-xl px-4 py-3 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
        >
          <div className="flex items-center ">
            <span className="text-green-400 font-medium text-sm">
              Cant find Teammates?
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export default SidebarIcon;