//학번 추출해서 전역변수로 만드는 함수
function getHakbunFromURL() {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get('hakbun');
}

// 정보융합학부 졸업 요건 json에서 졸업학점, 전체 학점 불러오기
let majorCredits, totalCredits;

document.addEventListener("DOMContentLoaded", function() {
    // 정보융합학부 졸업 요건 데이터 먼저 로드
    fetch('../data/informationConvergence.json')
        .then(response => response.json())
        .then(jsonData => {
            majorCredits = jsonData["졸업학점"]["전공학점"];
            totalCredits = jsonData["졸업학점"]["전체학점"];
            console.log("Loaded infoconv.json:", majorCredits, totalCredits);

            // 졸업 요건 로드 완료 후 현재 학점 정보 로드
            chrome.storage.local.get(['currentScores'], function(result) {
                if (result.currentScores) {
                    console.log("저장된 데이터:", result.currentScores);
                    checkScoreTable(result.currentScores);
                } else {
                    console.error("저장된 데이터가 없습니다.");
                }
            });
        })
        .catch(error => {
            console.error('Error fetching graduation requirement data:', error);
        });
});

//전공,교양 학점 현재 score 확인
function checkScoreTable(data) {
  

    const textDiv = document.createElement('h1');
    textDiv.textContent = '현재 취득 학점(전공, 전체)'; // 텍스트 설정
    textDiv.style.textAlign = 'center'; // 가운데 정렬
  
    // 테이블 요소 생성
    const table = document.createElement('table');
    table.style.width = '80%'; // 가로폭 조정
    table.style.margin = '20px auto'; // 가운데 정렬을 위해 margin 조정
    table.style.border = '1px solid #ddd';
  
    // 테이블 헤더 생성
    const thead = document.createElement('thead');
    table.appendChild(thead);
  
    // 헤더 행 생성
    const headerRow = document.createElement('tr');
    thead.appendChild(headerRow);
  
    // 헤더 셀 생성
    const headers = ['전공 학점', '전체 학점'];
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerCell.style.textAlign = 'center';
        headerCell.style.backgroundColor = '#f5f5f5';
        headerRow.appendChild(headerCell);
    });
  
    // 테이블 본문 생성 (데이터를 채워 넣습니다.)
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
  
    console.log("함수 안에서 global 변수 값 확인 : ", majorCredits, totalCredits);
      // 데이터 배열
      const rowData = [
        `${data.majorChidukHakjum}/${majorCredits}`, 
        `${data.chidukHakjum}/${totalCredits}`
    ];
      const row = document.createElement('tr');
      tbody.appendChild(row);
      rowData.forEach(cellData => {
        const cell = document.createElement('td');
        cell.textContent = cellData;
        cell.style,height ='50px'; //셀 높이
        cell.style.textAlign = 'center';
        row.appendChild(cell);
      });
  
    document.body.insertBefore(textDiv, document.body.firstChild);
  
    // 문서의 body에 테이블 삽입
    document.body.insertBefore(table, textDiv.nextSibling);
  }

  
     
  //기초교양 테이블 재생성하여 배치
  function gyoyangTable(data) {
    
    //컨테이너 생성
    const container = document.createElement('div');
    container.style.marginLeft = '10%'; // 왼쪽 여백 설정
    container.style.width = '32%'; // 컨테이너의 너비를 40%로 설정
    container.style.float = 'left'; // 왼쪽으로 정렬
    container.style.marginTop = '20px'; // 상단 여백 설정
  
    const textDiv = document.createElement('h1');
    textDiv.textContent = '기초교양'; // 텍스트 설정
    // textDiv.style.textAlign = 'left'; // 가운데 정렬
  
    // 테이블 요소 생성
    const table = document.createElement('table');
    table.style.width = '100%'; // 가로폭 조정
    // table.style.margin = '20px auto'; // 가운데 정렬을 위해 margin 조정
    table.style.border = '1px solid #ddd';
  
    // 테이블 헤더 생성
    const thead = document.createElement('thead');
    table.appendChild(thead);
  
    // 헤더 행 생성
    const headerRow = document.createElement('tr');
    thead.appendChild(headerRow);
  
    // 헤더 셀 생성
    const headers = ['광운인 되기', '대학 영어','정보 영역','융합적 사고와 글쓰기 영역'];
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerCell.style.textAlign = 'center';
        headerCell.style.height = '50px'; // 셀의 높이를 조절합니다.
        headerCell.style.backgroundColor = '#f5f5f5';
        headerRow.appendChild(headerCell);
    });
  
    // 테이블 본문 생성 (데이터를 채워 넣습니다.)
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
  
  
    // 데이터 배열
    const rowData = [data.aa8128, data.aa3362, data.aa76, data.aa64]; // 데이터를 빈칸으로 채웁니다.
    const row = document.createElement('tr');
    tbody.appendChild(row);
    rowData.forEach(cellData => {
      const cell = document.createElement('td');
      cell.textContent = cellData;
      cell.style,height ='50px'; //셀 높이
      cell.style.textAlign = 'center';
      row.appendChild(cell);
    });
  
    container.appendChild(textDiv);
    container.appendChild(table);
  
  
  
    var secondChild = document.body.childNodes[1]; // 두 번째 자식 요소 가져오기
    document.body.insertBefore(container, secondChild.nextSibling);
    // document.body.insertBefore(textDiv, secondChild.nextSibling);
    
  }
  
  
  // 균형교양 테이블 생성 함수 호출
  fetch('https://klas.kw.ac.kr/std/cps/inqire/GyoyangIsuInfo.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(jsonData => {
      // gyoyangTable 함수 호출하여 테이블 업데이트
      gyoyangTable(jsonData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  
  
  //균형교양 테이블 생성 배치
  function partgyoyangTable(data) {
    //컨테이너 생성
    const container = document.createElement('div');
    container.style.marginRight = '10%'; // 왼쪽 여백 설정
    container.style.width = '45%'; // 컨테이너의 너비를 40%로 설정
    container.style.float = 'right'; // 왼쪽으로 정렬
    container.style.marginTop = '20px'; // 상단 여백 설정
  
    const textDiv = document.createElement('h1');
    textDiv.textContent = '균형교양'; // 텍스트 설정
  
    // 테이블 요소 생성
    const table = document.createElement('table');
    table.style.width = '100%'; // 가로폭 조정
    // table.style.margin = '20px auto'; // 가운데 정렬을 위해 margin 조정
    table.style.border = '1px solid #ddd';
  
    // 테이블 헤더 생성
    const thead = document.createElement('thead');
    table.appendChild(thead);
  
    // 헤더 행 생성
    const headerRow = document.createElement('tr');
    thead.appendChild(headerRow);
  
    // 헤더 셀 생성
    const headers = ['과학과 기술 영역', '인간과 철학 영역', '사회와 경제 영역', '글로벌 문화와 제2외국어 영역', '예술과 체육 영역', '수리와 자연 영역'];
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        // 공백을 <br> 태그로 교체하여 줄바꿈을 수행
        headerCell.innerHTML = headerText.replace(/\s/g, '<br>');
        headerCell.style.textAlign = 'center';
        headerCell.style.height = '50px'; // 셀의 높이를 조절합니다.
        headerCell.style.backgroundColor = '#f5f5f5';
        headerRow.appendChild(headerCell);
    });
  
    // 테이블 본문 생성 (데이터를 채워 넣습니다.)
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
  
  
    // 데이터 배열
    const rowData = [data.aa63, data.aa65, data.aa66, data.aa67,data.aa68,data.aa7881]; // 데이터를 빈칸으로 채웁니다.
    const row = document.createElement('tr');
    tbody.appendChild(row);
    rowData.forEach(cellData => {
      const cell = document.createElement('td');
      cell.textContent = cellData;
      cell.style,height ='50px'; //셀 높이
      cell.style.textAlign = 'center';
      row.appendChild(cell);
    });
    container.appendChild(textDiv);
    container.appendChild(table);
  
  
    var secondChild = document.body.childNodes[1]; // 두 번째 자식 요소 가져오기
    document.body.insertBefore(container, secondChild.nextSibling);
  }
  
  
  // 필수교양 테이블 생성 함수 호출
  fetch('https://klas.kw.ac.kr/std/cps/inqire/GyoyangIsuInfo.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(jsonData => {
      // gyoyangTable 함수 호출하여 테이블 업데이트
      partgyoyangTable(jsonData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  
  
  
  
  
  
    //필수강의 테이블 생성!
  // 필수 강의 데이터와 비교하여 테이블 생성 및 페이지에 삽입하는 함수
  function createAndInsertTable(completedCourses, requiredCourses,hakbun) {
    // 테이블 요소 생성
    const table = document.createElement('table');
    table.style.width = '80%'; // 가로폭 조정
    table.style.margin = '20px auto'; // 가운데 정렬을 위해 margin 조정
    table.style.border = '1px solid #ddd';
  
    // 테이블 헤더 생성
    const thead = document.createElement('thead');
    table.appendChild(thead);
  
    // 헤더 행 생성
    const headerRow = document.createElement('tr');
    thead.appendChild(headerRow);
  
    // 헤더 셀 생성
    const headers = ['학정번호', '과목명', '분류', '수강여부'];
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerCell.style.textAlign = 'center';
        headerCell.style.backgroundColor = '#f5f5f5';
        headerRow.appendChild(headerCell);
    });
  
    // 테이블 본문 생성
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
  
    // 필수 강의 데이터와 비교하여 테이블 행 생성
    for (const category in requiredCourses.학번별[globalHakbun]) {
        requiredCourses.학번별[globalHakbun][category].forEach(course => {
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const categoryCell = document.createElement('td');
            const statusCell = document.createElement('td');
  
            idCell.textContent = course.id;
            nameCell.textContent = course.name;
            categoryCell.textContent = category;
  
            // 수강 여부 확인
            const courseStatus = completedCourses.includes(parseInt(course.id)) ? "수강 완료" : "수강 필요";
            statusCell.textContent = courseStatus;
  
            // 수강 필요 시 텍스트 스타일 변경
            if (courseStatus === "수강 필요") {
                statusCell.style.color = 'red';
                statusCell.style.fontWeight = 'bold';
            }
  
            // 테이블 셀 스타일 설정
            [idCell, nameCell, categoryCell, statusCell].forEach(cell => {
                cell.style.textAlign = 'center';
                cell.style.border = '1px solid #ddd';
                row.appendChild(cell);
            });
  
            tbody.appendChild(row);
        });
    }
  
    // .tablegw 클래스를 가진 첫 번째 요소를 찾아 그 다음 위치에 테이블 삽입
    const insertionPoint = document.querySelector('.tablegw');
    if (insertionPoint) {
        insertionPoint.parentNode.insertBefore(table, insertionPoint.nextSibling);
    } else {
        document.body.appendChild(table);
    }
  }
  
  
  
  //학정번호 추출하는 함수
    function extractCompletedCourses(data) {
      const hakjungNoList = [];
      data.forEach(item => {
          item.sungjukList.forEach(sungjukItem => {
            const parts = sungjukItem.hakjungNo.split('-');
            const thirdPart = parseInt(parts[2], 10);
            hakjungNoList.push(thirdPart);
          });
      });
      return hakjungNoList;
  }
  
  let requiredCoursesData = {};
  
  let gipilData = {};
  let geanpilData ={};

  var globalHakbun;
  // JSON 파일에서 기필만 불러오기
  document.addEventListener("DOMContentLoaded", function() {
    globalHakbun = getHakbunFromURL();

    fetch('../data/informationConvergence.json')
        .then(response => response.json())
        .then(jsonData => {
          gipilData = {
              "학번별":{
                  [globalHakbun]:{
                      "기필":jsonData["학번별"][globalHakbun]["기필"]
                  }
              }
            };
            // 필수 강의 데이터와 수강한 강의 목록을 비교하여 테이블 생성
            createAndInsertTable();
        })
        .catch(error => {
        });
      
    
  
    // JSON 파일에서 전필만 불러오기
    fetch('../data/informationConvergence.json')
        .then(response => response.json())
        .then(jsonData => {
          geanpilData = {
              "학번별":{
                [globalHakbun]:{
                      "전필":jsonData["학번별"][globalHakbun]["전필"]
                  }
              }
            };
            // 필수 강의 데이터와 수강한 강의 목록을 비교하여 테이블 생성
            createAndInsertTable();
        })
        .catch(error => {
        });
      })
  
  //수강한 강의들 불러오기
  fetch('https://klas.kw.ac.kr/std/cps/inqire/AtnlcScreSungjukInfo.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(jsonData => {
      // gyoyangTable 함수 호출하여 테이블 업데이트
      const completedCourses = extractCompletedCourses(jsonData);
      createAndInsertTable(completedCourses, gipilData);
      createAndInsertTable(completedCourses, geanpilData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
