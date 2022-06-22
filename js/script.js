"use strict";

/*-------------------------------
-------- SET MOUSE CLASS --------
-------------------------------*/
{
  const elementsWithHover = document.querySelectorAll(
    ".slider__arrow, .slide-item__more-toggler p"
  );

  if (
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
    elementsWithHover.forEach((item) => {
      if (item) {
        item.classList.remove("mouse");
      }
    });
  } else {
    elementsWithHover.forEach((item) => {
      if (item) {
        item.classList.add("mouse");
      }
    });
  }
}

/*-------------------------------
------------ SLIDER -------------
-------------------------------*/
{
  const sliderList = document.querySelector(".slider__list");
  const nextArrow = document.querySelector(".slider__arrow_next");
  const prevArrow = document.querySelector(".slider__arrow_prev");
  const sliderItems = Array.from(document.querySelectorAll(".slide-item"));
  let index = 0;
  let x;
  let x2;

  setActiveSlide(index);

  function setActiveSlide(indexOfSlide) {
    if (Array.isArray(sliderItems) && sliderItems.length > 1) {
      sliderItems.forEach((item) => {
        if (typeof item !== "undefined") {
          if (item.classList.contains("active")) {
            item.classList.remove("active");
          }
        }
      });
    } else {
      if (typeof sliderList !== "undefined") {
        sliderList.classList.add("disabled");
      }
      if (typeof prevArrow !== "undefined") {
        prevArrow.classList.add("disabled");
      }
      if (typeof nextArrow !== "undefined") {
        nextArrow.classList.add("disabled");
      }
    }

    if (
      Array.isArray(sliderItems) &&
      typeof sliderItems[indexOfSlide] !== "undefined"
    ) {
      // consts
      const currentSlide = sliderItems[indexOfSlide];
      currentSlide.classList.add("active");
      const moreToggler = currentSlide.querySelector(
        ".slide-item__more-toggler"
      );
      const content = currentSlide.querySelector(".slide-item__content");

      // vars
      let togglerState = false;

      // actions
      if (
        moreToggler &&
        typeof moreToggler !== "undefined" &&
        typeof moreToggler.querySelector("p") !== "undefined"
      ) {
        moreToggler.querySelector("p").textContent = "Show more";
      }

      if (content && typeof content !== "undefined") {
        for (let i = 0; i < content.children.length; i++) {
          if (i === 1 && typeof content.children[i] !== "undefined") {
            try {
              content.children[i].classList.add("mb-null");
            } catch {
              // console.log('error');
            }
          }
          if (i > 1 && typeof content.children[i] !== "undefined") {
            try {
              content.children[i].style.display = "none";
            } catch {
              // console.log('error');
            }
          }
        }
      }

      if (moreToggler && typeof moreToggler !== "undefined") {
        moreToggler.addEventListener("click", () => {
          if (!togglerState && content && typeof content !== "undefined") {
            for (let i = 0; i < content.children.length; i++) {
              if (i === 1 && typeof content.children[i] !== "undefined") {
                try {
                  content.children[i].classList.remove("mb-null");
                } catch {
                  // console.log('error');
                }
              }
              if (typeof content.children[i] !== "undefined") {
                try {
                  content.children[i].style.display = "block";
                } catch {
                  // console.log('error');
                }
              }
            }
            if (
              moreToggler.querySelector("p") &&
              typeof moreToggler.querySelector("p") !== undefined
            ) {
              moreToggler.querySelector("p").textContent = "Hide";
            }
          } else if (content && typeof content !== "undefined") {
            for (let i = 0; i < content.children.length; i++) {
              if (i === 1 && typeof content.children[i] !== "undefined") {
                try {
                  content.children[i].classList.add("mb-null");
                } catch {
                  // console.log('error');
                }
              }
              if (i > 1 && typeof content.children[i] !== "undefined") {
                try {
                  content.children[i].style.display = "none";
                } catch {
                  // console.log('error');
                }
              }
            }
            if (
              moreToggler.querySelector("p") &&
              typeof moreToggler.querySelector("p") !== undefined
            ) {
              moreToggler.querySelector("p").textContent = "Show more";
            }
          }
          togglerState = !togglerState;
        });
      }
    }
  }

  const setNextItem = () => {
    if (index < sliderItems.length - 1) {
      index++;
      setActiveSlide(index);
    } else {
      index = 0;
      setActiveSlide(index);
    }
  };

  const setPrevItem = () => {
    if (index > 0) {
      index--;
      setActiveSlide(index);
    } else {
      index = sliderItems.length - 1;
      setActiveSlide(index);
    }
  };

  /** Translate slide-item and swipe */
  if (Array.isArray(sliderItems) && sliderItems.length > 1) {
    sliderItems.forEach((item) => {
      item.addEventListener("touchstart", (e) => {
        x = e.changedTouches[0].clientX;
      });
      item.addEventListener("touchmove", (e) => {
        x2 = e.changedTouches[0].clientX;
        let xDiff = Math.floor((x2 - x) * 2);
        if (xDiff > 60 || xDiff < -60) {
          item.style.transform = `translateX(${xDiff}px)`;
        } else {
          item.style.transform = "translateX(0)";
        }
        if (xDiff > 120 || xDiff < -120) {
          item.style.opacity = "0.7";
        } else if (xDiff > 200 || xDiff < -200) {
          item.style.opacity = "0.5";
        } else {
          item.style.opacity = "1";
        }
      });
      item.addEventListener("touchend", (e) => {
        if (e.changedTouches[0].clientX + 60 < x) {
          // swipe to left
          setNextItem();
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        } else if (e.changedTouches[0].clientX > x + 60) {
          // swipe to right
          setPrevItem();
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        } else {
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        }
      });
    });
  }

  if (nextArrow && typeof nextArrow !== "undefined") {
    nextArrow.addEventListener("click", setNextItem);
  }

  if (nextArrow && typeof prevArrow !== "undefined") {
    prevArrow.addEventListener("click", setPrevItem);
  }
}
