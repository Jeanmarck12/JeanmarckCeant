document.addEventListener('DOMContentLoaded', function () {
  // 🌙 Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  if (themeToggle) {
      themeToggle.addEventListener('change', () => {
          body.classList.toggle('dark-mode');
      });
  }

  // 🎯 Cursor Effects
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (cursor && follower) {
      document.addEventListener('mousemove', (e) => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';

          follower.style.left = e.clientX + 'px';
          follower.style.top = e.clientY + 'px';
      });
  }

  // 🔄 Scroll Animations
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show');
          } else {
              entry.target.classList.remove('show');
          }
      });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));

  // 📌 Header Scroll Animation
  let prevScrollPos = window.pageYOffset;
  const header = document.querySelector('header');
  if (header) {
      window.addEventListener('scroll', () => {
          const currentScrollPos = window.pageYOffset;
          header.style.transform = prevScrollPos > currentScrollPos ? 'translateY(0)' : 'translateY(-100%)';
          prevScrollPos = currentScrollPos;
      });
  }

  // 🏁 Language Switcher Fix
  const flagBackground = document.getElementById('flag-background');
  const languageSwitcher = document.getElementById('language-switcher');
  const proficiencyCard = document.getElementById('proficiency-card');

  let currentLanguage = "haitian-creole";

  const flags = {
      "haitian-creole": { flag: "images/Haiti.svg", proficiency: "Haitian Creole - Fluent" },
      "french": { flag: "images/France.svg", proficiency: "French - Fluent" },
      "spanish": { flag: "images/DR.svg", proficiency: "Spanish - Intermediate" }
  };

  function setFlag(language) {
      if (flags[language] && flagBackground && proficiencyCard) {
          flagBackground.src = flags[language].flag;
          currentLanguage = language;
          proficiencyCard.innerHTML = flags[language].proficiency;
      }
  }

  if (languageSwitcher) {
      languageSwitcher.addEventListener("click", function () {
          if (currentLanguage === "haitian-creole") {
              setFlag("french");
          } else if (currentLanguage === "french") {
              setFlag("spanish");
          } else {
              setFlag("haitian-creole");
          }
      });
  }





    // Global variable to track the currently playing audio element.
    window.currentPlayingAudio = null;

    // 🎸 Instrument Audio Player with Toggle and Exclusive Playback
    function playInstrument(audioId) {
        var audio = document.getElementById(audioId);
        if (!audio) {
            console.error("Audio element with id " + audioId + " not found.");
            return;
        }
        
        // If a different audio is currently playing, stop it.
        if (window.currentPlayingAudio && window.currentPlayingAudio !== audio) {
            window.currentPlayingAudio.pause();
            window.currentPlayingAudio.currentTime = 0;
            window.currentPlayingAudio = null;
        }
  
        // Toggle: if the clicked audio is paused, play it; if playing, stop it.
        if (audio.paused) {
            audio.currentTime = 0;
            audio.play().then(() => {
                window.currentPlayingAudio = audio;
            }).catch(function(error) {
                console.error("Audio playback failed:", error);
            });
        } else {
            audio.pause();
            audio.currentTime = 0;
            window.currentPlayingAudio = null;
        }
    }
  
    // Attach playInstrument to the global window object so inline onclick handlers can access it.
    window.playInstrument = playInstrument;






  // 🎬 Expanding Videos on Click
  const videos = document.querySelectorAll(".interest-item video");

  if (videos.length > 0) {
      videos.forEach(video => {
          video.addEventListener("click", function () {
              videos.forEach(v => {
                  if (v !== this) v.classList.remove("clicked");
              });

              this.classList.toggle("clicked");
          });
      });
  }


    const output = document.getElementById('terminal-output');
    const userInput = document.getElementById('user-input');
    const cursors = document.getElementById('cursor');

    let currentInput = '';
    let step = 0;
    let name = '';
    let email = '';
    let message = '';

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const print = async (text, speed = 20) => {
        for (let i = 0; i < text.length; i++) {
            output.textContent += text[i];
            await delay(speed);
        }
        output.textContent += '\n';
    };

    const clearInputLine = () => {
        userInput.textContent = '';
        currentInput = '';
    };

    const nextStep = async () => {
        step++;
        clearInputLine();
        switch (step) {
            case 1:
                await print("> Please enter your name:");
                break;
            case 2:
                await printLoading(`Thank you, ${name}. Please enter your email :)`);
                break;
            case 3:
                await printLoading("Please enter your message:");
                break;
            case 4:
                await finalMessage();
                break;
        }
    };

    const printLoading = async (nextPrompt) => {
        output.textContent += '\n';
        output.textContent += ". ";
        await delay(500);
        output.textContent += ". ";
        await delay(500);
        output.textContent += ". ";
        await delay(500);
        output.textContent += ". ";
        await delay(500);
        output.textContent += '\n';
        await print(nextPrompt);
    };

    const finalMessage = async () => {
        output.textContent += '\n';
        output.textContent += ". ";
        await delay(500);
        output.textContent += ". ";
        await delay(500);
        output.textContent += ". ";
        await delay(500);
        output.textContent += ". ";
        await delay(500);
        output.textContent += '\n';
        await delay(2000);
        await print("Thank You for your time, Jeanmarck will respond to you soon. Good bye :)");
        output.textContent += '\n';
        await delay(5000);
        location.reload();
    };

    const handleEnter = async () => {
        if (currentInput.trim() === '') return;

        switch (step) {
            case 0:
                await nextStep();
                break;
            case 1:
                name = currentInput;
                await print("> " + name);
                await nextStep();
                break;
            case 2:
                email = currentInput;
                await print("> " + email);
                await nextStep();
                break;
            case 3:
                message = currentInput;
                await print("> " + message);
                await nextStep();
                break;
        }
    };

    document.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await handleEnter();
        } else if (event.key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            userInput.textContent = currentInput;
        } else if (event.key.length === 1) {
            currentInput += event.key;
            userInput.textContent = currentInput;
        }
    });

    const init = async () => {
        await print("Hello :)");
    };

    init();

});
