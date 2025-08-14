const navLinksEls = document.querySelectorAll(".nav-link");
const sectionEls = document.querySelectorAll(".section");
let currentId = "home";
window.addEventListener("scroll", () => {
  sectionEls.forEach((i) => {
    if (window.scrollY >= i.offsetTop) {
      currentId = i.id;
      console.log(currentId);
    }
  });
});
// document.addEventListener("DOMContentLoaded", () => {
//   const content = document.getElementById("app-content");

//   const routes = {
//     "/": "<h1>Home Section</h1><p>Welcome to my portfolio.</p>",
//     "/about": "<h1>About Me</h1><p>This is the about section.</p>",
//     "/services": "<h1>My Services</h1><p>Here’s what I offer.</p>",
//     "/work": "<h1>My Work</h1><p>Some projects I’ve done.</p>",
//     "/contact": "<h1>Contact</h1><p>Get in touch!</p>",
//   };

//   function navigate(path) {
//     window.history.pushState({}, path, path);
//     content.innerHTML = routes[path] || "<h1>404</h1><p>Page not found</p>";
//   }

//   document.querySelectorAll("[data-route]").forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const path = e.target.getAttribute("data-route");
//       navigate(path);
//     });
//   });

//   window.addEventListener("popstate", () => {
//     navigate(window.location.pathname);
//   });

//   navigate(window.location.pathname); // Load initial route
// });
