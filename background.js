function fetchData() {
  fetch('https://klas.kw.ac.kr/std/cps/inqire/AtnlcScreSungjukTot.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(data => {
      // 데이터를 chrome.storage에 저장
      chrome.storage.local.set({ currentScores: data }, () => {
      });
    })
    .catch(error => {
      console.error('취득 학점 정보를 가져오는데 실패하였습니다:', error);
    });

  fetch('https://klas.kw.ac.kr/std/cps/inqire/AtnlcScreSungjukInfo.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(data => {
      // 데이터를 chrome.storage에 저장
      chrome.storage.local.set({ SungjukInfo: data }, () => {
      });
      console.log("성적Info : ", data);
    })
    .catch(error => {
      console.error('성적 정보를 가져오는데 실패하였습니다:', error);
    });

  fetch('https://klas.kw.ac.kr/std/cps/inqire/AtnlcScreHakjukInfo.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(data => {
      // 데이터를 chrome.storage에 저장
      chrome.storage.local.set({ HakjukInfo: data }, () => {
      });
      console.log("HakjukInfo : ", data);
    })
    .catch(error => {
      console.error('학적 정보를 가져오는데 실패하였습니다:', error);
    });

  fetch('https://klas.kw.ac.kr/std/cps/inqire/AtnlcScreSungjukTot.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      // 데이터를 chrome.storage에 저장
      chrome.storage.local.set({ SungjukTotal: data }, () => {
      });
      console.log("SungjukTotal : ", data);
    })
    .catch(error => {
      console.error('성적 평량평균 정보를 가져오는데 실패하였습니다:', error);
    });

}
  

// background.js
function openNewTab(url, hakbun) {
  const newURL = `${url}?hakbun=${hakbun}`;
  chrome.tabs.create({ url: newURL });
}
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  fetchData();

  if (message.action === "openNewTab") {
    switch(message.hakgwa) {
      case "정보융합학부":
        openNewTab("html/informationConvergence.html", message.hakbun);
        break;
      case "전자공학과":
        openNewTab("html/electronic.html", message.hakbun);
        break;
      case "경영학부":
        openNewTab("html/business.html", message.hakbun);
        break;
      case "성적계산기":
        openNewTab("html/calculator.html");
        break;
      default:
        console.log("해당 학과 정보를 처리할 수 없습니다.");
    }
  } else {
    console.log("알 수 없는 액션입니다.");
  }
});