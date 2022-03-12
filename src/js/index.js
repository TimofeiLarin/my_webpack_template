let years = document.querySelector(".block-3-projects__slider__slides");
let prev = document.querySelector(".block-3-projects__slider__nav__prev");
let next = document.querySelector(".block-3-projects__slider__nav__next");
let buttonsYears = document.querySelectorAll(
  ".block-3-projects__slider__slides__slide"
);
let i = 0;
let step = 0;

prev.addEventListener("click", function () {
  i--;
  step = 25;
  changeScrole();
});

next.addEventListener("click", function () {
  i++;
  step = 25;
  changeScrole();
});

let changeScrole = function () {
  if (i >= buttonsYears.length - 2) {
    i = 0;
  } else if (i < 0) {
    i = buttonsYears.length - 3;
  }
  let distance = -i * step;
  years.style.transform = "translateX(" + distance + "%)";
  return i;
};
