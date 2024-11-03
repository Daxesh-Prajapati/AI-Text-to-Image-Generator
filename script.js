import { generateAiImages } from "./apiwork.js";

// declaring variables

let headline = document.getElementsByClassName("headline")[0];
let branding_text = document.getElementsByClassName("branding-text")[0];
let user_prompt = document.getElementsByClassName("user-prompt")[0];
let user_input_container = document.getElementsByClassName(
  "user-input-container"
)[0];
let image_viewer_container = document.getElementsByClassName(
  "image-viewer-container"
)[0];
let rev_btn = document.getElementById("rev-btn");

let prompt_form = document.getElementById("prompt-form");

// console.log(
//   headline,
//   user_prompt,
//   user_input_container,
//   image_viewer_container,
//   rev_btn,
//   prompt
// );

let ImageArraySet = [];

// function to store png and update on page

export const UpdateImageBox = (ImageArray) => {
  ImageArray.forEach((imglink, index) => {
    const image_box =
      image_viewer_container.querySelectorAll(".image-box")[index];
    const imgTag = image_box.querySelector("img");
    const downloadBtn = image_box.querySelector("a");

    // Set the image source to the AI-generated image data
    imgTag.src = imglink;

    // When the image is loaded, remove the loading class and set download attributes
    imgTag.onload = () => {
      image_box.classList.remove("loading");
      downloadBtn.setAttribute("href", imglink);
      downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
    };
  });
};

// adding the count of images in html
function generateDiv(numberOfImages) {
  const imgArray = Array.from(
    { length: numberOfImages },
    () =>
      `<div class="image-box loading">
    <img src="./assets/Double Ring@1x-2.7s-200px-200px.svg" alt="result img">
    <a href="#"><img src="./assets/download.svg" alt="download rev-btn"></a>
    </div>`
  ).join("");
  // console.log(imgArray);

  image_viewer_container.innerHTML = imgArray;
}

// user submit button request handling
prompt_form.addEventListener("submit", function (event) {
  // retrieving values and create image-box according to input
  let prompt = document.getElementById("prompt-field").value;
  let numberOfImages = document.getElementById("image-count").value;

  numberOfImages = parseInt(numberOfImages);
  // console.log(prompt, numberOfImages);
  generateDiv(numberOfImages);

  // stops form from refreshing
  event.preventDefault();

  // stroing value to prompt
  user_prompt.children[0].innerHTML = prompt;

  // moving elements
  headline.style.marginTop = "-50px";
  headline.style.fontSize = "2rem";

  // hiding elements
  user_input_container.style.display = "none";
  branding_text.style.display = "none";

  // showing hidden elements
  user_prompt.style.display = "block";
  image_viewer_container.style.display = "grid";
  rev_btn.style.display = "block";

  // ai image creation work
  let imageStyle = document.getElementById("image-style").value;

  generateAiImages(prompt, numberOfImages, imageStyle);
});

// revert button use
let revertAction = () => {
  // removing images
  image_viewer_container.innerHTML = "";

  // hiding elements
  image_viewer_container.style.display = "none";
  user_prompt.style.display = "none";

  // clearing previous inputs
  document.getElementById("prompt-field").value = "";
  document.getElementById("prompt-field").placeholder = "Enter prompt here";
  document.getElementById("image-count").value = "4";
  document.getElementById("image-style").value = "";

  // showing default elements
  branding_text.style.display = "block";
  user_input_container.style.display = "block";

  // moving elements to deafult position
  // moving elements
  headline.style.marginTop = "5rem";
  headline.style.fontSize = "4rem";

  // removing revert button
  rev_btn.style.display = "none";
};
rev_btn.addEventListener("click", revertAction);
