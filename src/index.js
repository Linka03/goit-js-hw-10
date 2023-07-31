import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.getElementById('breed-select');
const catInfo = document.querySelector('.cat-info');
const catImage = document.getElementById('cat-image');
const breedName = document.getElementById('breed-name');
const breedDescription = document.getElementById('breed-description');
const breedTemperament = document.getElementById('breed-temperament');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

// Function to show loader
function showLoader() {
  loader.style.display = 'block';
}

// Function to hide loader
function hideLoader() {
  loader.style.display = 'none';
}

// Function to show error message
function showError() {
  error.style.display = 'block';
}

// Function to hide error message
function hideError() {
  error.style.display = 'none';
}

// Function to show cat information
function showCatInfo(catData) {
  catImage.src = catData.url;
  breedName.textContent = catData.breeds[0].name;
  breedDescription.textContent = catData.breeds[0].description;
  breedTemperament.textContent = catData.breeds[0].temperament;
  catInfo.style.display = 'block';
}

// Function to hide cat information
function hideCatInfo() {
  catInfo.style.display = 'none';
}

// Event listener for breed selection
breedSelect.addEventListener('change', function () {
  const selectedBreedId = this.value;
  hideCatInfo();
  hideError();
  showLoader();
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      hideLoader();
      showCatInfo(catData[0]);
    })
    .catch(error => {
      hideLoader();
      showError();
      console.error('Error fetching cat by breed:', error);
    });
});

// Initial fetch of cat breeds and populate the breed select options
showLoader();
fetchBreeds()
  .then(breeds => {
    hideLoader();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    hideLoader();
    showError();
    console.error('Error fetching breeds:', error);
  });
