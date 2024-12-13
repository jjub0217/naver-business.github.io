# 네이버 비즈니스 스쿨 웹 사이트 클론코딩 

  <img alt="logo" src="https://github.com/jjub0217/jjub0217.github.io/assets/62126380/c80d8283-8c92-464b-abc9-19841cd8bf1c" width=80>


----
이 프로젝트는 네이버 비즈니스 스쿨 웹 사이트 클론코딩 한 페이지입니다. <br>
2023.08.27 ~ 2023.09.05 열흘간 페이지를 제작, 수정 및 배포하였습니다. <br>
헤더를 건너뛰고 바로 본문으로 넘어갈수 있게끔 tab 키 기능을 추가하였습니다.
<br>
반응형 웹 페이지로 레이아웃 및 디자인이 다르게 되어있으며, Json 데이터를 fetch 해옴에 따라 사이트가 열리기까지 시각적으로 로딩 인디케이터를 볼 수 있습니다.

## 프로젝트 기능
1. 반응형 웹 페이지.
2. 데크스탑, 모바일 버전의 UI가 다르다.
3. 헤더를 건너뛰고 바로 본문으로 넘어갈수 있게끔 tab 키 기능 추가.
4. 슬라이드 기능
5. 슬라이드 화살표 버튼으로 다음과 이전 슬라이드로 이동할 수 있다.
6. 특정 슬라이드 이미지에 해당하는 텍스트영역이 고정되어 같이 슬라이드처럼 움직인다.
7. 북마크 버튼을 누르면 특정 요소를 저장한다는 알림메세지가 잠깐 보였다가 사라진다. 
8. 북마크 버튼을 누르면 특정 요소의 북마크 아이콘의 컬러가 변경된다.


## 콘솔에러 0 <br>
<img src="https://github.com/user-attachments/assets/4e1cdc80-6e2b-4f52-8cc2-c0c7139947a3" width=800> <br>

## 프로젝트 웹표준(W3C의 Markup Validation Service)
결과 : 0개 <br>
<img src="https://github.com/jjub0217/jjub0217.github.io/assets/62126380/cd9b2bd6-faf1-47ac-9faf-2b1154319317" width=800> <br>



## 프로젝트 웹접근성
- chrome Lighthouse 결과 :<br>
모바일 디바이스의 접근성 표준을 준수하였는지 로컬에서 검사할수 있는 goole 의 lighthouse 로 검사하면 개선할점이 Accessibility  항목과 Best Practices 항목에서 나타납니다.  <br>
[1] 데스크탑
<img src="https://github.com/user-attachments/assets/70f205ee-da7a-4e35-8a9f-1e7ef1b73c14" width=800> <br>
[2] 모바일
<img src="https://github.com/user-attachments/assets/1f899d28-f813-41ab-b509-879bfb28d865" width=800> <br>
- Open-WAX 결과 : error 0<br>
<img src="https://github.com/user-attachments/assets/7e22349f-ced4-4aab-8c8a-49658c62d205" width=800> <br>
- WAVE 결과: error 0<br>
<img src="https://github.com/user-attachments/assets/0400a2ca-2739-4dd9-84af-0de3c1cde5df" width=800>


## 모바일 디바이스 검수
- 안드로이드 Note20 울트라
<video src="https://github.com/user-attachments/assets/933bbfe7-495f-4677-ae1e-849ef422e2b9" autoplay muted playsinline loop></video>
- 아이폰 SE2 
<video src="https://github.com/user-attachments/assets/a628eb94-cdbd-40b7-9dc7-13a5a80f87f8" autoplay muted playsinline loop></video>
- 아이패드 6
<video src="https://github.com/user-attachments/assets/dfe480bf-0222-4d64-b599-f623d1483966" autoplay muted playsinline loop></video>


## 기술 스택
![HTML5](https://img.shields.io/badge/HTML5-FE642E?style=flat-square&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-2E9AFE?style=flat-square&logo=CSS3&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-cc6699?style=flat-square&logo=sass&logoColor=white)
![Javascript](https://img.shields.io/badge/Javascript-gray?style=flat-square&logo=Javascript&logoColor=f7df1e)
![jQuery](https://img.shields.io/badge/jQuery-0769ad?style=flat-square&logo=jQuery&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-gray?style=flat-square&logo=Swiper&logoColor=0080FF)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=GreenSock&logoColor=white)


## 포함된 자바스크립트 라이브러리
| Name      | License                          | Copyright                                 |
| --------- | -------------------------------- | ----------------------------------------- |
| Swiper.js | MIT License                      | 2019 Vladimir Kharlampidi                 |
| jQuery    | MIT License                      | OpenJS Foundation and jQuery contributors |
| GSAP      | Standard License, Club GreenSock | 3.12.2ver 2023 GreenSock LLC              |

## 개선점
- section-onlineEducation 영역의 tab item 을 클릭시에, floating_menu의 item의 텍스트 컬러도 바뀌는걸 놓쳐서 해당 디자인을 업데이트 하고 싶었음
- 어떠한 교육을 북마크 아이콘을 클릭하여 저장하면, 서버에 저장되어있다가, 저장했던 교육은 북마크 다시 클릭했을때는 북마크 저장해제 기능을 구현하고 싶었다.(서버가 없으므로 구현 불가.)


## 연락처
프로젝트에 관한 문의나 버그 리포트는 아래 이메일로 연락주세요.
이메일: devel.jjub@gmail.com

