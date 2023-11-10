// I get my main inspiration from the random-range reference
// The viewer can't expect what's coming up next
// The main interaction I focus on is click.
// And also a bit of hover - the change of the customised cursor


// find the button 
let randBOne = document.getElementById("randomButtonOne");

// find the paragraph element 
let randEOne = document.getElementById("randomExplanationOne");

// Cursor customization 
const customCursor = document.querySelector('.custom-cursor');

const moveCursor = (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  customCursor.style.left = mouseX + 'px';
  customCursor.style.top = mouseY + 'px';
   // Make sure the custom cursor is visible
  customCursor.style.display = 'block';

  // Check cursor position and change cursor style
  if (mouseX > window.innerWidth / 2) {
  //img source: https://pngtree.com/element/down?id=NTQ1NDMxNg==&type=1&time=1699498928&token=NjEyNWNmNTEzOWIwZWYyMzMzZTNmODAxNTU0MThhNjY=&t=0
    customCursor.style.backgroundImage = 'url("./cursors/1.png")';
  } else {
  //img source: https://www.onlygfx.com/monstera-leaf-tattoo-png-transparent-svg-vector/
    customCursor.style.backgroundImage = 'url("./cursors/2.png")';
  }
};

// Attach the moveCursor function to mousemove events
document.addEventListener('mousemove', moveCursor);

// A flag to track the visibility of the explanation paragraph
let isExplanationVisible = false;

// Event listener for the button click
randBOne.addEventListener("click", () => {
   // Toggle the visibility of the explanation paragraph
  isExplanationVisible = !isExplanationVisible;
  randEOne.style.display = isExplanationVisible ? "block" : "none";
  
  // If the paragraph is visible, position both elements and change their content
  if (isExplanationVisible) {
    // Ensure that the random position does not intersect with this exclusion zone - the button.
    randomPosition(randEOne, randBOne); 
    // Position the button normally
    randomPosition(randBOne); 
    // Call displayName to handle both text and images
    displayName(); 
    // Display button text
    displayButtonText(); 
  }
});

// Arrays for random text and image content 
// images taken by myself
let itemsArray = [
  "./images/1.png",
  "./images/2.png",
  "./images/3.png",
  "./images/4.png",
  "./images/5.png",
  "./images/6.png",
  "./images/7.png",
  "./images/8.png",
  "./images/9.png",
  "./images/10.png",
  "Nostalgia is denial, denial of painful present.",
  "We're not really strangers.",
  "Relax. Release.",
  "How can I add 1% more happiness to your life.",
  "Let me be your armor while you wield the blade.",
  "Your anxiety is lying to you",
  "Remember to breath",
  "I want the freedom from fear"
];

// Array to keep track of used items so they can be reused after all have been displayed
let usedItemsArray = [];

//Arrays for random button text content 
let buttonTextArray = [
  "Click me",
  "More plz",
  "what's next",
  "Tell me more",
  "Dive deeper",
  "Reveal more",
  "Continue the journey",
  "Uncover further",
  "Awaiting the reveal?",
  "Proceed with curiosity"
];

let usedButtonTextArray = [];

// Function to shuffle the items in an array
//Code from patrick, made some modifacation 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function displayButtonText() {
  if(buttonTextArray.length === 0) {
    buttonTextArray = usedButtonTextArray;
    usedButtonTextArray = [];
  }
  shuffleArray(buttonTextArray);
  let newText = buttonTextArray.shift();
  randBOne.textContent = newText;
  usedButtonTextArray.push(newText);
}

// Function to display either an image or text from the itemsArray
function displayName() {
   // If all items have been used, reset the array
  if(itemsArray.length === 0) {
    itemsArray = usedItemsArray;
    usedItemsArray = [];
  }

  shuffleArray(itemsArray);
  // Get a random item from the array
  let item = itemsArray.shift();
  usedItemsArray.push(item);

  // Clear previous content
  randEOne.innerHTML = ''; 

  // Check if the item is an image path or text
  if (typeof item === 'string' && !item.includes('.png') && !item.includes('.jpg')) {
    // It's text
    randEOne.textContent = item;
  } else {
    // It's an image path
    let imgElement = document.createElement('img');
    imgElement.src = item;
    imgElement.alt = 'Random Image';
    // Set the image width
    imgElement.style.width = '400px'; 
    // Height will be set automatically to maintain aspect ratio
    imgElement.style.height = 'auto'; 
    randEOne.appendChild(imgElement);
  }
}


// Function to position an element randomly within the viewport without overlapping a specified exclusion element
// The randBOne button is now positioned without considering any exclusion.
// The randEOne element is positioned with an exclusion zone around 
// Thus they don't overlap and that the button remains clickable
function randomPosition(el, exclusionElement = null) {
  // Get the dimensions of the element and viewport
  const elWidth = el.offsetWidth;
  const elHeight = el.offsetHeight;
   // Determine the maximum position coordinates
  const maxWidth = window.innerWidth - elWidth;
  const maxHeight = window.innerHeight - elHeight;



  let newX, newY, overlap;
  //added a do...while loop that repeatedly calculates a new position
  //until it finds one that does not overlap with the exclusion zone
  do {
    overlap = false; // Reset overlap flag for each attempt
    newX = getRandomIntRange(0, maxWidth);
    newY = getRandomIntRange(0, maxHeight);

    // If an exclusion element is specified, ensure the new position doesn't overlap with it
    // In this case the exclusion element is the button
    if (exclusionElement) {
      const exclusionRect = exclusionElement.getBoundingClientRect();
      const buffer = 10; // Additional spacing around the button

      // Check if the new position overlaps with the exclusion element
      overlap = newX < exclusionRect.right + buffer &&
                newX + elWidth > exclusionRect.left - buffer &&
                newY < exclusionRect.bottom + buffer &&
                newY + elHeight > exclusionRect.top - buffer;
    }
  } while (overlap); // Keep trying until a non-overlapping position is found

  // Apply the new position
  el.style.position = 'absolute';
  el.style.left = `${newX}px`;
  el.style.top = `${newY}px`;
}


// Function to get a random integer within a range
function getRandomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to map a range of numbers to another range, useful for dynamic styling based on mouse position
function remapRange(input, low1, high1, low2, high2) {
  return ((input - low1) / (high1 - low1)) * (high2 - low2) + low2;
}


// Dynamic background color and opacity 
// Code from Patrick
window.addEventListener("mousemove", e => {
  randEOne.style.opacity = remapRange(e.clientX, 0, window.innerWidth, 0.5, 1);
  document.body.style.backgroundColor = "hsl(" + remapRange(e.clientX, 0, window.innerWidth, 160, 230) + ", 40%, 80%)";
});


function randomPosition(el){
  el.style.position = 'absolute';
  el.style.left = getRandomIntRange(0, window.innerWidth - el.offsetWidth) + "px";
  el.style.top = getRandomIntRange(0, window.innerHeight - el.offsetHeight) + "px";
}