document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');
  const muteBtn = document.getElementById('muteButton');
  const startOverlay = document.getElementById('startOverlay');
  const mainContent = document.getElementById('mainContent');
  let isMuted = false;

  // สั่งให้วิดีโอเริ่มโหลดและเล่นแบบปิดเสียงรอไว้ตั้งแต่เปิดหน้าเว็บ
  video.muted = true;
  video.play().catch(() => {});

  // คลิกหรือแตะตรงไหนของ overlay เพื่อเข้าสู่หน้าโปรไฟล์และเปิดเสียง
  startOverlay.addEventListener('click', async () => {
    try {
      video.muted = false;
      isMuted = false;
      muteBtn.textContent = '🔊';
      await video.play();
    } catch (err) {
      // หากเบราว์เซอร์มือถือบล็อกเสียง ให้เล่นวิดีโอแบบปิดเสียงต่อ (ภาพไม่หาย)
      console.warn('Unmute blocked, keeping video playing muted:', err);
      video.muted = true;
      isMuted = true;
      muteBtn.textContent = '🔇';
      video.play().catch(() => {});
    }

    startOverlay.classList.add('fade-out');
    setTimeout(() => {
      startOverlay.style.display = 'none';
      mainContent.classList.add('show');
      startTypingBio();
    }, 600);
  });

  // ปุ่มเปิด/ปิดเสียง
  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    video.muted = isMuted;
    if (!isMuted && video.paused) {
      video.play().catch(() => {});
    }
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
  });

  // ตรวจสอบการเล่นซ้ำถ้าวิดีโอเกิดข้อผิดพลาด
  video.addEventListener('error', () => {
    console.error('Video error occurred. Retrying...');
    video.load();
    video.play().catch(() => {});
  });
});

// แสงละมุนตามเมาส์บนคอมพิวเตอร์
const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

// ข้อความโปรยน่ารักๆ สลับอัตโนมัติสำหรับเด็กแม่โจ้ปีนี้
const bioPhrases = [
  "ว่าที่ลูกแม่โจ้ • เขียว-ขาว-เหลือง 💚🤍💛",
  "ยินดีที่ได้รู้จักเพื่อนๆ พี่ๆ แม่โจ้ทุกคนนะคะ ✨",
  "มาเป็นเพื่อนกันได้น้า กดติดตามด้านล่างเลย ↓"
];
let bioIdx = 0;
let charIdx = 0;
let deletingBio = false;

function startTypingBio() {
  const bioEl = document.getElementById("typing-bio");
  if (!bioEl) return;

  const current = bioPhrases[bioIdx];
  if (deletingBio) {
    bioEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    bioEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = deletingBio ? 45 : 80;
  if (!deletingBio && charIdx === current.length) {
    delay = 2200;
    deletingBio = true;
  } else if (deletingBio && charIdx === 0) {
    deletingBio = false;
    bioIdx = (bioIdx + 1) % bioPhrases.length;
    delay = 400;
  }
  setTimeout(startTypingBio, delay);
}

// ชื่อไตเติล @FANG แบบพิมพ์/ลบวนไป
const fullText = "@FANG • MJU 💚🤍💛 ";
let index = 1, reverse = false;

function animateTitle() {
  document.title = fullText.substring(0, index);
  if (!reverse) {
    index++;
    if (index > fullText.length) {
      reverse = true;
      index = fullText.length;
    }
  } else {
    index--;
    if (index < 1) {
      reverse = false;
      index = 1;
    }
  }
  setTimeout(animateTitle, 280);
}

animateTitle();