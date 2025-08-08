// Mobile Tabs Component
const MobileTabs = ({ selectedDate, onDateSelect, tabs }) => {
    return (
        <div className="flex justify-center mb-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-1 border border-[#edbd90]/20">
                {tabs.map((tab) => (
                    <button
                        key={tab.date}
                        onClick={() => onDateSelect(tab.date)}
                        className={`px-4 py-2 rounded-md text-sm font-cormorant-infant transition-all duration-300 ${
                            selectedDate === tab.date
                                ? 'bg-[#edbd90] text-black font-semibold shadow-lg'
                                : 'text-[#edbd90] hover:text-[#f8d6a4] hover:bg-white/5'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileTabs;