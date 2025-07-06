
const characterInfos = [
  "🎀 <strong>캐릭터 1</strong><br>설명불가 님이알아서찾아보세요",
  "🍣 <strong>캐릭터 2</strong><br>하하하",
  "🌸 <strong>캐릭터 3</strong><br>허허허",
  "🦴 <strong>캐릭터 4</strong><br>호호호",
  "🎀 <strong>캐릭터 5</strong><br>으아악",
  "🧊 <strong>캐릭터 6</strong><br>엉엉.",
  "💥 <strong>캐릭터 7</strong><br>메롱.",
  "🐥 <strong>캐릭터 8</strong><br>삐약삐약",
  "🫵 <strong>캐릭터 9</strong><br>이쒸"
];

let easterEggTriggered = false;

function showCharacterInfo(index) {
  const panel = document.getElementById("info-panel");
  if (index === 4 && !easterEggTriggered) {
    panel.innerHTML = `
      <h2>🎉 이스터에그 발견!</h2>
      <p>축하합니다! <strong>캐릭터 5</strong>의 돌아가기 버튼을 눌러 아주아주 쓸데없는 이스터에그를 발견하셨슴요</p>
      <p>한 번 더 누르면 진짜 돌아갑니다</p>
      <button class="back-button" onclick="triggerEasterEgg()">← 돌아가기</button>
    `;
  } else {
    panel.innerHTML = `
      <div>${characterInfos[index]}</div>
      <button class="back-button" onclick="showDefault()">← 돌아가기</button>
    `;
  }
}

function triggerEasterEgg() {
  easterEggTriggered = true;
  showCharacterInfo(4);
}

function showDefault() {
  const panel = document.getElementById("info-panel");
  panel.innerHTML = `
    <h2>초밥이의 소개</h2>
    <p>안녕하세요! 저는 만화와 게임을 좋아하는 '초밥이'입니다.</p>
    <p>왼쪽 캐릭터를 클릭하면 각 캐릭터에 대한 설명이 여기에 뜰 거예요!</p>
  `;
}
