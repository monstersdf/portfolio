// async function init () {
//     const node = document.querySelector("#type-text")
    
//     await sleep(1000)
//     node.innerText = ""
//     await node.type('ASHISH SINGH, ')
    
//     while (true) {
//       await node.type('\n FRONT-END!')
//       await sleep(2000)
//       await node.delete('FRONT-END!')
//       await node.type('WEB-DEVELOPER')
//       await sleep(2000)
//       await node.delete('WEB-DEVELOPER!')
//     }
//   }
  
  
//   // Source code 🚩
  
//   const sleep = time => new Promise(resolve => setTimeout(resolve, time))
  
//   class TypeAsync extends HTMLSpanElement {
//     get typeInterval () {
//       const randomMs = 100 * Math.random()
//       return randomMs < 50 ? 10 : randomMs
//     }
    
//     async type (text) {
//       for (let character of text) {
//         this.innerText += character
//         await sleep(this.typeInterval)
//       }
//     }
    
//     async delete (text) {
//       for (let character of text) {
//         this.innerText = this.innerText.slice(0, this.innerText.length -1)
//         await sleep(this.typeInterval)
//       }
//     }
//   }
  
//   customElements.define('type-async', TypeAsync, { extends: 'span' })
  
  
//   init()

// new animation 
const resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, {resolveString: resolveString});
    
    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };
    
    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, {iterations: iterations - 1});

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback)
        } else if (typeof callback === "function") {
          callback(); 
        }
      }, options.timeout);
    };
    
    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, {partialString: partialString});

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, {offset: offset + 1});

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };

    doResolverEffect(combinedOptions, callback);
  } 
}

/* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
 * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
 */
const strings = [
'ASHISH SINGH',
  'FRONT-END',
  'WEB-DEVELOPER',
];

let counter = 0;

const options = {
  // Initial position
  offset: 0,
  // Timeout between each random character
  timeout: 5,
  // Number of random characters to show
  iterations: 10,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector('[data-target-resolver]')
}

// Callback function when resolve completes
function callback() {
  setTimeout(() => {
    counter ++;
    
    if (counter >= strings.length) {
      counter = 0;
    }
    
    let nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

resolver.resolve(options, callback);

  const navLinks = document.querySelector('.nav-links');
  const burger = document.querySelector('.burger');
  burger.addEventListener("click", () =>{
    navLinks.classList.toggle('open');
  });

