// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailImg.alt = ramen.image;
  detailName.innerText = ramen.name;
  detailRestaurant.innerText = ramen.restaurant;
  detailsRating.innerText = ramen.rating.toString();
  detailsComment.innerText = ramen.comment;
};

const displayRamen = (object) => {
  const ramenMenuDiv = document.getElementById("ramen-menu");
  const ramenImg = document.createElement("img");
  ramenImg.src = object.image;
  ramenImg.alt = object.name;
  ramenImg.classList.add("image-slider");
  ramenImg.addEventListener("click", (event) => handleClick(object, event));
  ramenMenuDiv.appendChild(ramenImg);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const name = event.target['new-name'].value;
  const restaurant = event.target.restaurant.value;
  const image = event.target.image.value;
  const rating = event.target.rating.value;
  const comment = event.target['new-comment'].value;
  const newRamen = { name, restaurant, image, rating, comment };
  event.target.reset();
  displayRamen(newRamen);
};

const addSubmitListener = () => {
  const ramenForm = document.querySelector("#new-ramen");
  if (ramenForm) {
    ramenForm.addEventListener("submit", handleSubmit);
  }
}

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      document.getElementById("ramen-menu").innerHTML = "";

      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
      ramens.forEach(displayRamen)
    })
    .catch((error) => console.log(error));
};

const main = () => {
  addSubmitListener();
  displayRamens();
}

main()

// Export functions for testing
export {
  displayRamens,
  displayRamen,
  addSubmitListener,
  handleSubmit,
  handleClick,
  main,
};