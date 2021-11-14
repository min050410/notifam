// 날짜 구하기
function todayTime() {
    let now = new Date;
    let year = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let dayOfWeek = week[now.getDay()];
    return year + '년 ' + todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일 ';
}

export default todayTime;