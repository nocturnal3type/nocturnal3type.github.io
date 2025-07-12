document.addEventListener("DOMContentLoaded", function () {
  const characters = document.querySelectorAll(".character");
  const infoPanel = document.getElementById("info-panel");

  const defaultName = "안녕하세요? 왜 안녕하시죠?";
  const defaultDesc = `
    <p>아주 먼 옛날, 은하계 저 너머에서는, 
    <br>트위터... 아... 일론강점기에 그렇게 불리지는 않지만요. 
    <br>아무튼 트위터 오타쿠들은 '자기소개표'라는 이미지 템플릿에 
    자기 관심사와 주의사항을 적어놓는 풍습이 있었다고 합니다. 
    <br>
    <br>이 웹사이트는 어찌보면 자기소개표의 '깃허브로 실시간 수정이 가능한 버전'이랄까요. 캐릭터 사진을 누르시면 저에 대해 더 잘 알게 되시지 않을까요. 랄까...</p>
  `;

  const sushiButton = document.querySelector("#drag2 .mini-button");
  const feedbackWindow = document.getElementById("sushi-feedback");

  sushiButton.addEventListener("click", () => {
    feedbackWindow.style.display = "block";

    // 자동으로 5초 뒤에 닫기
    setTimeout(() => {
      feedbackWindow.style.display = "none";
    }, 5000);
  });

  characters.forEach((character) => {
    character.addEventListener("click", () => {
      const name = character.dataset.name;
      const desc = character.dataset.desc;
      const index = character.dataset.index;

      const content = document.createElement("div");
      content.innerHTML = `<h3>💾 ${name}</h3><p>${desc}</p>`;

      const backButton = document.createElement("button");
      backButton.textContent = "← 돌아가기";
      backButton.classList.add("back-button");

      if (index === "4") {
        let step = 0;
        backButton.addEventListener("click", () => {
          if (step === 0) {
            content.innerHTML = `<h3>🎉 이스터에그 발견 🎉</h3>
              <p>축하합니다~ <strong>${name}</strong>의 돌아가기 버튼을 누르셨네요. 본 메시지는 이스터에그입니다.</p>
              <p>한 번 더 누르면 진짜 돌아갑니다. 쓸데없지만 님은 이스터에그를 발견한 특별한 사람이 됨...</p>`;
            content.appendChild(backButton);
            step = 1;
          } else {
            resetInfoPanel();
          }
        });
      } else {
        backButton.addEventListener("click", resetInfoPanel);
      }

      content.appendChild(backButton);
      infoPanel.innerHTML = "";
      infoPanel.appendChild(content);

      const windowTitle = document.querySelector(".window .title-bar");
      windowTitle.style.backgroundColor = `var(--rainbow-${index})`;
    });
  });

  function resetInfoPanel() {
    infoPanel.innerHTML = `<h2>${defaultName}</h2>${defaultDesc}`;
    const windowTitle = document.querySelector(".window .title-bar");
    windowTitle.style.backgroundColor = "navy";
  }
});

// 🎵 음악 재생 함수는 외부에 위치해도 OK
function playMusic() {
  const existing = document.getElementById("bgm-audio");
  if (existing) {
    existing.play();
    return;
  }

  const audio = document.createElement("audio");
  audio.src = "audio/bgm.mp3";
  audio.id = "bgm-audio";
  audio.autoplay = true;
  audio.loop = true;
  document.body.appendChild(audio);
}

/*
  // 드래그 가능하게 만드는 함수
  document.querySelectorAll(".drag-handle").forEach((handle) => {
    const windowEl = handle.closest(".window") || handle.closest(".mini-window");
    makeDraggable(windowEl, handle);
  });
});

*/

//makeDraggable() 함수도 주석처리 할게
  
/*

function makeDraggable(element, handle) {
  let offsetX = 0,
      offsetY = 0,
      isDragging = false,
      moved = false;

  handle.addEventListener("mousedown", function (e) {
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // 드래그 시작 표시
    isDragging = true;
    moved = false;

    // 마우스 포인터 캡처 (prevent text highlight)
    e.preventDefault();
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    if (!moved) {
      // 처음 움직일 때만 position 변경
      element.style.position = "fixed"; // viewport 기준으로
      element.style.margin = 0;
      element.style.left = element.getBoundingClientRect().left + "px";
      element.style.top = element.getBoundingClientRect().top + "px";
      element.style.zIndex = 1000;
      moved = true;
    }

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // 화면 밖으로 못 나가게 clamp
    const maxLeft = window.innerWidth - element.offsetWidth;
    const maxTop = window.innerHeight - element.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
}
*/
