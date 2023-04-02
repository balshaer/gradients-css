// Get the elements
const cardsDiv = document.getElementById('cards');
const copyModal = document.getElementById('copy-modal');
const copyModalText = document.getElementById('copy-modal-text');
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.style.display = 'none');
const searchInput = document.getElementById('searchInput');


// Define the gradients
const gradients = [
  { name: 'Black Rose', color1: '#f4c4f3', color2: '#fc67fa' },
  { name: 'Deep Sea', color1: '#4b79a1', color2: '#283e51' },
  { name: 'Lush', color1: '#56ab2f', color2: '#a8e063' },
  { name: 'Mango Pulp', color1: '#f09819', color2: '#edde5d' },
  { name: 'Moon Purple', color1: '#4e54c8', color2: '#8f94fb' },
  { name: 'Steel Gray', color1: '#1f1c2c', color2: '#928dab' },
  { name: 'Windy', color1: '#acb6e5', color2: '#86fde8' },
  { name: 'Lady Lips', color1: '#ff9a9e', color2: '#fecfef' },
  { name: 'Sunny Morning', color1: '#f6d365', color2: '#fda085' },
  { name: 'Rainy Ashville', color1: '#fbc2eb', color2: '#a6c1ee' },
  { name: 'Blue Pink', color1: '#667eea', color2: '#764ba2', color3: '#ed2e7e' },
  { name: 'Green Blue', color1: '#5f2c82', color2: '#49a09d', color3: '#7ac7c4' },
  { name: 'Dark Sky', color1: '#4b6cb7', color2: '#182848', color3: '#4b6cb7' },
  { name: 'Sunset Orange', color1: '#ff4e50', color2: '#f9d423', color3: '#ff9e2c' },
  { name: 'Deep Purple', color1: '#360033', color2: '#0b8793', color3: '#d8ebe4' },
  { name: 'Purple Dream', color1: '#bf5ae0', color2: '#a811da', color3: '#7031c9' },
  { name: 'Sea Breeze', color1: '#1cd8d2', color2: '#93edc7', color3: '#1cd8c2' },
  { name: 'Mint', color1: '#1abc9c', color2: '#10ac84', color3: '#1abc9c' },
  { name: 'Sunrise', color1: '#ff512f', color2: '#dd2476', color3: '#ff512f' },
  { name: 'Sapphire', color1: '#0c3483', color2: '#a2b6df', color3: '#6b8cce' },
  { name: 'Beach', color1: '#5d4157', color2: '#a8caba', color3: '#3e606f' },
  { name: 'Emerald Water', color1: '#348F50', color2: '#56B4D3', color3: '#BFE6BA' },
  { name: 'Lemon Twist', color1: '#3CA55C', color2: '#B5AC49', color3: '#FFFDE4' },
  { name: 'Horizon', color1: '#003973', color2: '#E5E5BE', color3: '#6DBDD6' },
  { name: 'Rose Water', color1: '#E55D87', color2: '#5FC3E4', color3: '#EAFDE6' },
  { name: 'Frozen', color1: '#403B4A', color2: '#E7E9BB', color3: '#8EC5FC' },
  { name: 'Mango', color1: '#FFA07A', color2: '#FFDAB9', color3: '#E6B5AC' },
  { name: 'Grass', color1: '#7CC576', color2: '#FFFFFF', color3: '#004E36' },
  { name: 'Summer', color1: '#FC4A1A', color2: '#F7B733', color3: '#6DC3B9' },
  { name: 'Rose Gold', color1: '#ECC5C0', color2: '#FFA69E', color3: '#6D435A' },
  { name: 'Pastel', color1: '#74EBD5', color2: '#9FACE6', color3: '#FAD0C4' },
  { name: 'Frozen Dreams', color1: '#fdcbf1', color2: '#fdcbf1', color3: '#e6dee9' },
  { name: 'Sweet Sunshine', color1: '#f7b733', color2: '#fc4a1a', color3: '#ff9a00' }
];



// Generate the cards
function generateCards() {
  for (let i = 0; i < gradients.length; i++) {
    const gradient = gradients[i];
    // Create the card
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`;
    card.setAttribute('data-clipboard-text', `background-image: linear-gradient(to right, ${gradient.color1}, ${gradient.color2});`);
    // Create the card content
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.textContent = gradient.name;
    const cardSubtitle = document.createElement('p');
    cardSubtitle.className = 'card-subtitle';
    cardSubtitle.textContent = `background-image: linear-gradient(to right, ${gradient.color1}, ${gradient.color2});`;
    // Add the event listener to the card
    card.addEventListener('click', () => {
      navigator.clipboard.writeText(card.getAttribute('data-clipboard-text'))
        .then(() => {
          copyModalText.textContent = 'Copied!';
          copyModal.classList.add('show');
          setTimeout(() => {
            copyModal.classList.remove('show');
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy', err);
        });

      // Show the alert
      const copyAlert = document.getElementById('copy-alert');
      copyAlert.classList.add('show');
      setTimeout(() => copyAlert.classList.remove('show'), 2000);
    });
    // Add the card content to the card
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardSubtitle);
    card.appendChild(cardContent);
    cardsDiv.appendChild(card);
  }
}

// Initialize the copy modal
function initializeCopyModal() {
  const closeModalButton = document.getElementById('close-modal-button');
  closeModalButton.addEventListener('click', () => {
    copyModal.classList.remove('show');
  });
}
// Call the functions
generateCards();
const card = document.createElement('div');
card.className = 'card hide-subtitle'; // Add the hide-subtitle class

// Initialize AOS
AOS.init({
  duration: 1000, // Duration of the animation
  once: true // Only animate elements once on scroll
});


window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scroll-up").style.display = "block";
  } else {
    document.getElementById("scroll-up").style.display = "none";
  }
}

document.getElementById("scroll-up").addEventListener("click", function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});


// Search function
function searchGradients() {
  const searchTerm = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const name = card.querySelector('.card-title').textContent.toLowerCase();
    if (name.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', searchGradients);
