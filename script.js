// ------------------------------
// ✅ script.js 전체 스크립트
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const infoPanel = document.getElementById("info-panel");
    const leftPanel = document.querySelector(".left-panel"); // left-panel 참조
    const mainWindow = document.getElementById("mainWindow"); // 메인 창 참조

    // 캐릭터 정보 데이터
    const characterInfos = [
        { name: "캐릭터 1", description: "설명불가 님이알아서찾아보세요" },
        { name: "캐릭터 2", description: "하하하" },
        { name: "캐릭터 3", description: "허허허" },
        { name: "캐릭터 4", description: "호호호" },
        { name: "캐릭터 5", description: "으아악 (이스터에그)" }, // 이스터에그임을 명시
        { name: "캐릭터 6", description: "엉엉." },
        { name: "캐릭터 7", description: "메롱." },
        { name: "캐릭터 8", description: "삐약삐약" },
        { name: "캐릭터 9", description: "이쒸" }
    ];

    // --- 1. 캐릭터 이미지 동적 생성 ---
    function createCharacterElements() {
        // 플레이스홀더 텍스트 제거
        leftPanel.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const characterDiv = document.createElement("div");
            characterDiv.classList.add("character");
            characterDiv.dataset.index = i; // 인덱스 저장

            const img = document.createElement("img");
            img.src = `img/char${i + 1}.jpg`;
            img.alt = `${characterInfos[i].name} 이미지`; // alt 속성 추가

            characterDiv.appendChild(img);
            leftPanel.appendChild(characterDiv);

            // 클릭 이벤트 리스너 추가
            characterDiv.addEventListener("click", () => showCharacterInfo(i));
        }
    }

    // --- 2. 캐릭터 정보 표시 함수 ---
    function showCharacterInfo(index) {
        const character = characterInfos[index];
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("character-info-content"); // 스타일링을 위한 클래스 추가
        contentDiv.innerHTML = `
            <h3 class="text-lg font-bold mb-2 text-gray-900">🎀 ${character.name}</h3>
            <p class="text-gray-700">${character.description}</p>
        `;

        const backButton = document.createElement("button");
        backButton.textContent = "← 돌아가기";
        backButton.classList.add("back-button");

        // 이스터에그 로직
        if (index === 4) { // 캐릭터 5 (인덱스 4)
            let step = 0;
            backButton.addEventListener("click", () => {
                if (step === 0) {
                    contentDiv.innerHTML = `
                        <h3 class="text-lg font-bold mb-2 text-gray-900">🎉 이스터에그 발견!</h3>
                        <p class="text-gray-700">축하합니다! <strong>캐릭터 5</strong>의 돌아가기 버튼을 눌러서 바로 안 돌아가게 되는 이스터에그를 발견하셨습니다.</p>
                        <p class="text-gray-700">한 번 더 누르면 진짜 돌아갑니다...</p>
                    `;
                    contentDiv.appendChild(backButton); // 버튼 다시 추가
                    infoPanel.innerHTML = ""; // 기존 내용 비우기
                    infoPanel.appendChild(contentDiv); // 새 내용 추가
                    step = 1;
                } else {
                    resetInfoPanel();
                }
            });
        } else {
            backButton.addEventListener("click", resetInfoPanel);
        }

        contentDiv.appendChild(backButton);
        infoPanel.innerHTML = ""; // 기존 내용 비우기
        infoPanel.appendChild(contentDiv); // 새 내용 추가

        // 메인 창의 타이틀 바 색상 변경
        const mainTitleBar = document.getElementById("mainTitleBar");
        if (mainTitleBar) {
            mainTitleBar.style.backgroundColor = `var(--rainbow-${index})`;
        }
    }

    // --- 3. 정보 패널 초기화 함수 ---
    function resetInfoPanel() {
        infoPanel.innerHTML = `
            <h2 class="text-xl font-bold mb-2 text-gray-800">안녕하세요! 우주먼지이자까야입니다.</h2>
            <p class="text-gray-700 mb-4">
                이곳은 제가 좋아하는 만화 캐릭터들을 소개하는 공간입니다.
                왼쪽의 캐릭터 이미지를 클릭하면 각 캐릭터에 대한 저의 애정 가득한 설명을 보실 수 있습니다.
                부디 즐겁게 둘러봐 주세요!
            </p>
            <p class="text-gray-600 text-sm">
                (아직 캐릭터를 선택하지 않으셨습니다. 아무 캐릭터나 클릭하여 시작해보세요!)
            </p>
        `;
        // 메인 창의 타이틀 바 색상 원래대로 돌리기
        const mainTitleBar = document.getElementById("mainTitleBar");
        if (mainTitleBar) {
            mainTitleBar.style.backgroundColor = "navy";
        }
    }

    // --- 4. 윈도우 드래그 기능 ---
    let highestZIndex = 100; // 윈도우 z-index 관리 시작 값

    function makeDraggable(element, handle) {
        let offsetX = 0,
            offsetY = 0,
            isDragging = false;

        // 윈도우 클릭 시 맨 앞으로 가져오기 (z-index 관리)
        element.addEventListener("mousedown", () => {
            highestZIndex++;
            element.style.zIndex = highestZIndex;
        });

        handle.addEventListener("mousedown", dragStart);
        handle.addEventListener("touchstart", dragStart); // 터치 이벤트

        function dragStart(e) {
            isDragging = true;
            element.classList.add("active"); // 드래그 중임을 표시하는 클래스 (커서 변경 등)
            handle.classList.add("active");

            // 터치 이벤트와 마우스 이벤트 구분
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const rect = element.getBoundingClientRect();
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;

            // 드래그 중에는 position을 absolute로 유지
            element.style.position = "absolute";
            // element.style.width = rect.width + "px"; // 드래그 중 크기 고정
            // element.style.height = rect.height + "px"; // 드래그 중 크기 고정

            // 드래그 시작 시 z-index를 가장 높게 설정
            highestZIndex++;
            element.style.zIndex = highestZIndex;

            // 이벤트 전파 방지 (버튼 클릭 등과 겹치지 않도록)
            e.preventDefault();
        }

        document.addEventListener("mousemove", dragMove);
        document.addEventListener("touchmove", dragMove); // 터치 이벤트

        function dragMove(e) {
            if (!isDragging) return;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            // 부모 컨테이너의 경계 계산
            const container = element.closest(".container");
            const containerRect = container ? container.getBoundingClientRect() : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };

            let newLeft = clientX - offsetX;
            let newTop = clientY - offsetY;

            // 컨테이너 경계 내로 제한
            // element.offsetWidth와 element.offsetHeight를 사용하여 요소의 현재 크기 반영
            newLeft = Math.max(containerRect.left, Math.min(newLeft, containerRect.right - element.offsetWidth));
            newTop = Math.max(containerRect.top, Math.min(newTop, containerRect.bottom - element.offsetHeight));

            // 컨테이너 내부에서의 상대 위치로 변환
            element.style.left = (newLeft - containerRect.left) + "px";
            element.style.top = (newTop - containerRect.top) + "px";

            e.preventDefault(); // 스크롤 방지
        }

        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("touchend", dragEnd); // 터치 이벤트

        function dragEnd() {
            if (!isDragging) return;
            isDragging = false;
            element.classList.remove("active");
            handle.classList.remove("active");
            // 드래그 종료 후 크기 고정 해제 (CSS에 맡김)
            // element.style.width = "";
            // element.style.height = "";
        }
    }

    // 모든 드래그 가능한 요소에 드래그 기능 적용
    document.querySelectorAll(".drag-handle").forEach((handle) => {
        const windowEl = handle.closest(".window") || handle.closest(".mini-window");
        if (windowEl) {
            makeDraggable(windowEl, handle);
        }
    });

    // --- 5. 윈도우 버튼 기능 (최소화, 최대화, 닫기) ---
    document.querySelectorAll(".window").forEach(windowEl => {
        const minimizeBtn = windowEl.querySelector("img[alt='최소화 버튼']");
        const maximizeBtn = windowEl.querySelector("img[alt='최대화 버튼']");
        const closeBtn = windowEl.querySelector("img[alt='닫기 버튼']");

        let originalWidth, originalHeight, originalLeft, originalTop;
        let isMaximized = false;

        // 최소화 버튼
        if (minimizeBtn) {
            minimizeBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // 드래그 이벤트와 겹치지 않도록
                windowEl.classList.toggle("minimized"); // minimized 클래스 토글
                // 실제 90년대 윈도우처럼 아래에 아이콘이 생기는 기능은 복잡하므로, 일단 숨기는 것으로 구현
            });
        }

        // 최대화 버튼
        if (maximizeBtn) {
            maximizeBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // 드래그 이벤트와 겹치지 않도록
                if (!isMaximized) {
                    // 현재 위치와 크기 저장 (px 단위로 저장)
                    originalWidth = windowEl.style.width;
                    originalHeight = windowEl.style.height;
                    originalLeft = windowEl.style.left;
                    originalTop = windowEl.style.top;

                    // 최대화
                    windowEl.style.width = "100%";
                    windowEl.style.height = "100%";
                    windowEl.style.left = "0";
                    windowEl.style.top = "0";
                    windowEl.style.transform = "none"; // translateX(-50%) 제거
                    windowEl.style.borderRadius = "0"; // 모서리 둥글기 제거
                    windowEl.style.boxShadow = "none"; // 그림자 제거
                    windowEl.style.border = "none"; // 테두리 제거

                    isMaximized = true;
                } else {
                    // 원래 크기로 복원
                    windowEl.style.width = originalWidth;
                    windowEl.style.height = originalHeight;
                    windowEl.style.left = originalLeft;
                    windowEl.style.top = originalTop;
                    if (windowEl.id === "mainWindow") { // mainWindow만 중앙 정렬 transform 복원
                        windowEl.style.transform = "translateX(-50%)";
                    }
                    windowEl.style.borderRadius = ""; // CSS 기본값으로 복원
                    windowEl.style.boxShadow = ""; // CSS 기본값으로 복원
                    windowEl.style.border = ""; // CSS 기본값으로 복원

                    isMaximized = false;
                }
            });
        }

        // 닫기 버튼
        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // 드래그 이벤트와 겹치지 않도록
                windowEl.style.display = "none"; // 윈도우 숨기기
                // 실제로는 DOM에서 제거하거나, 나중에 다시 열 수 있도록 상태 관리 필요
            });
        }
    });

    // 미니 윈도우 버튼 기능 (닫기만 구현)
    document.querySelectorAll(".mini-window").forEach(miniWindowEl => {
        const closeBtn = miniWindowEl.querySelector("img[alt='닫기 버튼']");
        const minimizeBtn = miniWindowEl.querySelector("img[alt='최소화 버튼']");

        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                miniWindowEl.style.display = "none";
            });
        }
        if (minimizeBtn) {
            minimizeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                miniWindowEl.classList.toggle("minimized");
            });
        }
    });


    // 페이지 로드 시 캐릭터 요소 생성
    createCharacterElements();
    // 초기 정보 패널 설정 (선택 사항, HTML에 이미 기본 내용 있음)
    // resetInfoPanel();
});
