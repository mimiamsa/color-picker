import { rgbToHex } from "./color-picker.js";
import { getCurrentImageId } from "./color-picker.js";

const url = document.getElementById("site-url").content;
const sendPaletteBtn = document.getElementById("send-palette-btn");
const finalPalette = document.getElementsByClassName("swatch");
const paletteNameInput = document.getElementById("palette_name");

sendPaletteBtn.onclick = sendPaletteToBDD;

// ---- get Final color to Hex ---- //

// get last color values from dom + convert to hex + return in an array
function getColors() {
  var swatchValues = [];
  var finalArrayHex = [];

  for (let i = 0; i < finalPalette.length; i++) {
    let rawRgb = finalPalette[i].style.backgroundColor;
    swatchValues.push(rawRgb);
  }
  for (let j = 0; j < swatchValues.length; j++) {
    finalArrayHex.push(arrRgbToHex(parseRgbString(swatchValues[j]))); // Push (and Converted Dom RGB) in Array
  }

  return finalArrayHex;
}

function sendPaletteToBDD() {
  getColors();
  const paletteNameValue = paletteNameInput.value;
  axios
    .post(url + "/api/palette/create", {
      swatches: getColors(),
      palette_name: paletteNameValue,
      image: getCurrentImageId()
    })
    .then(res => {
      // console.log(res);
      axios.patch(url + "/api/user/push-palette", {
        id_palette: res.data._id
      });
    })
    .catch(err => console.log(err));
}

// return a hex value from an array of 3 rgb values
function arrRgbToHex(arr) {
  return rgbToHex(arr[0], arr[1], arr[2]);
}

// parse rgb string and return array of 3 rgb values in number
function parseRgbString(rgb) {
  rgb = rgb.replace(/[^\d,]/g, "").split(",");
  var arrRgbNumber = [];
  for (let i = 0; i < rgb.length; i++) {
    arrRgbNumber.push(Number(rgb[i]));
  }
  return arrRgbNumber;
}
