const notice = {};
const date = new Date(Date.now())

notice['date'] = date.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }) + ' ' + date.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' });
