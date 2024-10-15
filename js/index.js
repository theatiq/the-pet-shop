const loadData = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
  const allData = await response.json()

  setTimeout(() => {
    // console.log("Hello");
    const showSpinner = document.getElementById("spinner")
    showSpinner.style.display = "none"
    showData(allData);
  }, 2000);
}


const individualLoadData = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
  const allData = await response.json()

  // showModal(allData.petData);
  console.log(allData.petData);
  const detailedData = allData.petData
  const { image, pet_name, breed, date_of_birth, price, gender, pet_details, vaccinated_status } = detailedData
  const dialog = document.getElementById("my_modal_5")
  const div = document.createElement("div")
  div.classList.add("modal-box")
  div.innerHTML = `
          <div>
            <img src="${image}" alt="" />
          </div>
          <div>
            <h1 class="text-4xl font-bold">${pet_name ? pet_name : "Not Available"}</h1>
          </div>
          <div>
            <div class="flex gap-3">
              <img
                src="https://img.icons8.com/?size=24&id=115221&format=png"
                alt=""
              />
              <p>Breed: ${breed ? breed : "Not Available"}</p>
            </div>

            <div class="flex gap-3">
              <img
                src="https://img.icons8.com/?size=24&id=97765&format=png"
                alt=""
              />
              <p>Gender: ${gender ? gender : "Not Available"}</p>
            </div>

            <div class="flex gap-3">
              <img class="w-5 h-5"
                src="./images/vaccination.png"
                alt=""
              />
              <p>
                Vaccination: ${vaccinated_status ? vaccinated_status : "Not Available"}
              </p>
            </div>

            <div class="flex gap-3">
              <img
                src="https://img.icons8.com/?size=24&id=84997&format=png"
                alt=""
              />
              <p>Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
            </div>

            <div class="flex gap-3">
              <img
                src="https://img.icons8.com/?size=24&id=CoGBixMJpBuh&format=png"
                alt=""
              />
              <p>Price: ${price ? price : "Not Available"}$</p>
            </div>

          </div>
          <div>
            <h1 class="text-2xl font-bold">Details Information</h1>
            <p>${pet_details ? pet_details : "Not Available"}</p>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
  `
  dialog.appendChild(div)
  dialog.showModal()

}


const showModal = (petId) => {
  individualLoadData(petId)
}




const removeClasslist = () => {
  buttons = document.getElementsByClassName("category-btn")
  for (btn of buttons) {
    btn.classList.remove("active")
  }
}



