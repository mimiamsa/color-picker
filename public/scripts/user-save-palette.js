console.log("coucou");

const colorSwatchContainer = document.querySelector(".swatch-container");
const colorSwatch = document.getElementsByClassName("swatch");


window.onload = sendPalettetoUser
// for (let i = 0; i < colorSwatch.length; i++) {
//   console.log(colorSwatch[i]);
// }


function sendPalettetoUser() {
  for (let i = 0; i < colorSwatch.length; i++) {
    console.log(colorSwatch[i].style.background);
  }
  // return "quiqui";
}

// sendPalettetoUser();
// console.log(sendPalettetoUser());
