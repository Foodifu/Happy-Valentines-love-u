// Password Check for Main Page
function addNumber(number) {
    const input = document.getElementById("passwordInput");
    input.value += number;
}

function clearInput() {
    const input = document.getElementById("passwordInput");
    input.value = "";
}

function checkPassword() {
    const password = "100323";
    const input = document.getElementById("passwordInput").value;
    const errorMessage = document.getElementById("errorMessage");

    if (input === password) {
        window.location.href = "love-letter.html";
    } else {
        errorMessage.classList.remove("hidden");
        clearInput();
    }
}

// Photo Gallery Logic
const landscapeSection = document.querySelector(".landscape-section");
const portraitSection = document.querySelector(".portrait-section");
const polaroidsSection = document.querySelector(".polaroids");
const loadMoreButton = document.getElementById("loadMore");
let currentIndex = 0;

// Main photos from the 'yessur' folder
const imageFiles = [
    "yessur/yessur1.jpg",
    "yessur/yessur2.jpg",
    "yessur/yessur3.jpg",
    "yessur/yessur4.jpg",
    "yessur/yessur5.jpg",
    "yessur/yessur6.jpg",
    "yessur/yessur7.jpg",
    "yessur/yessur8.jpg",
    "yessur/yessur9.jpg",
    "yessur/yessur10.jpg",
];

// Polaroid photos from the 'polaroids' folder
const polaroidFiles = [
    "polaroids/polaroid1.jpg",
    "polaroids/polaroid2.jpg",
    "polaroids/polaroid3.jpg",
    "polaroids/polaroid4.jpg",
    "polaroids/polaroid5.jpg",
    "polaroids/polaroid6.jpg",
    "polaroids/polaroid7.jpg",
    "polaroids/polaroid8.jpg",
    "polaroids/polaroid9.jpg",
    "polaroids/polaroid10.jpg",
];

// Function to check if an image is landscape or portrait
function checkOrientation(src, callback) {
    const img = new Image();
    img.src = src;
    img.onload = function () {
        const isLandscape = img.width > img.height;
        callback(isLandscape);
    };
}

// Function to load gallery images
function loadImages(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
        if (i < imageFiles.length) {
            const imgSrc = imageFiles[i]; // Use the updated path
            checkOrientation(imgSrc, (isLandscape) => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.alt = "A special memory";
                if (isLandscape) {
                    landscapeSection.appendChild(img);
                } else {
                    portraitSection.appendChild(img);
                }
            });
        }
    }
}

// Function to load Polaroid images
function loadPolaroids() {
    polaroidFiles.forEach((file) => {
        const polaroid = document.createElement("div");
        polaroid.classList.add("polaroid");

        const img = document.createElement("img");
        img.src = file;
        img.alt = "A Polaroid memory";

        const caption = document.createElement("div");
        caption.classList.add("caption");
        caption.textContent = "Our Memory ❤️"; // Customize the caption

        polaroid.appendChild(img);
        polaroid.appendChild(caption);
        polaroidsSection.appendChild(polaroid);

        // Make Polaroid draggable
        makeDraggable(polaroid);
    });
}

// Function to make an element draggable
function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        element.style.cursor = "grab";
    });
}

// Load initial set of photos
loadImages(currentIndex, 6);
currentIndex += 6;

// Load Polaroid photos
loadPolaroids();

// Load more photos when the button is clicked
loadMoreButton.addEventListener("click", () => {
    loadImages(currentIndex, currentIndex + 3);
    currentIndex += 3;

    // Hide the button if all photos are loaded
    if (currentIndex >= imageFiles.length) {
        loadMoreButton.style.display = "none";
    }
});
// Slideshow logic
const slideshow = document.getElementById("slideshow");
const images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg",
];

let currentImageIndex = 0;

function changeImage() {
    // Fade out the current image
    slideshow.classList.remove("active");

    // Wait for the fade-out transition to complete
    setTimeout(() => {
        // Update the image source
        slideshow.src = images[currentImageIndex];

        // Fade in the new image
        slideshow.classList.add("active");

        // Move to the next image
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 1000); // Match the transition duration (1 second)
}

// Change image every 3 seconds (3000 milliseconds)
setInterval(changeImage, 3000);

// Start the slideshow immediately
changeImage();