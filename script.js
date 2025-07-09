// ------------------------------
// ✅ script.js 전체 스크립트
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const characters = document.querySelectorAll(".character");
  const infoPanel = document.getElementById("info-panel");

  characters.forEach((character) => {
    character.addEventListener("click", () => {
      const name = character.dataset.name;
      const desc = character.dataset.desc;
      const index = character.dataset.index;

      const content = document.createElement("div");
      content.innerHTML = `<h3>🎀 ${name}</h3><p>${desc}</p>`;

      const backButton = document.createElement("button");
      backButton.textContent = "← 돌아가기";
      backButton.classList.add("back-button");

      if (index === "4") {
        // 캐릭터 5: 이스터에그
        let step = 0;
        backButton.addEventListener("click", () => {
          if (step === 0) {
            content.innerHTML = `<h3>🎉 이스터에그 발견!</h3>
              <p>축하합니다! <strong>${name}</strong>의 돌아가기 버튼을 눌러 이스터에그를 발견하셨어요!</p>
              <p>한 번 더 누르면 진짜 돌아갑니다 :)</p>`;
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

      // 탭 헤더 색상 변경
      const windowTitle = document.querySelector(".window .title-bar");
      windowTitle.style.backgroundColor = `var(--rainbow-${index})`;
    });
  });

  function resetInfoPanel() {
  const panel = document.getElementById("info-panel");
  const title = panel.dataset.title;
  const line1 = panel.dataset.line1;
  const line2 = panel.dataset.line2;

  panel.innerHTML = `
    <h2>${title}</h2>
    <p>${line1}</p>
    <p>${line2}</p>
  `;

  const windowTitle = document.querySelector(".window .title-bar");
  windowTitle.style.backgroundColor = "navy";
 }
});

  
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
