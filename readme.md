const notice = {};
const date = new Date(Date.now())

notice['date'] = date.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }) + ' ' + date.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' });

//eas build 
//https://expo.dev/accounts/clown327/projects/rokaAppbata/builds/091cbdd6-62a8-4617-9499-c07cd849ec8f
