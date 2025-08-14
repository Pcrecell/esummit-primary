const Footer = () => {
  return (
  <footer className="bg-black text-white py-8 mt-0">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-2 w-full max-w-6xl mx-auto">
        {/* Left side - Text */}
        <div className="flex flex-col items-center text-center">
          <div className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-2 text-center">
            Want to Know More?<br />
            <span className="block">Reach Out to us!</span>
          </div>
          <div className="text-sm sm:text-base font-normal text-white mb-6">We will get back to you asap!</div>
        </div>
        {/* Right side - Contact scroll image */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img 
            src="https://ik.imagekit.io/lzogar7yp/Frame%20263.png?updatedAt=1755198081116" 
            alt="Contact scroll" 
            className="h-32 sm:h-36 md:h-40 lg:h-48 xl:h-56 w-auto"
            style={{ minWidth: '300px' }}
          />
        </div>
      </div>
      {/* <div className="text-center text-xs text-white opacity-80">
        &copy; {new Date().getFullYear()} Expo Ecell. All rights reserved.
      </div> */}
    </footer>
  );
};

export default Footer;
