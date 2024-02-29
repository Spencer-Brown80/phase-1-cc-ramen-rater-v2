// index.js
const url = `http://localhost:3000`
let currentRamen;
// Callbacks
const handleClick = (ramen) => {
  const ramenDetail = document.querySelector("#ramen-detail");
  const detailImg = ramenDetail.querySelector(".detail-image");
  const detailName = ramenDetail.querySelector(".name");
  const detailRestaurant = ramenDetail.querySelector(".restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailImg.alt = ramen.image;
  detailName.innerText = ramen.name;
  detailRestaurant.innerText = ramen.restaurant;
  detailsRating.innerText = ramen.rating.toString();
  detailsComment.innerText = ramen.comment;
  currentRamen = ramen;
};


const handleDelete = () => {
  const ramenMenuDiv = document.getElementById("ramen-menu");

  if (currentRamen) {
    // Remove the currently displayed ramen from the menu
    const ramenImg = ramenMenuDiv.querySelector(`[alt="${currentRamen.name}"]`);
    if (ramenImg) {
      ramenImg.remove();
    }

    // Clear the ramen-detail div
    const ramenDetail = document.querySelector("#ramen-detail");
    const detailImg = ramenDetail.querySelector(".detail-image");
    const detailName = ramenDetail.querySelector(".name");
    const detailRestaurant = ramenDetail.querySelector(".restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");

    detailImg.src = "";
    detailImg.alt = "";
    detailName.innerText = "";
    detailRestaurant.innerText = "";
    detailsRating.innerText = "";
    detailsComment.innerText = "";

    currentRamen = null;
  }
};

const displayRamen = (object) => {
  const ramenMenuDiv = document.getElementById("ramen-menu");
  const ramenImg = document.createElement("img");

  ramenImg.src = object.image;
  ramenImg.alt = object.name;
  ramenImg.classList.add("image-slider");
  ramenImg.addEventListener("click", (event) => handleClick(object, event));
  ramenMenuDiv.appendChild(ramenImg);

  // Create a single "delete" button at the bottom of the page
  const deleteButton = document.getElementById("delete-button");
  if (!deleteButton) {
    const deleteRamenButton = document.createElement('button');
    deleteRamenButton.textContent = 'Delete Currently Displayed Ramen';
    deleteRamenButton.addEventListener('click', handleDelete);
    deleteRamenButton.id = "delete-button";
    document.body.appendChild(deleteRamenButton);
  }

};

const handleEditSubmit = (event) => {
  event.preventDefault();
  
  // Assuming there is a variable to store the currently selected ramen
  // and it's named currentRamen
  const updatedRating = event.target['update-rating'].value;
  const updatedComment = event.target['update-comment'].value;

  // Update the current ramen object
  currentRamen.rating = updatedRating;
  currentRamen.comment = updatedComment;

  // Update the display of the currently selected ramen
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailsRating.innerText = updatedRating.toString();
  detailsComment.innerText = updatedComment;

  // Reset the form
  event.target.reset();
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

const addEditSubmitListener = () => {
  const editRamenForm = document.querySelector("#edit-ramen");
  if (editRamenForm) {
    editRamenForm.addEventListener("submit", handleEditSubmit);
  }
};

const displayRamens = () => {
  fetch(`${url}/ramens`)
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
  addEditSubmitListener();
  

};

main()

// Export functions for testing
export {
  displayRamens,
  displayRamen,
  addSubmitListener,
  handleSubmit,
  handleClick,
  handleEditSubmit,
  main,
};