const loadCategoryPet = async (petName) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${petName}`)
  const allData = await response.json()
  const showSpinner = document.getElementById("spinner")
  showSpinner.style.display = "none"

  console.log(allData);
  removeClasslist()
  const activeButton = document.getElementById(`btn-${petName}`)
  activeButton.classList.add("active")
  document.getElementById("all-pets").innerHTML = ""
  const showPets = document.getElementById("all-pets")
  const allPets = allData.data
  const noData = document.getElementById("no-data")
  if (allPets.length === 0) {
    noData.classList.remove("hidden")
  } else {
    noData.classList.add("hidden")
  }

  console.log(allPets);
  allPets.forEach(pet => {
    const { image, pet_name, petId, breed, date_of_birth, gender, price } = pet


    const div = document.createElement("div")
    div.classList.add("border", "rounded-lg")
    div.innerHTML = `
            <div class= "">
              <img class ="p-5" src=${image} alt="" />
            </div>
            <div class="pl-5">
              <h1 class="text-2xl font-bold">${pet_name ? pet_name : "Not Available"}</h1>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=115221&format=png"
                  alt=""
                />
                <p>Breed: ${breed ? breed : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=84997&format=png"
                  alt=""
                />
                <p>Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=97765&format=png"
                  alt=""
                />
                <p>Gender: ${gender ? gender : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=CoGBixMJpBuh&format=png"
                  alt=""
                />
                <p>Price: ${price ? price : "Not Available"}$</p>
              </div>
            </div>
            <div class="border border-b-stone-100 mb-2 mx-3"></div>
            <div class="flex justify-center gap-5">
              <button onclick="likedImage(${petId})">
                <img
                  src="https://img.icons8.com/?size=50&id=24816&format=png"
                  alt=""
                />
              </button>
              <button class="btn text-blue-600" type="button">Adopt</button>
              <button onclick="showModal(${petId})" class="btn text-blue-600" type="button">Details</button>
            </div>
        `
    showPets.appendChild(div)

  })

}


const loadCategory = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories")
  const allData = await response.json()
  showCategory(allData);
}

const showCategory = (category) => {
  // console.log(category.categories);

  const categories = category.categories
  // console.log(categories[0].category);
  categories.forEach(category => {
    // console.log(category);
    const individualIcon = category.category_icon;
    const individualCategory = category.category;
    const categoryButtons = document.getElementById("category-buttons")
    const div = document.createElement("div")

    div.innerHTML = `
            <button id="btn-${individualCategory}" class="flex justify-center gap-5 items-center border border-gray-200 rounded-lg w-40 h-10 category-btn" onclick="loadCategoryPetAll('${individualCategory}')">
              <img class="w-7 h-7" src=${individualIcon} alt="">${individualCategory}
              </button>
        `
    categoryButtons.appendChild(div)
  })

}


const loadCategoryPetAll = (category) => {
  const showSpinner = document.getElementById("spinner")
  showSpinner.style.display = "block"

  setTimeout(async () => {
    loadCategoryPet(category)

  }, 2000);

}



loadCategory()


const showData = (allPets) => {
  // console.log(allPets.pets);
  const showPets = document.getElementById("all-pets")
  const pets = allPets.pets
  pets.forEach(pet => {
    // console.log(pet);
    const { petId, image, pet_name, breed, date_of_birth, gender, price } = pet
    const div = document.createElement("div")
    div.classList.add("border", "rounded-lg")
    div.innerHTML = `
            <div class= "">
              <img class ="p-5" src=${image} alt="" />
            </div>
            <div class="pl-5">
              <h1 class="text-2xl font-bold">${pet_name ? pet_name : "Not Available"}</h1>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=115221&format=png"
                  alt=""
                />
                <p>Breed: ${breed ? breed : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=84997&format=png"
                  alt=""
                />
                <p>Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=97765&format=png"
                  alt=""
                />
                <p>Gender: ${gender ? gender : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=CoGBixMJpBuh&format=png"
                  alt=""
                />
                <p>Price: ${price ? price : "Not Available"}$</p>
              </div>
            </div>
            <div class="border border-b-stone-100 mb-2 mx-3"></div>
            <div class="flex justify-center gap-1">
              <button onclick="likedImage(${petId})" id= "like-id">
                <img
                  src="https://img.icons8.com/?size=50&id=24816&format=png"
                  alt=""
                />
              </button>
              <button onclick="showModal2()" class="btn adopt-btn" id="adoptBtn">Adopt</button>
              <button onclick="showModal(${petId})" class="btn text-blue-600" type="button">Details</button>
            </div>
        `
    showPets.appendChild(div)


  })
}

const imageData = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
  const allData = await response.json()
  const allIndividualData = allData.petData
  const { image } = allIndividualData
  console.log(image);
  const indvImg = document.getElementById("indv-img")
  const img = document.createElement("img")
  img.src = image
  img.alt = ""
  indvImg.appendChild(img)

}

const likedImage = (petId) => {
  imageData(petId)
}

// Countdown Modal

const adoption = () => {
  const showCountdown = document.getElementById("my_modal_4")
  showCountdown.showModal()
  const countdownElement = document.getElementById("countdown");
  let countdown = 3;
  const countdownInterval = setInterval(function () {
    if (countdown > 1) {
      countdown--;
      countdownElement.innerText = countdown;
    } else {
      clearInterval(countdownInterval);
      document.getElementById("my_modal_4").close()
    }
  }, 1000);
  countdownElement.innerText = "3"

  setTimeout(function () {
    document.getElementById("my_modal_4").close()
  }, 4000);
}


const showModal2 = () => {
  adoption()
}

// Sort

const loadDataSorted = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
  const data = await response.json()
  data.pets.sort((a, b) => {
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return b.price - a.price;
  });
  console.log(data);
  showDataSort(data);
}


const showDataSort = (allPets) => {
  // console.log(allPets.pets);
  const showPets = document.getElementById("all-pets")
  const pets = allPets.pets
  pets.forEach(pet => {
    // console.log(pet);
    const { petId, image, pet_name, breed, date_of_birth, gender, price } = pet
    const div = document.createElement("div")
    div.classList.add("border", "rounded-lg")
    div.innerHTML = `
            <div class= "">
              <img class ="p-5" src=${image} alt="" />
            </div>
            <div class="pl-5">
              <h1 class="text-xl font-bold">${pet_name ? pet_name : "Not Available"}</h1>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=115221&format=png"
                  alt=""
                />
                <p>Breed: ${breed ? breed : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=84997&format=png"
                  alt=""
                />
                <p>Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=97765&format=png"
                  alt=""
                />
                <p>Gender: ${gender ? gender : "Not Available"}</p>
              </div>
              <div class="flex gap-3">
                <img
                  src="https://img.icons8.com/?size=24&id=CoGBixMJpBuh&format=png"
                  alt=""
                />
                <p>Price: ${price ? price : "Not Available"}$</p>
              </div>
            </div>
            <div class="border border-b-stone-100 mb-2 mx-3"></div>
            <div class="flex justify-between items-center gap-2">
            <div>
              <button onclick="likedImage(${petId})" id= "like-id">
                <img
                  src="https://img.icons8.com/?size=50&id=24816&format=png"
                  alt=""
                />
              </button>
              </div>
              <div>
              <button onclick="showModal2()" class="btn adopt-btn" id="adoptBtn" type="button">Adopt</button>
              </div>
              <div>
              <button onclick="showModal(${petId})" class="btn text-blue-600" type="button">Details</button>
              </div>
            </div>
        `
    showPets.appendChild(div)


  })
}

const showSortedData = () => {
  document.getElementById("all-pets").innerHTML = ""
  document.getElementById("no-data").classList.add("hidden")
  loadDataSorted()
}


loadData()