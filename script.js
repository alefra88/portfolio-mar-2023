/* ********** Menu ********** */
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ********** ContactForm ********** */
((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/efra.rlz@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);

/* ***** BTN CONTACTAME***** */

const $buttons = document.querySelectorAll(".btn"),
  $turbulence = document.querySelector("feTurbulence");

let verticalFrequency = 0.00001;
$turbulence.setAttribute("baseFrequency", verticalFrequency + "0.03");

const steps = 30,
  interval = 10;

$buttons.forEach(function (button) {
  button.addEventListener("mouseover", function () {
    verticalFrequency = 0.00001;
    for (i = 0; i < steps; i++) {
      setTimeout(function () {
        verticalFrequency += 0.009;
        $turbulence.setAttribute("baseFrequency", verticalFrequency + ".00001");
      }, i * interval);
    }
    setTimeout(function () {
      verticalFrequency = 0.00001;
      $turbulence.setAttribute("baseFrequency", verticalFrequency + ".00001");
    }, steps * interval);
  });
});

