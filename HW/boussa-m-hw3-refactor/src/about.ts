// mobile menu
const burgerIcon = document.querySelector("#burger") as HTMLButtonElement;
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.onclick = () => {
    navbarMenu.classList.toggle("is-active");
}