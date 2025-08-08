import React from 'react'
import Background from "../../../../public/images/esummit/events/EventsCalendarBackground.png";

const EventsCalendar = ({ selectedDate, onDateSelect }) => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const eventDates = [15, 16, 17]; // Dates with events
    
    const calendarDays = [
        ...Array(5).fill(''),
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];

    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7));
    }

    const handleDateClick = (day) => {
        if (eventDates.includes(day)) {
            onDateSelect(day);
        }
    };

    const getDateStyles = (day) => {
        if (!day || !eventDates.includes(day)) return "text-center min-w-[20px]";
        
        const baseStyles = "text-center min-w-[20px] cursor-pointer transition-all duration-200 hover:scale-110";
        const eventStyles = "text-[#2eb24c] font-bold";
        const selectedStyles = selectedDate === day ? "bg-white text-black rounded-full" : "";
        
        return `${baseStyles} ${eventStyles} ${selectedStyles}`;
    };

    const getMobileDateStyles = (day) => {
        if (!day || !eventDates.includes(day)) return "text-center text-sm min-w-[20px] h-6 flex items-center justify-center";
        
        const baseStyles = "text-center text-sm min-w-[20px] h-6 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110";
        const eventStyles = "text-[#2eb24c] font-bold";
        const selectedStyles = selectedDate === day ? "bg-white text-black rounded-full" : "";
        
        return `${baseStyles} ${eventStyles} ${selectedStyles}`;
    };

    return (
        <div
            style={{
                backgroundImage: 'url("https://ik.imagekit.io/fhervghik/E-Cell%20Website/EventsCalendarBackground.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                minHeight: '300px',
                height: 'auto'
            }}
            className="relative flex items-center justify-center p-8"
        >
            {/* Desktop Calendar */}
            <div className='hidden lg:block p-7 font-cormorant-infant text-[#edbd90]'>
                <div className='grid grid-cols-7 gap-5 mb-3'>
                    {daysOfWeek.map((day, index) => (
                        <p key={index} className="text-center font-semibold">{day}</p>
                    ))}
                </div>
                
                <div className='space-y-2'>
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className='grid grid-cols-7 gap-5'>
                            {week.map((day, dayIndex) => (
                                <p 
                                    key={dayIndex} 
                                    className={getDateStyles(day)}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day || ''}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Calendar */}
            <div className='lg:hidden font-cormorant-infant text-[#edbd90] w-full max-w-xs p-6'>
                <div className='grid grid-cols-7 gap-2 mb-3'>
                    {daysOfWeek.map((day, index) => (
                        <p key={index} className="text-center font-semibold text-sm">{day}</p>
                    ))}
                </div>
                
                <div className='space-y-2'>
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className='grid grid-cols-7 gap-2'>
                            {week.map((day, dayIndex) => (
                                <p 
                                    key={dayIndex} 
                                    className={getMobileDateStyles(day)}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day || ''}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default EventsCalendar