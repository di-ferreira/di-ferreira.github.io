//- ScrollTo Element
// element.scrollTo({
//    top: 100,
//    left: 100,
//    behavior: 'smooth'
// });

/* scrollTo */
const menuLinks = document.querySelectorAll('.navigation_link[href^="#"]');

menuLinks.forEach((item) => {
  item.addEventListener("click", scrollToSection);
});

function scrollToSection(event) {
  event.preventDefault();
  const to = getScrollToByHref(event.target);

  scrollToPosition(to);
}

function getScrollToByHref(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop - 80;
}

function scrollToPosition(to) {
  //   window.scroll({
  //     top: to,
  //     behavior: "smooth",
  //   });

  smoothScrollTo(0, to);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}

/* validate form */

let form = $(".contact_talk_form");
console.log(form);

form.validate({
  errorElement: "span", //por padrão, o error é 'label' mas span é mais visível
  rules: {
    //regras de validação:
    name: "required", //required = é necessário!
    email: {
      required: true, //objeto sempre passa pelo menos dois valores.
      email: true, // quando tem mais de um requisito, cria-se um objeto
    },
    phone: "required",
    text: "required",
  },
  messages: {
    //mensagens que estarão no span
    name: "Por favor, informe seu nome",
    email: {
      required: "Por favor, digite seu e-mail",
      email: "Por favor, digite um e-mail válido",
    },
    phone: "Por favor, digite seu número de contato",
    text: "Por favor, escreva sua mensagem",
  },
});
