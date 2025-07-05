// ------------------------------
// ✅ script.js 전체 스크립트
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const characters = document.querySelectorAll(".character");
  const infoPanel = document.getElementById("info-panel");
  const characterInfos = [
    "캐릭터 1: 설명불가 님이알아서찾아보세요",
    "캐릭터 2: 하하하",
    "캐릭터 3: 허허허",
    "캐릭터 4: 호호호",
    "캐릭터 5: 으아악",
    "캐릭터 6: 엉엉.",
    "캐릭터 7: 메롱.",
    "캐릭터 8: 삐약삐약",
    "캐릭터 9: 이쒸"
  ];

  characters.forEach((character, index) => {
    character.addEventListener("click", () => {
      const content = document.createElement("div");
      content.innerHTML = `<h3>🎀 ${characterInfos[index].split(":")[0]}</h3>
        <p>${characterInfos[index].split(":")[1]}</p>`;

      const backButton = document.createElement("button");
      backButton.textContent = "← 돌아가기";
      backButton.classList.add("back-button");

      if (index === 4) {
        // 캐릭터 5: 이스터에그
        let step = 0;
        backButton.addEventListener("click", () => {
          if (step === 0) {
            content.innerHTML = `<h3>🎉 이스터에그 발견!</h3>
              <p>축하합니다! <strong>캐릭터 5</strong>의 돌아가기 버튼을 눌러 이스터에그를 발견하셨어요!</p>
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

      // 색상 바꾸기
      const windowTitle = document.querySelector(".window .title-bar");
      windowTitle.style.backgroundColor = `var(--rainbow-${index})`;
    });
  });

  function resetInfoPanel() {
    infoPanel.innerHTML = `
      <h2>초밥이</h2>
      <p>안녕하세요? 왜 안녕하신가요? 부럽습니다.</p>
      <p>이쪽은... 캐릭터 누르면 설명 뜹니다. 하하하하.</p>
    `;

    const windowTitle = document.querySelector(".window .title-bar");
    windowTitle.style.backgroundColor = "navy";
  }

  // 드래그 가능하게 만드는 함수
  document.querySelectorAll(".drag-handle").forEach((handle) => {
    const windowEl = handle.closest(".window") || handle.closest(".mini-window");
    makeDraggable(windowEl, handle);
  });
});

function makeDraggable(element, handle) {
  let offsetX = 0,
    offsetY = 0,
    isDragging = false;
  let originalWidth = null,
    originalHeight = null;

 handle.addEventListener("mousedown", function (e) {
  isDragging = true;
  const rect = element.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  element.style.width = rect.width + "px";
  element.style.height = rect.height + "px";
  element.style.position = "absolute";
  element.style.zIndex = 1000;
});

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    const maxLeft = window.innerWidth - element.offsetWidth;
    const maxTop = window.innerHeight - element.offsetHeight;

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    element.style.left = newLeft + "px";
    element.style.top = newTop + "px";
  });

  document.addEventListener("mouseup", function () {
    if (!isDragging) return;
    isDragging = false;

    // element.style.width = "";
   //  element.style.height = "";
  });
}
