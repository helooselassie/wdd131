// Temple Album - dynamic footer and hamburger menu

// Dynamic copyright year
const yearSpan = document.querySelector('#year');
yearSpan.textContent = new Date().getFullYear();

// Last modified date
const modified = document.querySelector('#lastModified');
modified.textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu toggle
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});
