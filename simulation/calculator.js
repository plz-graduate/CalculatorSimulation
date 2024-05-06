document.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 0); 
    chrome.storage.local.get(['HakjukInfo'], function (result) {
        makingHakjukTable(result.HakjukInfo);
    });
    chrome.storage.local.get(['SungjukInfo'], function (result) {
        makingSungjukTable(result.SungjukInfo);

    });
});

// 학적 정보 테이블 생성
function makingHakjukTable(data) {
    const textDiv = document.createElement('h1');
    textDiv.textContent = '성적 시뮬레이션 계산기 만들기'; // 텍스트 설정
    textDiv.style.textAlign = 'center'; // 가운데 정렬

    document.body.insertBefore(textDiv, document.body.firstChild);

    const table = document.createElement('table');
    table.style.width = '90%'; // 가로폭 조정
    table.style.margin = '0'; 
    table.style.borderCollapse = 'collapse';
    table.style.border = '2px solid #ddd';
    table.style.wordBreak = 'break-all';
    table.style.textOverflow = 'clip';
    
    const thead = document.createElement('thead');
    table.appendChild(thead);
    const headerRow = document.createElement('tr');
    thead.appendChild(headerRow);    

    // table header 데이터 삽입
    const headers = ['학과/학부', '학번', '이름', '학적상황'];
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerCell.style.textAlign = 'center';
        headerCell.style.height = '25px';
        headerCell.style.backgroundColor = '#cccccc';
        headerCell.style.border = '1px solid #ddd';
        headerRow.appendChild(headerCell);
    });

    // table body 데이터 삽입
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    const rowData = [`${data.hakgwa}`, `${data.hakbun}`, `${data.kname}`, `${data.hakjukStatu}`];
    const row = document.createElement('tr');
    tbody.appendChild(row);

    rowData.forEach(cellData => {
        const cell = document.createElement('td');
        cell.textContent = cellData;
        cell.style.height ='50px'; //셀 높이
        cell.style.textAlign = 'center';
        cell.style.border = '1px solid #ddd';
        row.appendChild(cell);
    });

    document.body.insertBefore(table, textDiv.nextSibling);
}


// 성적 테이블 생성
function makingSungjukTable(dataArray) {
    console.log("함수 안에서 성적 데이터 : ", dataArray);
    dataArray.reverse().forEach(data => {
        const table = document.createElement('table');
        table.className = 'tablegw';
        table.style.width = '90%';
        table.style.marginTop = '50px'; // 여백 추가
        table.style.borderCollapse = 'collapse';
        table.style.border = '0.5px solid #ddd';
        table.style.wordBreak = 'break-all';
        table.style.textOverflow = 'clip';

        const colgroup = document.createElement('colgroup');
        const colWidths = ['11%', '23%', '15%', '5%', '5%', '10%', '10%', '10%', '10%'];
        colWidths.forEach(width => {
            const col = document.createElement('col');
            col.style.width = width;
            colgroup.appendChild(col);
        });
        table.appendChild(colgroup);

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `<th colspan="9">${data.thisYear}년도 ${data.hakgiOrder}학기</th>`;
        headerRow.style.height = '25px';
        headerRow.style.backgroundColor = '#ddd';
        headerRow.style.border = '1px solid #ddd';
        thead.appendChild(headerRow);

        const subHeaderRow = document.createElement('tr');
        subHeaderRow.innerHTML = `<th>학정번호</th><th>과목명</th><th>개설학과</th><th>이수구분</th><th>학점</th><th>성적</th><th>인증구분</th><th>재수강여부</th><th>재수강이후 삭제여부</th>`;
        subHeaderRow.style.height = '25px';
        subHeaderRow.style.backgroundColor = '#ddd';
        subHeaderRow.style.border = '1px solid #ddd';
        thead.appendChild(subHeaderRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.sungjukList.forEach(course => {
            const row = document.createElement('tr');

            let retakeMarkup = '';
            if (course.retakeOpt === 'Y') {
                retakeMarkup = '<span style="color: red;">재수강</span>';
            } else {
                retakeMarkup = '';
            }

            row.innerHTML = `
                <td style="text-align: center;">${course.hakjungNo}</td>
                <td style="text-align: center;">${course.gwamokKname}</td>
                <td style="text-align: center;">${course.hakgwa}</td>
                <td style="text-align: center;">${course.codeName1}</td>
                <td style="text-align: center;">${course.hakjumNum}</td>
                <td style="text-align: center;">${course.getGrade}</td>
                <td style="text-align: center;">${course.certname || ''}</td>
                <td style="text-align: center;">${retakeMarkup}</td>
                <td style="text-align: center;">${course.termFinish === 'Y' ? '' : ''}</td>
            `;

            row.style.height ='30px'; //셀 높이
            row.style.border = '1px solid #ddd';

            // 재수강 해야 하는 학점인지 확인
            const retryArray = ['C+', 'C0', 'D+', 'D0'];
            if (retryArray.includes(course.getGrade)) {
                row.style.backgroundColor = '#F5BCA9';
            }
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
    
        var secondChild = document.body.childNodes[1]; // 두 번째 자식 요소 가져오기
        document.body.insertBefore(table, secondChild.nextSibling);
    });
}