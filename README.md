# NOTIFAM
> 농작물 현재 시세를 알려주는 농민을 위한 앱  
> `open API`를 통한 실시간 가격정보 확인 가능

- 앱 로고

<img src="https://user-images.githubusercontent.com/45661217/142871412-80458671-41f2-45e4-9921-0cc09f3ecc9d.png" width="100px">

- 앱 기능
  - 농산물 실시간 가격 가져오기
  - 선형 회귀 AI를 통한 농산물 가격 예측하기
  - 농산물 가격 검색기능

- 앱 초기 디자인

<img src="https://user-images.githubusercontent.com/45661217/142872735-cbad986f-1d5e-446c-83b3-a1f52acc3aa7.png" width="610px">

- 앱 UI
<div>
<img src="https://user-images.githubusercontent.com/45661217/142871879-74c4a457-cd00-4f96-b25d-f6232e9577b0.png" width="200px">
<img src="https://user-images.githubusercontent.com/45661217/142872025-f2be695f-0666-4cee-ba04-ff38809621b5.png" width="200px">
<img src="https://user-images.githubusercontent.com/45661217/142872040-c52d7ad8-1891-4978-980c-84d687c4913d.png" width="200px">
<div/>
  
- AI

`선형 회귀`를 이용하여 개발  
AI 모델을 `flask` 서버에 올려서 `fetch`로 그 값을 받아 와서 구현
  
- 앱 구현 영상

<details>
  <summary>클릭</summary>
  <video src="https://user-images.githubusercontent.com/45661217/142947529-28e535af-abeb-424a-9a95-9e6ef33a543b.mp4"></video>
</details>
