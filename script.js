// =====================================
// CURRENT DATE
// =====================================

const currentDate = document.getElementById("currentDate");

const today = new Date();

currentDate.textContent = today.toLocaleDateString(
    "en-IN",
    {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
);


// =====================================
// MOBILE MENU
// =====================================

const mobileMenu =
    document.getElementById("mobileMenu");

const navMenu =
    document.getElementById("navMenu");

mobileMenu.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


// =====================================
// CATEGORY FILTER
// =====================================

const navLinks =
    document.querySelectorAll(
        ".navbar a[data-category]"
    );

const newsCards =
    document.querySelectorAll(".news-card");

navLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const category =
            this.getAttribute("data-category");

        navLinks.forEach(item => {

            item.parentElement.classList.remove("active");

        });

        this.parentElement.classList.add("active");

        navMenu.classList.remove("show");

        filterNews(category);

    });

});


function filterNews(category) {

    let visibleCount = 0;

    newsCards.forEach(card => {

        const cardCategory =
            card.getAttribute("data-category");

        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "block";
            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });

    document.getElementById("noResults").style.display =
        visibleCount === 0 ? "block" : "none";
}


// =====================================
// SEARCH
// =====================================

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


function searchNews() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let count = 0;

    newsCards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        if (
            searchText === "" ||
            text.includes(searchText)
        ) {

            card.style.display = "block";
            count++;

        } else {

            card.style.display = "none";

        }

    });

    document.getElementById("noResults").style.display =
        count === 0 ? "block" : "none";

}


searchBtn.addEventListener(
    "click",
    searchNews
);


searchInput.addEventListener(
    "keyup",
    function(event) {

        if (event.key === "Enter") {
            searchNews();
        }

    }
);


// =====================================
// VIEW ALL
// =====================================

document.getElementById("viewAll")
    .addEventListener("click", () => {

        searchInput.value = "";

        navLinks.forEach(item => {
            item.parentElement.classList.remove("active");
        });

        navLinks[0].parentElement.classList.add("active");

        filterNews("all");

        window.scrollTo({
            top: document.querySelector(".news-section").offsetTop - 50,
            behavior: "smooth"
        });

    });


// =====================================
// DARK MODE
// =====================================

const darkModeBtn =
    document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon =
        darkModeBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem(
            "newsDarkMode",
            "enabled"
        );

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem(
            "newsDarkMode",
            "disabled"
        );

    }

});


// =====================================
// LOAD DARK MODE
// =====================================

if (
    localStorage.getItem("newsDarkMode")
    === "enabled"
) {

    document.body.classList.add("dark");

    const icon =
        darkModeBtn.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}


// =====================================
// NEWSLETTER
// =====================================

const subscribeBtn =
    document.getElementById("subscribeBtn");

const emailInput =
    document.getElementById("email");


subscribeBtn.addEventListener("click", () => {

    const email =
        emailInput.value.trim();

    if (email === "") {

        showToast(
            "Please enter your email address."
        );

        return;
    }

    if (!email.includes("@")) {

        showToast(
            "Please enter a valid email."
        );

        return;
    }

    emailInput.value = "";

    showToast(
        "Subscribed successfully!"
    );

});


// =====================================
// TOAST
// =====================================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.querySelector("span").textContent =
        message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// =====================================
// LOGIN BUTTON
// =====================================

document.querySelector(".login-btn")
    .addEventListener("click", () => {

        showToast(
            "Login feature is available in the full version."
        );

    });


// =====================================
// SOCIAL LINKS
// =====================================

document.querySelectorAll(".social a")
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            showToast(
                "Social media page opened."
            );

        });

    });