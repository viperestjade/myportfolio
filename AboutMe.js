let currentContent = document.querySelector('.content.active');
    let isTransitioning = false; 

    function showContent(id) {
      if (isTransitioning || (currentContent && currentContent.id === id)) return;
      isTransitioning = true;
      const newContent = document.getElementById(id);


      if (currentContent) {
        currentContent.style.transform = "translateX(-100%)";
        currentContent.style.opacity = "0";
        setTimeout(() => {
          currentContent.style.display = "none";
          currentContent.classList.remove("active");

          newContent.style.display = "flex";
          newContent.style.transform = "translateX(100%)";
          newContent.style.opacity = "0";
          setTimeout(() => {
            newContent.classList.add("active");
            newContent.style.transform = "translateX(0)";
            newContent.style.opacity = "1";
            setTimeout(() => {
              currentContent = newContent;
              isTransitioning = false;
            }, 800);
          }, 50);
        }, 800);
      } else {
        newContent.style.display = "flex";
        newContent.style.transform = "translateX(100%)";
        newContent.style.opacity = "0";
        setTimeout(() => {
          newContent.classList.add("active");
          newContent.style.transform = "translateX(0)";
          newContent.style.opacity = "1";
          isTransitioning = false;
          currentContent = newContent;
        }, 50);
      }
    }

    function redirect(page) {
      window.location.href = page;
    }

    const canvas = document.getElementById("fallingLeaves");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const leaves = [];
    const leafCount = 20;

    function Leaf() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 10 + 5;
      this.speedY = Math.random() * 2 + 1;
      this.speedX = Math.random() * 2 - 1;
    }

    Leaf.prototype.update = function() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }
    };

    Leaf.prototype.draw = function() {
      ctx.fillStyle = "rgba(238, 120, 238, 0.7)";  // violet leaves
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };

    function createLeaves() {
      for (let i = 0; i < leafCount; i++) {
        leaves.push(new Leaf());
      }
    }

    function animateLeaves() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
      });
      requestAnimationFrame(animateLeaves);
    }

    createLeaves();
    animateLeaves();