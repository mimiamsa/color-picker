import { getImageSrc } from "./color-picker.js";
import { setSwatchListeners } from "./color-picker.js";

const colorSwatchContainer = document.querySelector(".swatch-container");
const canvas = document.getElementById("mainCanvas");

const filterBtns = document.getElementsByClassName("btn-category");

document.onload = getImageAndPrint("/api/image/random");

for(let i = 0; i < filterBtns.length; i++ ){
  filterBtns[i].onclick = function(evt) {
    const cat = evt.target.getAttribute("data-category")
    // console.log(cat);

    getImageAndPrint("/api/image/random/" + cat);
  }
}

// Function to remove Palette from DOM before re-generating
function removePaletteFromDom(){
  colorSwatchContainer.remove();
}

// Executes after getImageSrc() has executed. Creates Vibrant colors and prints colors.
function getImageAndPrint(apiRoute){
 
  addOpacityAppearance(canvas);

  getImageSrc(apiRoute).then(url => {
    Vibrant.from(url)
      .getPalette()
      .then(swatches => {
        colorSwatchContainer.innerHTML = "";
        let hexColorSwatches = [];
        for (var swatch in swatches) {
          hexColorSwatches.push(swatches[swatch].hex);
        }
        printColorSwatches(hexColorSwatches, colorSwatchContainer);
      });
  })
  .catch(err => console.warn(err));
}

function printColorSwatches(arr, parentEl) {
  for (let i = 0; i < arr.length; i++) {
    let swatchElement = document.createElement("div");

    let uniqueSwatchContainer = document.createElement("div");
    uniqueSwatchContainer.appendChild(swatchElement);
    uniqueSwatchContainer.className += "unique-swatch-container";

    let uniqueSwatchInfo = document.createElement("div");
    uniqueSwatchContainer.appendChild(uniqueSwatchInfo);
    uniqueSwatchInfo.className += "unique-swatch-info";

    let uniqueSwatchTitle = document.createElement("h4");
    uniqueSwatchTitle.innerHTML= "COLOR "+(i+1);
    uniqueSwatchTitle.className += "color-info-title";
    uniqueSwatchInfo.appendChild(uniqueSwatchTitle);

    let uniqueSwatchColorInfo = document.createElement("div");
    uniqueSwatchColorInfo.className += "color-info-content";
    uniqueSwatchColorInfo.innerHTML= `
    <div style="margin-top:5px;">HEX: <br>${arr[i]}<br></div> 
    <div style="margin-top:5px;">RGB: <br>${(hexToRgb(arr[i].substring(1, 7)))}<br></div> 
    <div style="margin-top:5px;">HSL: <br>${hexToHSL(arr[i])}</div> `;

    uniqueSwatchInfo.appendChild(uniqueSwatchColorInfo);

    swatchElement.className += "swatch";
    swatchElement.setAttribute("id", "swatch" + i);
    swatchElement.style.backgroundColor = arr[i];
    parentEl.appendChild(uniqueSwatchContainer);
  }
  setSwatchListeners();
}

// ---------------CANVAS SMOOTH APPEAR--------------- //

function addOpacityAppearance(element) {
  if(element.classList.contains("visible")) {
    element.classList.remove("visible")
    setTimeout(function(){ element.classList.add("visible")}, 100);
  } else {
    element.classList.add("visible");
  }
};

// ---------------COLOR CONVERSIONS SUITE--------------- //

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return r + "," + g + "," + b;
}

function hexToHSL (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  s = s*100;
  s = Math.round(s);
  l = l*100;
  l = Math.round(l);
  h = Math.round(360*h);

  var colorInHSL = '' + h + ', ' + s + ', ' + l + '';
  return colorInHSL;
}