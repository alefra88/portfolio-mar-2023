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


// new title
window.addEventListener('load', function() {
  // canvas setup
    const textInput = document.getElementById('textInput');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', {
      willReadFrequently: true
    });
    console.log(ctx)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(effect, x, y, color){
          this.effect = effect;
          //this.x = Math.random() * this.effect.canvasWidth;
          //this.y = Math.random() * this.effect.canvasHeight;
          this.x = Math.random() * this.effect.canvasWidth;
          this.y = this.effect.canvasHeight;
          this.originX = x;
          this.originY = y;
          this.size = this.effect.gap;
          this.color = color;
          this.dx = 0;
          this.dy = 0;
          this.vx = 0;
          this.vy = 0;
          this.force = 0;
          this.angle = 0;
          this.distance = 0;
          this.friction = Math.random() * 0.6 + 0.15;
          this.ease = Math.random() * 0.1 + 0.005;
      }
      update(){
          this.dx = this.effect.mouse.x - this.x;
          this.dy = this.effect.mouse.y - this.y;
          this.distance = this.dx * this.dx + this.dy * this.dy;
          this.force = -this.effect.mouse.radius / this.distance;
          if(this.distance < this.effect.mouse.radius) {
              this.angle = Math.atan2(this.dy, this.dx);
              this.vx += this.force * Math.cos(this.angle);
              this.vy += this.force * Math.sin(this.angle);
          }
          this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
          this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
      }
      draw(){
        // only change colours when this colour is different than previous
        this.effect.context.fillStyle = this.color;
        this.effect.context.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    class Effect {
      constructor(context, canvasWidth, canvasHeight){
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.maxTextWidth = this.canvasWidth * 0.8;
        this.fontSize = 90;
        this.textVerticalOffset = 0;
        this.lineHeight = this.fontSize * 1.2;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2 - this.lineHeight / 2;
        this.textInput = document.getElementById('textInput');
        this.textInput.addEventListener('keyup', e => {
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            if (e.key !==' ') this.wrapText(e.target.value);
        });

        this.particles = [];
        this.gap = 2;
        this.mouse = {
            radius: 20000,
            x: 0,
            y: 0
        }
        window.addEventListener("mousemove", e => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
      }
      /* Examples of analogous combinations:
      Violet, blue, and teal.
      Red, fuchsia, and purple.
      Red, orange, and yellow.
      Green, blue, and purple.*/
      wrapText(text){
        this.context.font = this.fontSize + 'px Bangers';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.strokeStyle = 'white';
        this.context.lineWidth = 5;
        this.context.letterSpacing = "10px"; // experimental property
        this.context.imageSmoothingEnabled = false
        //this.context.fillStyle = 'white';
        const edge = this.canvasWidth * 0.2;
        const gradient = this.context.createLinearGradient(edge, edge, this.canvasWidth - edge, this.canvasHeight - edge);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.5, 'fuchsia');
        gradient.addColorStop(1, 'purple');
        this.context.fillStyle = gradient;
        let linesArray = [];
        let words = text.split(' ');
        let lineCounter = 0;
        let line = '';
        for (let i = 0; i < words.length; i++){
          let testLine = line + words[i] + ' ';
          if (this.context.measureText(testLine).width > this.maxTextWidth){       
            line = words[i] + ' ';
            lineCounter++;
          } else {
            line = testLine;
          }
          linesArray[lineCounter] = line;
        }
        let textHeight = this.lineHeight * lineCounter;
        this.textY = this.canvasHeight/2 -  textHeight/2 + this.textVerticalOffset;
        linesArray.forEach((el, index) => {
            this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
            this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
        });
        this.convertToParticles();
      }
      convertToParticles(){
        this.particles = [];
        const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
        for(let y = 0; y < this.canvasHeight; y += this.gap) {
            for(let x = 0; x < this.canvasWidth; x += this.gap) {
                const index = (y * this.canvasWidth + x) * 4;
                const alpha = pixels[index + 3];
                if(alpha > 0) {
                  const red = pixels[index];
                  const green = pixels[index + 1];
                  const blue = pixels[index + 2];
                  const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
                  this.particles.push(new Particle(this, x, y, color));
                }
            }
        }
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      }
      render(){
        this.particles.forEach(particle => {
          particle.update();
          particle.draw();
        })
      }
    }
    
    let effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText(effect.textInput.value);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render();
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
        effect = new Effect(ctx, canvas.width, canvas.height);
      effect.wrapText(effect.textInput.value);
      console.log('resize')
    });
});