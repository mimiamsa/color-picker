
// ---------------CANVAS INITIALIZATION--------------- //

const url = document.getElementById("site-url").content;
const canvas = document.getElementById("mainCanvas");
const canvasZoom = document.getElementById("canvasZoom");
const ctx = canvas.getContext("2d");
const zoomCtx = canvasZoom.getContext("2d");
const imageCredit = document.getElementById("image-credit");

var lastClickedSwatch;
var currentImageId;
var currentImageCredit;

export function getCurrentImageId() {
  return currentImageId;
}

// 1. First, we get image source and draw in canvas
export function getImageSrc(routeToRandomImage) {
  return new Promise((resolve, reject) => {
    axios
      .get(url + routeToRandomImage)
      .then(res => {
        if (!res.data) return reject("no image found");

        // all good, we have an image to display
        currentImageId = res.data._id;
        currentImageCredit = res.data.credit;
        imageCredit.innerHTML=currentImageCredit;
        draw(res.data.link);
        resolve(res.data.link);
      })
      .catch(err => reject(err));
  });
}

// function to draw img in canvas (called in getImageSrc)
function draw(imgSrc) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imgSrc;
  img.onload = function() {
    canvas.width = 800;
    canvas.height = 600;
    var portraitHeight = img.naturalHeight/(img.naturalWidth/canvas.width);
    var landscapeWidth = img.naturalWidth/(img.naturalHeight/canvas.height);
    if (img.naturalHeight>img.naturalWidth){
      ctx.drawImage(img, 0, -portraitHeight/4, canvas.width, portraitHeight);
    } else {
      ctx.drawImage(img, 0, 0, landscapeWidth, canvas.height);
    }
  };
}

// ---------------GET LAST CLICKED DIV--------------- //

export function setSwatchListeners() {
  const swatches = document.getElementsByClassName("unique-swatch-container");

  for (let i = 0; i < swatches.length; i++) {
    swatches[i].onclick = function() {
      lastClickedSwatch = swatches[i];
      highlightSelectedEl();
    };
  }
}

// ---------------CANVAS COLORPICKER--------------- //

var logColors = function logColors(e) {
  var pointerX = e.layerX;
  var pointerY = e.layerY;

  var imageData = ctx.getImageData(pointerX, pointerY, 1, 1);
  var pixelData = imageData.data;

  var rVal = pixelData[0];
  var gVal = pixelData[1];
  var bVal = pixelData[2];

  var rgbVal = rVal + "," + gVal + "," + bVal;

  var colorSwatch = lastClickedSwatch.childNodes[0]
  var colorSwatchHexInfo = lastClickedSwatch.children[1].children[1].children[0]
  var colorSwatchRgbInfo = lastClickedSwatch.children[1].children[1].children[1]
  var colorSwatchHslInfo = lastClickedSwatch.children[1].children[1].children[2]

  colorSwatchHexInfo.innerHTML = `HEX: <br> ${rgbToHex(rVal, gVal, bVal)}`
  colorSwatchRgbInfo.innerHTML = `RGB: <br> ${rgbVal}`
  colorSwatchHslInfo.innerHTML =  `HSL: <br> ${rgbToHsl(rVal, gVal, bVal)}`
  colorSwatch.style.backgroundColor = "rgb(" + rgbVal + ")";
};

var showZoom = function showZoom(e) {
  zoomCtx.fillStyle = "white";
  zoomCtx.fillRect(0, 0, canvasZoom.width, canvasZoom.height);
  zoomCtx.drawImage(canvas, e.x +20, e.y - 110, 100, 100, 0, 0, 150, 150);
  canvasZoom.style.top = e.pageY + "px";
  canvasZoom.style.left = e.pageX + "px";
  canvasZoom.style.transform = "translate(-120%,-120%)";
  canvasZoom.style.display = "block";
};

var hideZoom = function hideZoom() {
  canvasZoom.style.display = "none";
};

var highlightSelectedEl = function highlightSelectedEl(){
  lastClickedSwatch.classList.toggle("selected");
}

canvas.addEventListener("mousedown", function(e) {
  showZoom(e);
  canvas.addEventListener("mousemove", logColors);
  canvas.addEventListener("mousemove", showZoom);
});

canvas.addEventListener("mouseup", function() {
  hideZoom();
  highlightSelectedEl();
  canvas.removeEventListener("mousemove", logColors);
  canvas.removeEventListener("mousemove", showZoom);
});

// ---------------COLORS CONVERSION--------------- //

export function rgbToHex(r, g, b) {
  function componentToHex(singleValue) {
    var hex = singleValue.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  s = s*100;
  s = Math.round(s);
  l = l*100;
  l = Math.round(l);
  h = Math.round(360*h);
  return [h, s, l];
}



