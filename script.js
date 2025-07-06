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

function showCharacterInfo(index) {
  const panel = document.getElementById('info-panel');
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(`--rainbow-${index % 9}`);
  panel.innerHTML = `
    <h2 style="color: ${color}">캐릭터 ${index + 1}</h2>
    <p>${characterInfos[index]}</p>
    <button class="back-button" onclick="goBack(${index})">돌아가기</button>
  `;
}

function goBack(index) {
  const panel = document.getElementById('info-panel');
  if (index === 4 && !panel.dataset.easterEggShown) {
    panel.dataset.easterEggShown = "true";
    panel.innerHTML = \`
      <h2>🎉 이스터에그 발견!</h2>
      <p>축하합니다! 이스터에그: 캐릭터5의 돌아가기 버튼 누르기를 발견하셨어요!</p>
      <button class="back-button" onclick="goBack(${index})">진짜 돌아가기</button>
    \`;
    return;
  }

  panel.removeAttribute("data-easter-egg-shown");
  panel.innerHTML = \`
    <h2>초밥이</h2>
    <p>안녕하세요? 왜 안녕하신가요? 부럽습니다.</p>
    <p>이쪽은 제 여자친구들입니다. 캐릭터 누르면 설명 뜹니다. 아니? 캐릭터 아닙니다. 엄연한 제 가족들입니다.</p>
  \`;
}
