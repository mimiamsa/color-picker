const url = document.getElementById("site-url").content;
const deleteUserPaletteBtn = document.getElementsByClassName(
  "delete-user-palette-btn"
);

console.log("hello");

function removePaletteFromDOM(id) {
  document.getElementById(`pal_${id}`).remove();
}

function removePaletteViaAJAX(evt) {
  const btn = evt.target;
  const id = btn.getAttribute("data-palette-id");
  console.log(btn.getAttribute("data-palette-id"));
  // console.log(id)
  axios
    .delete(`${url}/api/palette/delete/${id}`)
    .then(serverRes => removePaletteFromDOM(id))
    .catch(serverErr => console.log(serverErr));
}

for (let i = 0; i < deleteUserPaletteBtn.length; i++) {
  deleteUserPaletteBtn[i].onclick = removePaletteViaAJAX;
}