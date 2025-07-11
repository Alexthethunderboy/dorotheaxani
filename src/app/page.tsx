

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl">
        <video
          className="w-full aspect-video rounded-xl shadow-2xl"
          controls
          poster="/videos/thumbnail.jpg"
          playsInline
        >
          <source src="/videos/wedding.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
}
