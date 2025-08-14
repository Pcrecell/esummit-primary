
const About = () => {
  return (
    <div
      className="relative w-screen h-screen flex flex-col bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('https://ik.imagekit.io/admr8uj75/about_expo_back.jpg?updatedAt=1755023018474')"
      }}
    >
      {/* Optional overlay for better text readability */}
      {/* Top and bottom linear black gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      {/* Top Centered Title */}
      <div className="relative z-50 w-full flex flex-col items-center pt-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center z-10 p-2" style={{ fontFamily: 'Inter, sans-serif' }}>About <span className="text-green-400">Esummit's</span> Expo</h1>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center pt-10">
        <img 
          src="https://ik.imagekit.io/admr8uj75/download%20(27)%201.png?updatedAt=1754908109030" 
          alt="About Expo Divider" 
          className="mx-auto max-w-xs md:max-w-md lg:max-w-lg h-auto -mt-8 mb-6"
          style={{ zIndex: 1, position: 'relative' }}
        />
        {/* Poster */}
          <img 
            src="https://ik.imagekit.io/admr8uj75/Alice%20in%20founderland%203.png?updatedAt=1754908108848" 
            alt="poster" 
            className="mx-auto max-w-[250px] md:max-w-[300px] lg:max-w-[400px] h-auto mt-2 mb-6"
            style={{ zIndex: 5, position: 'absolute', top: '4rem' }}
          />
          {/* Center-Script */}
          <img 
            src="https://ik.imagekit.io/admr8uj75/Frame%20262.png?updatedAt=1755031313930" 
            alt="Center-Script" 
            className="mx-auto max-w-[450px] md:max-w-[650px] lg:max-w-[750px] h-auto mt-2 mb-6 absolute"
            style={{ 
              zIndex: 5,
              top: '22rem'
            }}
          />
          
          {/* Desktop positioning override */}
          <style jsx>{`
            @media (min-width: 768px) {
              img[alt="Center-Script"] {
                top: 27rem !important;
              }
            }
          `}</style>
          
          
      </div>
    </div>
  );
};

export default About;
