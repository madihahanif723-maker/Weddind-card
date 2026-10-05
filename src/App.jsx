import React, { useEffect, useState } from "react";

const weddingData = {
  brideName: "Ayesha",
  groomName: "Ahmed",

  weddingDate: "2027-02-14T19:00:00",

  dateText: "14 February 2027",
  dayText: "Sunday",
  timeText: "7:00 PM",

  venue: "The Grand Pearl Banquet",
  address: "Karachi, Pakistan",

  phone: "03001234567",
  whatsapp: "923001234567",
};

const events = [
  {
    title: "Mehndi",
    date: "12 February 2027",
    time: "7:00 PM",
    icon: "🌸",
    description:
      "An evening filled with colors, flowers, music and beautiful memories.",
    map: "https://maps.google.com/",
  },
  {
    title: "Baraat",
    date: "14 February 2027",
    time: "7:00 PM",
    icon: "💍",
    description:
      "Join us as we celebrate the beautiful beginning of our new journey.",
    map: "https://maps.google.com/",
  },
  {
    title: "Walima",
    date: "15 February 2027",
    time: "7:30 PM",
    icon: "🥂",
    description:
      "A graceful evening of happiness, family, friends and togetherness.",
    map: "https://maps.google.com/",
  },
];

const galleryImages = [
  {
    image: "src/assets/gallery1.png",
    title: "Beautiful Memories",
  },
  {
    image: "src/assets/gallery2.png",
    title: "Together Forever",
  },
  {
    image: "src/assets/gallery3.png",
    title: "A Beautiful Beginning",
  },
  {
    image: "src/assets/gallery4.png",
    title: "Love & Happiness",
  },
  {
    image: "src/assets/gallery5.png",
    title: "Our Special Day",
  },
  {
    image: "src/assets/gallery6.png",
    title: "Forever & Always",
  },
];

