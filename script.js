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

    const rect = element.getBoundingClientRect();
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    element.style.width = rect.width + 'px'; // 고정폭 설정
    element.style.height = rect.height + 'px';
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;

    // 화면 경계 제한
    const maxLeft = window.innerWidth - element.offsetWidth;
    const maxTop = window.innerHeight - element.offsetHeight;

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // 왼쪽, 위쪽도 제한
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    element.style.left = newLeft + 'px';
    element.style.top = newTop + 'px';
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
}
