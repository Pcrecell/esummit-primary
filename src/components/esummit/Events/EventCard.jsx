import React from 'react';

const EventCard = ({ eventData, left }) => {
    return (
        <div className="relative flex flex-col items-center gap-12 md:gap-24 scale-100 lg:scale-110">
            {/* Background Image Section with Content */}
            <div 
                className="w-full max-w-3xl flex-shrink-0 relative aspect-[21/9] bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{
                    backgroundImage: eventData.image ? `url(${eventData.image})` : 'none'
                }}
            >
                {/* Fallback text when no image */}
                {!eventData.image && (
                    <div className="text-white text-xl">
                        No Image
                    </div>
                )}

                {/* Text Content */}
                <div
                    className={`
                        absolute inset-7 lg:inset-2 flex items-center
                        px-4 sm:px-6 md:px-8 lg:px-16
                        ${left ? 'justify-start' : 'justify-end'}
                    `}
                >
                    <div className={`
                        max-w-[85%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[50%]
                        ${left ? 'text-left' : 'text-right'}
                    `}>
                        <h2 className={`
                            text-[0.76rem] sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-72
                            font-bold font-cormorant-infant mb-1 sm:mb-2 text-black
                            sm:max-w-full
                        `}>
                            {eventData.title}
                        </h2>
                        <div className='hidden sm:block'>
                            <p className="mb-1 font-cormorant-infant text-black text-sm md:text-base">
                                {eventData.time} | {eventData.venue}
                            </p>
                        </div>
                        <div className='block sm:hidden font-cormorant-infant text-black text-xs'>
                            <p>{eventData.time}</p> 
                            <p>{eventData.venue}</p>
                        </div>
                        <p className="font-cormorant-infant max-w-72 sm:max-w-full md:max-w-80 leading-5 xl:leading-normal text-black hidden md:block text-sm lg:text-base">
                            {eventData.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;