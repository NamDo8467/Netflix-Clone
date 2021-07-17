import React, { useState } from "react";
import "./Home.css";
import backgroundImage from "../images/background.jpg";
import rightArrow from "../images/chevron-right-white.png";
import mobileImage from "../images/mobile.jpg";
import kidImage from "../images/kid.png";
import tvImage from "../images/tv.png";

import NavBar from "../NavBar/NavBar";
//cc803c8c2a7e8fddea1b3ff64514f0b4
function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const showAnswer = (answerNumber, plusIconNumber, xIconNumber) => {
    const question = document.querySelector(".question");
    const answer = document.querySelector(`.${answerNumber}`);
    const plusIcon = document.querySelector(`.${plusIconNumber}`);
    const xIcon = document.querySelector(`.${xIconNumber}`);

    if (isClicked) {
      answer.style.display = "block";
      // answer.style.userSelect = "text"
      // plusIcon.style.userSelect = "none"
      plusIcon.style.transform = "rotate(-45deg)";
    
      plusIcon.style.transition = "transform";
      

      setIsClicked(false);
    } else {
      
      // answer.style.userSelect = "none"

      plusIcon.style.transform = "rotate(90deg)";
      plusIcon.style.transition = "transform";

      answer.style.display = "none";

      setIsClicked(true);
    }
  };

  return (
    <>
      <section className="section1">
        <NavBar />

        <div className="intro">
          <div className="headers">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
          </div>
          <div className="try-30-days-free">
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div>
              <input type="text" placeholder="Enter your email address..." />
              <button>
                Try 30 days free
                <img src={rightArrow} alt="right arrow" height="25px" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section2 sections-common-things">
        <div className="title">
          <h1>Enjoy on your TV</h1>
          <h2>
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </h2>
        </div>
        <div className="tv-image">
          <img src={tvImage} alt="TV" />
        </div>
      </section>

      <section className="section3 sections-common-things">
        <div className="mobile-image">
          <img src={mobileImage} alt="mobile" />
        </div>
        <div className="title">
          <h1>Download your shows to watch offline</h1>
          <h2>Save your favorites easily and always have something to watch</h2>
        </div>
      </section>

      <section className="section4">
        <div className="title">
          <h1>Watch everywhere</h1>
          <h2>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </h2>
        </div>
      </section>

      <section className="section6 sections-common-things">
        <div className="kid-image">
          <img src={kidImage} alt="kid" />
        </div>
        <div className="title">
          <h1>Create profiles for kids</h1>
          <h2>
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </h2>
        </div>
      </section>

      <section className="section7 faqs">
        <div>
          <h1 className="faqs-title">Frequently Asked Questions</h1>
        </div>
        <div className="questions-answers-container">
          <div className="question-container">
            <div
              className="question"
              onClick={() => showAnswer("answer1", "plus-icon-1", "x-icon-1")}
            >
              What is NetFlix?
              <span className="plus-icon plus-icon-1">&#43;</span>
            </div>
            <div  unselectable="on"  className=" answer answer1">
              Netflix is a streaming service that offers a wide variety of
              award-winning TV shows, movies, anime, documentaries, and more on
              thousands of internet-connected devices. You can watch as much as
              you want, whenever you want without a single commercial – all for
              one low monthly price. There's always something new to discover
              and new TV shows and movies are added every week!
            </div>
          </div>
          <div className="question-container">
            <div
              className="question"
              onClick={() => showAnswer("answer2", "plus-icon-2", "x-icon-2")}
            >
              How much does Netflix cost?
              <span className="plus-icon plus-icon-2">&#43;</span>
            </div>
            <div className=" answer answer2">
              Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
              streaming device, all for one fixed monthly fee. Plans range from
              70,000 ₫ to 260,000 ₫ a month. No extra costs, no contracts.
            </div>
          </div>

          <div className="question-container">
            <div
              className="question"
              onClick={() => showAnswer("answer3", "plus-icon-3", "x-icon-3")}
            >
              Where can I watch?
              <span className="plus-icon plus-icon-3">&#43;</span>
            </div>
            <div className=" answer answer3">
              <p>
                Watch anywhere, anytime, on an unlimited number of devices. Sign
                in with your Netflix account to watch instantly on the web at
                netflix.com from your personal computer or on any
                internet-connected device that offers the Netflix app, including
                smart TVs, smartphones, tablets, streaming media players and
                game consoles.
              </p>
              <p>
                You can also download your favorite shows with the iOS, Android,
                or Windows 10 app. Use downloads to watch while you're on the go
                and without an internet connection. Take Netflix with you
                anywhere.
              </p>
            </div>
          </div>

          <div className="question-container">
            <div
              className="question"
              onClick={() => showAnswer("answer4", "plus-icon-4", "x-icon-4")}
            >
              How do I cancel?
              <span className="plus-icon plus-icon-4">&#43;</span>
            </div>
            <div className=" answer answer4">
              Netflix is flexible. There are no pesky contracts and no
              commitments. You can easily cancel your account online in two
              clicks. There are no cancellation fees – start or stop your
              account anytime.
            </div>
          </div>

          <div className="question-container">
            <div
              className="question"
              onClick={() => showAnswer("answer5", "plus-icon-5", "x-icon-5")}
            >
              What can I watch on Netflix?
              <span className="plus-icon plus-icon-5">&#43;</span>
            </div>
            <div className=" answer answer5">
              Netflix has an extensive library of feature films, documentaries,
              TV shows, anime, award-winning Netflix originals, and more. Watch
              as much as you want, anytime you want.
            </div>
          </div>

          <div className="question-container">
            <div
              className="question"
              onClick={() => showAnswer("answer6", "plus-icon-6", "x-icon-6")}
            >
              Is Netflix good for kids?
              <span className="plus-icon plus-icon-6">&#43;</span>
            </div>
            <div className=" answer answer6">
              <p>
                The Netflix Kids experience is included in your membership to
                give parents control while kids enjoy family-friendly TV shows
                and movies in their own space.
              </p>
              <p>
                Kids profiles come with PIN-protected parental controls that let
                you restrict the maturity rating of content kids can watch and
                block specific titles you don’t want kids to see.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section8">
        <h1>New things</h1>
      </section>
    </>
  );
}

export default Home;
