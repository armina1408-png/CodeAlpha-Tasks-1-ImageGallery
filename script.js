const cards = document.querySelectorAll(".gallery-card");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCategory = document.getElementById("lightboxCategory");

const closeBtn = document.getElementById("closeBtn");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

cards.forEach((card, index) => {
    card.addEventListener("click", () =>{openLightbox(index);});

});

let currentIndex = 0;

function openLightbox (index){
    currentIndex = index;
    const card = cards[currentIndex];
    const image = card.querySelector("img");
    const title = card.querySelector("h3");
    const category = card.querySelector("p");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = title.textContent;
    lightboxCategory.textContent = category.textContent;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox(){
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
}

function nextImage() {
    currentIndex++;
    if (currentIndex >= cards.length){
        currentIndex = 0;
    }
    openLightbox(currentIndex);
}

function previousImage() {
    currentIndex--;
    if (currentIndex < 0){
        currentIndex = cards.length-1;
    }
    openLightbox(currentIndex);
}

closeBtn.addEventListener(
    "click",
    closeLightbox
);
nextBtn.addEventListener(
    "click",
    nextImage
);
prevBtn.addEventListener(
    "click",
    previousImage
);
lightbox.addEventListener(
    "click",
    (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    }
);
document.addEventListener(
    "keydown",
    (event) => {
        if (
            !lightbox.classList.contains("active")
        ) {
            return;
        }
        if (event.key === "ArrowRight") {
            nextImage();
        }
        if (event.key === "ArrowLeft") {
            previousImage();
        }
        if (event.key === "Escape") {
            closeLightbox();
        }
    }
);
filterButtons.forEach(button => {
    button.addEventListener(
        "click",
        () => {
            filterButtons.forEach(btn => {
                btn.classList.remove("active");

            })
            button.classList.add("active");
            const filter =
                button.dataset.filter;
            cards.forEach(card => {
                const category =
                    card.dataset.category;
                if (
                    filter === "all" ||
                    category === filter
                ) {
                    card.classList.remove("hide");
                }
                else {
                    card.classList.add("hide");
                }
            });
        }
    );
});