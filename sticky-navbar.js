window.onscroll = function() {stickyOnScroll()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickyOnScroll() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }