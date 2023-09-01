const scrollToTopBtn = document.getElementsByClassName('go-to-top');
scrollToTopBtn[0].addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
console.log(scrollToTopBtn, 'hy');






//////////////////////////////////////////////////////
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '&#*+%?£@§$'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}


const phrases = [
  'Ashish Singh',
'&#128512;'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()

const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
burger.addEventListener("click", () => {
  navLinks.classList.toggle('open');
});

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)
// dark mode js 
// const night = () => {
//   const moon = document.querySelector(".moon");
//   moon.addEventListener('click', () => {
//     console.log("clicked!")
//     var element = document.body;
//     element.classList.add("dark")
//   element.classList.remove('light')
//     });

// }
// const days = () => {
//   const sun = document.querySelector('.sun');
//   sun.addEventListener('click', () => {
//     var element = document.body;
//     element.classList.add("light");

//   })
// }


const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})
const news = document.getElementById('theme-toggle')
news.addEventListener('click', (e) => {
  const checked = e.target.checked;
  document.body.setAttribute('theme', checked ? 'dark' : 'light');
});
