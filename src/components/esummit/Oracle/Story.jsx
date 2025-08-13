"use client";

export default function Story() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://ik.imagekit.io/tm5te9cjl/Medusa_Statue_Animation_with_Subtle_Parallax%20(1).mp4?updatedAt=1755029381058" // Replace with your Cloudinary video link
          type="video/mp4"
        />
      </video>
    </div>
  );
}
