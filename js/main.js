const embedEngine = {
    init() {
        embedEngine.binds();
    },
    binds() {

        document.querySelectorAll(".embed-button").forEach((e) => {
            e.addEventListener("click", embedEngine.embedBox);
        });

        const menuBtnRef = document.querySelector("[data-menu-button]");
        const mobileMenuRef = document.querySelector("[data-menu]");
        const expanded =
            menuBtnRef.getAttribute("aria-expanded") === "true" || false;

        menuBtnRef.addEventListener("click", () => {
            menuBtnRef.classList.toggle("is-open");
            menuBtnRef.setAttribute("aria-expanded", !expanded);

            mobileMenuRef.classList.toggle("is-open");
            document.body.classList.toggle("is-open");
        });
        mobileMenuRef.addEventListener("click", () => {
            menuBtnRef.classList.toggle("is-open");
            menuBtnRef.setAttribute("aria-expanded", !expanded);

            mobileMenuRef.classList.toggle("is-open");
            document.body.classList.toggle("is-open");
        });

        window.onscroll = function () {
            scrollFunction();
        };
        const buttons = document.querySelectorAll('.btn'); // Находим все кнопки

        buttons.forEach(function(btn) {
            const hiddenContent = btn.closest('.container').querySelector('.block-content--hidden');

            btn.addEventListener('click', function() {
                if (hiddenContent.style.maxHeight) {
                    hiddenContent.style.maxHeight = null;
                    btn.classList.remove('active');
                } else {
                    hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
                    btn.classList.add('active');
                }
            });
        });

        function scrollFunction() {
            if (
                document.body.scrollTop > 466 ||
                document.documentElement.scrollTop > 466
            ) {
                document.querySelector(".nav").classList.add("nav--sticky");
            } else {
                document.querySelector(".nav").classList.remove("nav--sticky");
            }
        }
    },
};
document.addEventListener("DOMContentLoaded", embedEngine.init);
