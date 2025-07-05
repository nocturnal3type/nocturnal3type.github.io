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

const rainbowColors = [
  'var(--rainbow-0)',
  'var(--rainbow-1)',
  'var(--rainbow-2)',
  'var(--rainbow-3)',
  'var(--rainbow-4)',
  'var(--rainbow-5)',
  'var(--rainbow-6)',
  'var(--rainbow-7)',
  'var(--rainbow-8)'
];

const infoPanel = document.getElementById('info-panel');
const mainTitleBar = document.getElementById('mainTitleBar');
const originalHTML = infoPanel.innerHTML;
let easterEggTriggered = false;

function showCharacterInfo(index) {
  // 헤더 색 바꾸기
  mainTitleBar.style.backgroundColor = rainbowColors[index];

  if (index === 4) easterEggTriggered = false;

  infoPanel.innerHTML = `
    <h2>캐릭터 설명</h2>
    <p>${characterInfos[index]}</p>
    <button class="back-button" onclick="goBack(${index})">← 돌아가기</button>
  `;
}

function goBack(index = null) {
  if (index === 4 && !easterEggTriggered) {
    easterEggTriggered = true;
    infoPanel.innerHTML = `
      <h2>🎉 이스터에그 발견!</h2>
      <p>축하합니다! <strong>캐릭터 5</strong>의 돌아가기 버튼을 눌러 이스터에그를 발견하셨어요!</p>
      <p>한 번 더 누르면 진짜 돌아갑니다 :)</p>
      <button class="back-button" onclick="goBack(4)">← 돌아가기</button>
    `;
  } else {
    infoPanel.innerHTML = originalHTML;
    mainTitleBar.style.backgroundColor = 'navy';
  }
}

// 창 드래그 기능
function makeDraggable(element) {
  const title = element.querySelector('.drag-handle');
  let offsetX = 0, offsetY = 0, isDragging = false;

  title.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    element.style.left = (e.clientX - offsetX) + 'px';
    element.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
}

// 모든 창에 드래그 적용
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.window, .mini-window').forEach(makeDraggable);
});