function App() {
  // envelope -> opening -> video -> card
  const [introStep, setIntroStep] = useState("envelope");

  const [musicPlaying, setMusicPlaying] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [rsvp, setRsvp] = useState({
    name: "",
    guests: "1",
    attendance: "Yes, I will attend",
    message: "",
  });

  const [rsvpSaved, setRsvpSaved] = useState(false);

  // =========================================
  // OPEN ENVELOPE
  // =========================================

  function openEnvelope() {
    setIntroStep("opening");

    // Music starts from the envelope click.
    // This is more reliable because browser allows
    // audio after a real user click.

    const music = document.getElementById("weddingMusic");

    if (music) {
      music
        .play()
        .then(() => {
          setMusicPlaying(true);
        })
        .catch(() => {
          setMusicPlaying(false);
        });
    }

    setTimeout(() => {
      setIntroStep("video");
    }, 1200);
  }

  // =========================================
  // VIDEO END
  // =========================================

  function handleVideoEnd() {
    setIntroStep("card");
  }

  // =========================================
  // MUSIC
  // =========================================

  function toggleMusic() {
    const music = document.getElementById("weddingMusic");

    if (!music) return;

    if (music.paused) {
      music
        .play()
        .then(() => {
          setMusicPlaying(true);
        })
        .catch(() => {
          setMusicPlaying(false);
        });
    } else {
      music.pause();
      setMusicPlaying(false);
    }
  }

  // =========================================
  // COUNTDOWN
  // =========================================

  useEffect(() => {
    function calculateCountdown() {
      const weddingTime = new Date(
        weddingData.weddingDate
      ).getTime();

      const currentTime = new Date().getTime();

      const difference = weddingTime - currentTime;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }

    calculateCountdown();

    const timer = setInterval(
      calculateCountdown,
      1000
    );

    return () => clearInterval(timer);
  }, []);

  // =========================================
  // RSVP
  // =========================================

  function handleRSVP(e) {
    e.preventDefault();

    localStorage.setItem(
      "weddingRSVP",
      JSON.stringify(rsvp)
    );

    setRsvpSaved(true);

    setTimeout(() => {
      setRsvpSaved(false);
    }, 3000);

    setRsvp({
      name: "",
      guests: "1",
      attendance: "Yes, I will attend",
      message: "",
    });
  }

  // =========================================
  // SHARE
  // =========================================

  function shareInvitation() {
    if (navigator.share) {
      navigator
        .share({
          title: `${weddingData.brideName} & ${weddingData.groomName}`,
          text: "You are warmly invited to celebrate our special day with us.",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(
        window.location.href
      );

      alert("Invitation link copied!");
    }
  }

  // =========================================
  // SCROLL
  // =========================================

  function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  // =========================================
  // INTRO - ENVELOPE
  // =========================================

  if (
    introStep === "envelope" ||
    introStep === "opening"
  ) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#DCCCC2] px-5">

        {/* Background Glow */}

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#BF9248]/40 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#A08B64]/30 blur-3xl" />

        {/* Decorative Flowers */}

        <div className="pointer-events-none absolute left-5 top-8 text-5xl opacity-50">
          🌿
        </div>

        <div className="pointer-events-none absolute right-5 top-12 text-5xl opacity-50">
          🌸
        </div>

        <div className="pointer-events-none absolute bottom-10 left-7 text-5xl opacity-40">
          🌿
        </div>

        <div className="pointer-events-none absolute bottom-12 right-7 text-5xl opacity-40">
          🌷
        </div>
        {/* =====================================
          MUSIC
      ===================================== */}

      <audio id="weddingMusic" loop>
        <source
          src="src/assets/wedding-music.mp3"
          type="audio/mpeg"
        />
      </audio>
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#BF9248]/50 bg-[#FFF9F3]/90 text-xl shadow-xl backdrop-blur-md transition duration-300 hover:scale-110"
        title="Music"
      >
        {musicPlaying ? "🔊" : "🎵"}
      </button>

        {/* CLICKABLE ENVELOPE */}

        <button
          onClick={openEnvelope}
          disabled={introStep === "opening"}
          className="group relative h-[350px] w-[320px] cursor-pointer outline-none sm:h-[400px] sm:w-[370px]"
        >

          {/* Shadow */}

          <div className="absolute bottom-1 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-full bg-[#9A6C2A]/20 blur-xl" />

          {/* Envelope Body */}

          <div className="absolute bottom-0 left-0 h-[72%] w-full rounded-b-[24px] rounded-t-[8px] border border-[#BF9248] bg-[#F4ECE5] shadow-2xl">

            {/* Inner Paper */}

            <div className="absolute left-1/2 top-7 flex h-[78%] w-[82%] -translate-x-1/2 items-center justify-center rounded-lg border border-[#DCCCC2] bg-[#FFF9F3]">

              <div className="text-center">

                <div className="text-4xl text-[#BF9248]">
                  ❦
                </div>

                <p className="mt-4 font-serif text-2xl tracking-[0.25em] text-[#9A6C2A]">
                  A & A
                </p>

                <div className="mt-4 text-lg text-[#BF9248]">
                  ♡
                </div>

              </div>

            </div>

          </div>

          {/* Envelope Flap */}

          <div
            className={`absolute left-0 top-[28%] z-20 h-0 w-0 border-l-[160px] border-r-[160px] border-t-[125px] border-l-transparent border-r-transparent border-t-[#DCCCC2] transition-all duration-1000 ease-in-out sm:border-l-[185px] sm:border-r-[185px] sm:border-t-[145px] ${
              introStep === "opening"
                ? "-translate-y-28 rotate-x-180 opacity-70"
                : ""
            }`}
          />

          {/* Front Fold */}

          <div className="absolute bottom-0 left-0 z-10 h-[72%] w-full overflow-hidden rounded-b-[24px]">

            <div className="absolute bottom-0 left-0 h-full w-full">

              <div className="absolute bottom-0 left-0 h-0 w-0 border-b-[250px] border-r-[160px] border-b-[#E8D9CC] border-r-transparent sm:border-b-[290px] sm:border-r-[185px]" />

              <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[250px] border-l-[160px] border-b-[#E8D9CC] border-l-transparent sm:border-b-[290px] sm:border-l-[185px]" />

            </div>

          </div>

          {/* Wax Seal */}

          <div
            className={`absolute bottom-[28%] left-1/2 z-30 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#BF9248] bg-[#9A6C2A] text-2xl text-white shadow-xl transition duration-700 ${
              introStep === "opening"
                ? "scale-75 opacity-0"
                : "group-hover:scale-110"
            }`}
          >
            A
          </div>

        </button>

      </div>
    );
  }

  // =========================================
  // VIDEO INTRO
  // =========================================

  if (introStep === "video") {
    return (
      <div className="fixed inset-0 z-50 bg-black">

        <video
          className="h-full w-full object-cover"
          src="src/assets/wedding_invitation_Ayesha_Ahmed.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />

      </div>
    );
  }

  // =========================================
  // MAIN WEBSITE
  // =========================================

  return (
    <div className="min-h-screen bg-[url('src/assets/background.png')] bg-contain bg-center bg-no-repeat">

      

      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#BF9248]/40 blur-3xl" />

        <div className="absolute -right-24 top-[15%] h-96 w-96 rounded-full bg-[#DCCCC2]/40 blur-3xl" />

        <div className="absolute bottom-[5%] left-[10%] h-80 w-80 rounded-full bg-[#A08B64]/25 blur-3xl" />

        <div className="absolute bottom-[20%] right-[10%] h-72 w-72 rounded-full bg-[#DCCCC2]/30 blur-3xl" />

      </div>
      <audio id="weddingMusic" loop>
        <source
          src="src/assets/wedding-music.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* =====================================
          MUSIC BUTTON
      ===================================== */}

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#BF9248]/50 bg-[#FFF9F3]/90 text-xl shadow-xl backdrop-blur-md transition duration-300 hover:scale-110"
        title="Music"
      >
        {musicPlaying ? "🔊" : "🎵"}
      </button>

      {/* =====================================
          FLOATING NAVIGATION
      ===================================== */}

      <div className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-[#BF9248]/40 bg-[#FFF9F3]/90 px-3 py-2 shadow-xl backdrop-blur-md md:flex">

        <button
          onClick={() => scrollToSection("home")}
          className="rounded-full px-4 py-2 text-xs text-[#9A6C2A] transition hover:bg-[#E9DED4]"
        >
          Home
        </button>

        <button
          onClick={() => scrollToSection("story")}
          className="rounded-full px-4 py-2 text-xs text-[#9A6C2A] transition hover:bg-[#E9DED4]"
        >
          Story
        </button>

        <button
          onClick={() => scrollToSection("events")}
          className="rounded-full px-4 py-2 text-xs text-[#9A6C2A] transition hover:bg-[#E9DED4]"
        >
          Events
        </button>

        <button
          onClick={() => scrollToSection("gallery")}
          className="rounded-full px-4 py-2 text-xs text-[#9A6C2A] transition hover:bg-[#E9DED4]"
        >
          Gallery
        </button>

        <button
          onClick={() => scrollToSection("rsvp")}
          className="rounded-full bg-[#9A6C2A] px-4 py-2 text-xs text-white transition hover:bg-[#7C5422]"
        >
          RSVP
        </button>

      </div>

      {/* =====================================
          HERO
      ===================================== */}

      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center px-5 py-20"
      >

        {/* Floating Decorations */}

        <div className="absolute left-4 top-24 text-5xl opacity-50 animate-pulse">
          🌿
        </div>

        <div className="absolute right-5 top-28 text-5xl opacity-50 animate-pulse">
          🌸
        </div>

        <div className="absolute bottom-24 left-8 text-4xl opacity-50 animate-pulse">
          🌷
        </div>

        <div className="absolute bottom-20 right-8 text-5xl opacity-50 animate-pulse">
          🌿
        </div>

        <div className="relative w-full max-w-3xl">

          <div className="rounded-[40px] border border-[#BF9248]/50 bg-gradient-to-br from-[#FFF9F3]/95 via-[#F4ECE5]/90 to-[#DCCCC2]/80 p-5 shadow-2xl backdrop-blur-xl md:p-8">

            <div className="rounded-[32px] border border-[#BF9248]/40 bg-gradient-to-b from-[#FFF9F3] via-[#F4ECE5] to-[#DCCCC2]/70 px-5 py-12 text-center md:px-12 md:py-16">

              <p className="mb-5 text-xs uppercase tracking-[0.5em] text-[#A08B64]">
                Together with their families
              </p>

              <p className="mb-5 text-4xl text-[#9A6C2A]">
                ❦
              </p>

              <p className="text-sm uppercase tracking-[0.4em] text-[#A08B64]">
                You are invited to celebrate
              </p>

              <h1 className="mt-7 font-serif text-5xl leading-tight text-[#5E4634] md:text-7xl">
                {weddingData.brideName}
              </h1>

              <div className="my-4 text-3xl font-light text-[#BF9248]">
                &
              </div>

              <h1 className="font-serif text-5xl leading-tight text-[#5E4634] md:text-7xl">
                {weddingData.groomName}
              </h1>

              {/* MAIN COUPLE IMAGE */}

              <div className="mx-auto mt-8 flex h-[300px] w-[175px] items-center justify-center overflow-hidden rounded-[15px] border border-[#BF9248]/60 bg-[#FFF9F3] shadow-xl">

                <img
                  src="src/assets/gallery2.png"
                  alt="Bride and Groom"
                  className="h-full w-full object-contain transition duration-700 hover:scale-105"
                />

              </div>

              <p className="mt-8 font-serif text-2xl text-[#9A6C2A]">
                Save the Date
              </p>

              <div className="mx-auto mt-5 flex max-w-lg flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] text-[#A08B64]">

                <span>
                  {weddingData.dayText}
                </span>

                <span>•</span>

                <span>
                  {weddingData.dateText}
                </span>

                <span>•</span>

                <span>
                  {weddingData.timeText}
                </span>

              </div>

              <div className="mt-9 flex flex-wrap justify-center gap-3">

                <button
                  onClick={() =>
                    scrollToSection("story")
                  }
                  className="rounded-full bg-gradient-to-r from-[#9A6C2A] via-[#BF9248] to-[#A08B64] px-7 py-3 text-sm text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:brightness-105"
                >
                  Our Story
                </button>

                <button
                  onClick={() =>
                    scrollToSection("events")
                  }
                  className="rounded-full border border-[#BF9248] bg-white/70 px-7 py-3 text-sm text-[#9A6C2A] transition duration-300 hover:-translate-y-1 hover:bg-[#E9DED4]"
                >
                  Wedding Details
                </button>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          COUNTDOWN
      ===================================== */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-5xl rounded-[35px] border border-[#BF9248]/45 bg-gradient-to-br from-[#FFF9F3]/95 via-[#F4ECE5]/90 to-[#DCCCC2]/75 p-8 text-center shadow-xl backdrop-blur-md md:p-12">

          <p className="text-xs uppercase tracking-[0.4em] text-[#A08B64]">
            Counting the moments
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#5E4634] md:text-5xl">
            Until Our Big Day
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

            <CountdownBox
              number={timeLeft.days}
              text="Days"
            />

            <CountdownBox
              number={timeLeft.hours}
              text="Hours"
            />

            <CountdownBox
              number={timeLeft.minutes}
              text="Minutes"
            />

            <CountdownBox
              number={timeLeft.seconds}
              text="Seconds"
            />

          </div>
        </div>
      </section>

      {/* =====================================
          STORY
      ===================================== */}

      <section
        id="story"
        className="px-5 py-20"
      >

        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

          <div className="overflow-hidden rounded-[35px] border border-[#BF9248]/60 bg-[#FFF9F3] p-3 shadow-xl">

            <img
              src="src/assets/story .png"
              alt="Our Story"
              className="h-[450px] w-full rounded-[28px] object-cover animate-pulse"
            />

          </div>

          <div>

            <p className="text-sm uppercase tracking-[0.4em] text-[#A08B64]">
              Our Story
            </p>

            <h2 className="mt-4 font-serif text-5xl text-[#5E4634]">
              A Journey of Love
            </h2>

            <div className="my-6 text-3xl text-[#a89565]">
              ❦
            </div>

            <p className="leading-8 text-[#76583D]">
              Some beautiful stories begin unexpectedly, and ours
              began with two hearts finding their way toward each
              other. Through countless conversations, smiles,
              memories and dreams, our journey became something
              truly special.
            </p>

            <p className="mt-5 leading-8 text-[#76583D]">
              Now we are beginning a beautiful new chapter
              together, surrounded by the people we love most.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================
          EVENTS
      ===================================== */}

      <section
        id="events"
        className="px-5 py-20"
      >

        <div className="mx-auto max-w-6xl text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-[#A08B64]">
            Wedding Celebrations
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#5E4634]">
            Join Us
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {events.map((event, index) => (
              <div
                key={index}
                className="rounded-[30px] border border-[#D0B58F]/70 bg-gradient-to-br from-[#FFF9F3]/95 via-[#F4ECE5]/90 to-[#DCCCC2]/65 p-7 shadow-xl backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >

                <div className="text-5xl">
                  {event.icon}
                </div>

                <h3 className="mt-5 font-serif text-3xl text-[#6F4C2A]">
                  {event.title}
                </h3>

                <p className="mt-4 text-sm text-[#A08B64]">
                  {event.date}
                </p>

                <p className="mt-1 text-sm text-[#A08B64]">
                  {event.time}
                </p>

                <p className="mt-5 text-sm leading-7 text-[#76583D]">
                  {event.description}
                </p>

                <a
                  href={event.map}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-full border border-[#BF9248] px-6 py-2 text-sm text-[#9A6C2A] transition hover:bg-[#E9DED4]"
                >
                  📍 View Location
                </a>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================
          FLORAL VENUE IMAGE
      ===================================== */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-[#BF9248]/60 bg-[#FFF9F3] p-3 shadow-2xl">

          <div className="relative overflow-hidden rounded-[32px]">

            <img
              src="src/assets/floral-gate.png"
              alt="Wedding Floral Decor"
              className="h-[600px] w-full object-cover transition duration-1000 hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#6A4A2B]/70 to-transparent p-8 text-center">

              <p className="text-sm uppercase tracking-[0.4em] text-white">
                The Wedding Venue
              </p>

              <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">
                {weddingData.venue}
              </h2>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================
          INVITATION MESSAGE
      ===================================== */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-4xl rounded-[40px] border border-[#D0B58F]/70 bg-gradient-to-br from-[#FFF9F3]/95 via-[#F4ECE5]/90 to-[#DCCCC2]/65 px-7 py-16 text-center shadow-xl backdrop-blur-md md:px-16">

          <div className="text-4xl text-[#a89565]">
            ❦
          </div>

          <p className="mt-7 font-serif text-3xl leading-relaxed text-[#6F4C2A] md:text-4xl">
            "Two hearts, one beautiful journey,
            and a lifetime of memories waiting
            to be made."
          </p>

          <p className="mt-8 text-sm uppercase tracking-[0.35em] text-[#A08B64]">
            We would love to celebrate with you
          </p>

        </div>

      </section>

      {/* =====================================
          VENUE
      ===================================== */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-5xl rounded-[35px] border border-[#D0B58F]/70 bg-[#E8D9CC]/80 p-8 text-center shadow-xl md:p-14">

          <div className="text-5xl">
            📍
          </div>

          <p className="mt-5 text-sm uppercase tracking-[0.4em] text-[#A08B64]">
            The Venue
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#5E4634] md:text-5xl">
            {weddingData.venue}
          </h2>

          <p className="mt-5 text-[#76583D]">
            {weddingData.address}
          </p>

          <a
            href="https://maps.google.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-block rounded-full bg-[#9A6C2A] px-8 py-3 text-sm text-white shadow-lg transition hover:bg-[#7C5422]"
          >
            Open Google Maps
          </a>

        </div>

      </section>

      {/* =====================================
          GALLERY
      ===================================== */}

      <section
        id="gallery"
        className="px-5 py-20"
      >

        <div className="mx-auto max-w-6xl text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-[#A08B64]">
            Precious Moments
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#5E4634]">
            Our Gallery
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">

            {galleryImages.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  setSelectedImage(item.image)
                }
                className="group overflow-hidden rounded-[28px] border border-[#D0B58F]/70 bg-[#FFF9F3] p-2 shadow-lg"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-80 w-full rounded-[22px] object-cover transition duration-700 group-hover:scale-105"
                />

                <p className="px-2 py-4 text-sm text-[#9A6C2A]">
                  {item.title}
                </p>

              </button>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================
          LIGHTBOX
      ===================================== */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#4D3928]/85 px-5 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >

          <div className="relative max-w-4xl">

            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-[85vh] max-w-full rounded-[25px] object-contain shadow-2xl"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-[#5E4634]"
            >
              ×
            </button>

          </div>

        </div>
      )}

      {/* =====================================
          FAMILY
      ===================================== */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-[#A08B64]">
            With Love & Blessings
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#5E4634]">
            Our Families
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            <FamilyCard
              title="Bride's Family"
              names="Family & Loved Ones"
            />

            <FamilyCard
              title="Groom's Family"
              names="Family & Loved Ones"
            />

          </div>

        </div>
      </section>

      {/* =====================================
          DRESS CODE
      ===================================== */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-4xl rounded-[35px] border border-[#D0B58F]/70 bg-[#FFF9F3]/85 p-10 text-center shadow-xl">

          <div className="text-5xl">
            👗
          </div>

          <p className="mt-5 text-sm uppercase tracking-[0.4em] text-[#A08B64]">
            Dress Code
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#5E4634]">
            Elegant & Festive
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#76583D]">
            Come dressed in your favorite elegant festive attire
            and celebrate this beautiful evening with us.
          </p>

        </div>

      </section>

      {/* =====================================
          RSVP
      ===================================== */}

      <section
        id="rsvp"
        className="px-5 py-20"
      >

        <div className="mx-auto max-w-3xl rounded-[35px] border border-[#D0B58F]/70 bg-gradient-to-br from-[#FFF9F3]/95 via-[#F4ECE5]/90 to-[#DCCCC2]/65 p-8 shadow-xl backdrop-blur-md md:p-12">

          <div className="text-center">

            <p className="text-sm uppercase tracking-[0.4em] text-[#A08B64]">
              Kindly Respond
            </p>

            <h2 className="mt-4 font-serif text-5xl text-[#5E4634]">
              RSVP
            </h2>

          </div>

          <form
            onSubmit={handleRSVP}
            className="mt-10 space-y-5"
          >

            <input
              type="text"
              placeholder="Your Name"
              value={rsvp.name}
              onChange={(e) =>
                setRsvp({
                  ...rsvp,
                  name: e.target.value,
                })
              }
              required
              className="w-full rounded-2xl border border-[#D0B58F] bg-white/70 px-5 py-4 text-[#5E4634] outline-none placeholder:text-[#A08B64] focus:border-[#9A6C2A]"
            />

            <select
              value={rsvp.guests}
              onChange={(e) =>
                setRsvp({
                  ...rsvp,
                  guests: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-[#D0B58F] bg-white/70 px-5 py-4 text-[#5E4634] outline-none"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
            </select>

            <select
              value={rsvp.attendance}
              onChange={(e) =>
                setRsvp({
                  ...rsvp,
                  attendance: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-[#D0B58F] bg-white/70 px-5 py-4 text-[#5E4634] outline-none"
            >
              <option>
                Yes, I will attend
              </option>

              <option>
                Sorry, I cannot attend
              </option>
            </select>

            <textarea
              placeholder="Leave a message..."
              rows="4"
              value={rsvp.message}
              onChange={(e) =>
                setRsvp({
                  ...rsvp,
                  message: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-[#D0B58F] bg-white/70 px-5 py-4 text-[#5E4634] outline-none placeholder:text-[#A08B64] focus:border-[#9A6C2A]"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-[#9A6C2A] via-[#BF9248] to-[#A08B64] py-4 text-sm font-medium tracking-[0.2em] text-white shadow-lg transition hover:brightness-105"
            >
              SEND RSVP
            </button>

            {rsvpSaved && (
              <div className="rounded-2xl bg-[#E8D9CC] p-4 text-center text-sm text-[#6F4C2A]">
                Thank you! Your RSVP has been saved. 💕
              </div>
            )}

          </form>

        </div>

      </section>

      {/* =====================================
          IMPORTANT INFORMATION
      ===================================== */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-[#A08B64]">
            Good To Know
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#5E4634]">
            Important Information
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <InfoCard
              icon="⏰"
              title="Please Arrive"
              text="Please arrive 15–20 minutes before the event."
            />

            <InfoCard
              icon="📸"
              title="Capture Memories"
              text="Bring your smiles and cameras and celebrate with us."
            />

            <InfoCard
              icon="🌸"
              title="Celebrate"
              text="Your presence and blessings mean the world to us."
            />

          </div>

        </div>
      </section>

      {/* =====================================
          CONTACT
      ===================================== */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-4xl rounded-[35px] border border-[#D0B58F]/70 bg-[#E8D9CC]/85 p-10 text-center shadow-xl">

          <p className="text-sm uppercase tracking-[0.4em] text-[#A08B64]">
            Need Help?
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#5E4634]">
            Get In Touch
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <a
              href={`tel:${weddingData.phone}`}
              className="rounded-full bg-gradient-to-r from-[#9A6C2A] via-[#BF9248] to-[#A08B64] px-7 py-3 text-sm text-white shadow-lg transition hover:brightness-105"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/${weddingData.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#BF9248] bg-white/70 px-7 py-3 text-sm text-[#9A6C2A] transition hover:bg-[#E9DED4]"
            >
              💬 WhatsApp
            </a>

            <button
              onClick={shareInvitation}
              className="rounded-full border border-[#BF9248] bg-white/70 px-7 py-3 text-sm text-[#9A6C2A] transition hover:bg-[#E9DED4]"
            >
              📤 Share Invitation
            </button>

          </div>

        </div>
      </section>

      {/* =====================================
          FINAL
      ===================================== */}

      <section className="px-5 pb-16 pt-20">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[40px] border border-[#BF9248]/70 bg-[#7A552C] px-7 py-20 text-center text-[#fffdf5] shadow-2xl md:px-16">

          <div className="text-5xl text-[#BF9248]">
            ❦
          </div>

          <p className="mt-7 text-sm uppercase tracking-[0.4em] text-[#F4ECE5]">
            With Love
          </p>

          <h2 className="mt-5 font-serif text-5xl md:text-7xl">
            {weddingData.brideName}
          </h2>

          <p className="my-3 text-3xl text-[#BF9248]">
            &
          </p>

          <h2 className="font-serif text-5xl md:text-7xl">
            {weddingData.groomName}
          </h2>

          <p className="mx-auto mt-8 max-w-xl leading-8 text-[#F4ECE5]">
            Thank you for being a part of our beautiful journey.
            We cannot wait to celebrate this special day with you.
          </p>

          <div className="mt-10 text-3xl">
            🌿 ✨ 🌿
          </div>

        </div>

        <p className="mt-8 text-center text-xs text-[#A08B64]">
          Made with love • Wedding Invitation
        </p>

      </section>

    </div>
  );
}

// ==========================================
// COUNTDOWN BOX
// ==========================================

function CountdownBox({ number, text }) {
  return (
    <div className="rounded-[25px] border border-[#D0B58F]/70 bg-[#F4ECE5] p-5 shadow-md">

      <div className="font-serif text-4xl text-[#6F4C2A]">
        {String(number || 0).padStart(2, "0")}
      </div>

      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#A08B64]">
        {text}
      </p>

    </div>
  );
}

// ==========================================
// FAMILY CARD
// ==========================================

function FamilyCard({ title, names }) {
  return (
    <div className="rounded-[30px] border border-[#D0B58F]/70 bg-[#FFF9F3]/85 p-8 shadow-xl">

      <div className="text-4xl text-[#9A6C2A]">
        ❦
      </div>

      <h3 className="mt-5 font-serif text-3xl text-[#6F4C2A]">
        {title}
      </h3>

      <p className="mt-4 text-[#A08B64]">
        {names}
      </p>

    </div>
  );
}

// ==========================================
// INFO CARD
// ==========================================

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-[28px] border border-[#D0B58F]/70 bg-[#FFF9F3]/85 p-7 shadow-lg transition duration-300 hover:-translate-y-2">

      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="mt-5 font-serif text-2xl text-[#6F4C2A]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#A08B64]">
        {text}
      </p>

    </div>
  );
}

export default App;