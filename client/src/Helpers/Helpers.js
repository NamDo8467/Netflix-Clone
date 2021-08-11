import axios from "axios";
import playButton from "../images/play-button-icon.png";
import closeButton from "../images/close_icon.png";
import userIcon from "../images/userIcon.png";

const screenWidth = window.screen.width;

const playTrailer = (videoID = `XZ8daibM3AE`) => {
  const iframeContainer = document.createElement("div");
  iframeContainer.className = "iframe-container";
  const iframe = document.createElement("iframe");

  iframe.setAttribute("scrolling", "yes");

  iframe.src = `https://www.youtube.com/embed/${videoID}`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

  iframe.allowFullscreen = "true";
  iframe.style.height = "500px";
  iframe.style.marginTop = "50px";
  iframeContainer.appendChild(iframe);

  const section = document.querySelector("section");

  section.append(iframeContainer);

  let iframeHorizontal =
    iframe.getBoundingClientRect().left + iframe.offsetWidth;
  let iframeVertical = iframe.getBoundingClientRect().top + iframe.offsetHeight;

  document.addEventListener("click", (e) => {
    if (e.clientX > iframeHorizontal || e.clientY > iframeVertical) {
      iframeContainer.remove();
    } else {
      return;
    }
  });

  setTimeout(() => {
    if (!document.querySelector("iframe")) {
      alert("Trailer is unavailable");
    }
  }, 1000);
};

const displayDetailsButton = (e) => {
  // const EventListenerMode = { capture: true };

  e.target.style.transform = "scale(1.2)";
  e.target.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
  e.target.style.opacity = "0.9";

  const detail = e.target.nextSibling;
  detail.style.opacity = "1";
  detail.style.transition = "opacity 0.5s ease-out";

  if (screenWidth <= 800) {
    setTimeout(() => {
      closeDetailsButton(e);
    }, 700);
  }
};
const closeDetailsButton = (e) => {
  e.target.style.transform = "scale(1)";
  e.target.style.transition = "transform 0.3s ease-out";
  e.target.style.opacity = "1";

  const detailButton = e.target.nextSibling;
  detailButton.style.opacity = "0 ";
  detailButton.style.transition = "opacity 0.5s ease-out";
};

const hoverOverDetailsButton = (e) => {
  e.target.style.opacity = "1";
  e.target.style.transition = "opacity 0.5s ease-out";
  e.target.previousSibling.style.transform = "scale(1.2)";
  e.target.previousSibling.style.opacity = "0.9";
  e.target.previousSibling.style.transition =
    "transform 0.5s ease-out, opacity 0.5s ease-out";
};

const createOverviewSection = async (
  tvShowName,
  tvShowOverview = "No review",
  tvShowBackdropPath,
  tvShowID,
  event
) => {
  const overviewSection = document.createElement("section");
  overviewSection.className = "overview-section";

  const overview = document.createElement("div");
  overview.className = "overview";

  const overviewTitle = document.createElement("h2");
  overviewTitle.className = "overview-title";
  overviewTitle.textContent = tvShowName;

  const overviewContent = document.createElement("div");
  overviewContent.className = "overview-content";
  overviewContent.textContent = tvShowOverview;

  const overviewPlayButton = document.createElement("button");
  overviewPlayButton.className = "play-trailer-button";
  const playButtonImg = document.createElement("img");
  playButtonImg.className = "play-trailer-button-icon";
  playButtonImg.src = `${playButton}`;
  const playButtonText = document.createElement("p");
  playButtonText.textContent = "Play";

  overviewPlayButton.appendChild(playButtonImg);
  overviewPlayButton.appendChild(playButtonText);

  overview.appendChild(overviewTitle);
  overview.appendChild(overviewContent);
  overview.appendChild(overviewPlayButton);

  const overviewImage = document.createElement("img");
  overviewImage.className = "overview-image";
  overviewImage.src = `https://image.tmdb.org/t/p/w500/${tvShowBackdropPath}`;
  overviewImage.alt = `${tvShowName}`;

  const overviewCloseButton = document.createElement("img");
  overviewCloseButton.className = "close-overview-button";
  overviewCloseButton.src = `${closeButton}`;

  const imageAndCloseButton = document.createElement("div");
  imageAndCloseButton.className = "image-and-close-button";
  imageAndCloseButton.appendChild(overviewImage);
  imageAndCloseButton.appendChild(overviewCloseButton);

  overviewSection.appendChild(overview);
  overviewSection.appendChild(imageAndCloseButton);

  event.target.parentNode.parentNode.parentNode.after(overviewSection);

  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${tvShowID}/videos?api_key=cc803c8c2a7e8fddea1b3ff64514f0b4&language=en-US`
  );

  const videoID = response.data.results.filter((result) => {
    return result.type === "Trailer";
  })[0];

  if (videoID) {
    overviewPlayButton.addEventListener("click", () => {
      playTrailer(videoID.key);
    });
  } else {
    overviewPlayButton.addEventListener("click", () => {
      alert("No trailer");
    });
  }

  overviewCloseButton.addEventListener("click", (e) => {
    const targetSection = e.target.parentNode.parentNode.previousSibling.className
    document.querySelector(`.${targetSection}`).scrollIntoView()
    document.querySelector(".overview-section").remove();
    
  });
};
const displayOverview = (
  tvShowName,
  tvShowOverview = "No review",
  tvShowBackdropPath,
  tvShowID,
  event
) => {
  if (document.querySelector(".overview-section")) {
    document.querySelector(".overview-section").remove();
    createOverviewSection(
      tvShowName,
      tvShowOverview,
      tvShowBackdropPath,
      tvShowID,
      event
    );
    event.target.style.opacity = "0";
    event.target.previousElementSibling.style.transform = "scale(1)";

    document.querySelector(".overview-section").scrollIntoView();
  } else {
    createOverviewSection(
      tvShowName,
      tvShowOverview,
      tvShowBackdropPath,
      tvShowID,
      event
    );
    event.target.style.opacity = "0";
    event.target.previousElementSibling.style.transform = "scale(1)";

    document.querySelector(".overview-section").scrollIntoView();
  }
};

const displayLogout = () => {
  const logoutContainer = document.querySelector(".logout");
  if (screenWidth <= 800) {
    logoutContainer.style.visibility = "visible";
    setTimeout(() => {
      logoutContainer.style.visibility = "hidden";
    }, 1000);
  } else {
    if (logoutContainer.style.visibility == "visible") {
      logoutContainer.style.visibility = "hidden";
    } else {
      logoutContainer.style.visibility = "visible";
    }
  }
};

const addDefaultSrc = (event) => {
  event.target.src = `${userIcon}`;
};
const clickToDisplayDetail = () => {};
export {
  screenWidth,
  displayDetailsButton,
  closeDetailsButton,
  createOverviewSection,
  displayOverview,
  hoverOverDetailsButton,
  playTrailer,
  displayLogout,
  addDefaultSrc,
};
