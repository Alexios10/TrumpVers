const HomePage = () => {
  return (
    <section className="flex flex-col items-center py-10">
      <div className="relative">
        <img
          src="src/assets/image/TrumpIntro.png"
          alt="Trumpverse Intro"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />

        <div className="absolute top-20 left-8 flex flex-col w-1/3 text-white text-left p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Trumpverse</h1>
          <p className="text-2xl mb-6 max-w-2xl">
            Immerse yourself in our exclusive collection of premium merchandise,
            thought-provoking insights, and innovative ideas.
          </p>
        </div>

        <div className="absolute bottom-56 left-8 flex flex-col w-1/4 text-white text-left p-8">
          <blockquote className="text-2xl italic mb-4">
            "The best way to predict the future is to create it."
          </blockquote>
          <p className="font-semibold text-lg">- Donald Trump</p>
        </div>

        <div className="absolute bottom-0 left-0 w-1/2 h-1/6 bg-red-900 opacity-75 text-white flex items-center justify-center p-4">
          <div className="text-center">
            <h3 className="text-xl">JOIN OUR MOVEMENT!</h3>
            <h1 className="text-2xl font-bold">TEXT TRUMP TO 88022!</h1>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/2 h-1/6 bg-blue-900 opacity-75 text-white flex items-center justify-center p-4">
          <div className="text-center">
            <h3 className="text-xl">
              SUPPORT DONALD J. TRUMP, THE 45TH PRESIDENT OF THE UNITED STATES
            </h3>
          </div>
        </div>
      </div>

      <div className="w-full text-blue-950 py-8 mt-2">
        <div className="max-w-6xl ml-4">
          <p className="text-lg mb-6">
            We’d love to hear from you! For inquiries, support, or feedback,
            feel free to get in touch.
          </p>
          <p className="text-lg mb-2">
            Email:{" "}
            <a href="mailto:contact@trumpverse.com" className="text-blue-400">
              contact@trumpverse.com
            </a>
          </p>
          <p className="text-lg">
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-400">
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
