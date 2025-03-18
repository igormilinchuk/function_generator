// let currentDateTime = '2025-03-17 21:00:00';

// const [datePart, timePart] = currentDateTime.split(' ');
// const [year, month, day] = datePart.split('-').map(Number);
// const [hours, minutes, seconds] = timePart.split(':').map(Number);

// const nextDate = new Date(year, month - 1, day, hours, minutes, seconds);
// console.log(nextDate.toLocaleString()); 

// nextDate.setHours(nextDate.getHours() + 3);
// console.log(nextDate.toLocaleString()); 

// const formattedDate = nextDate.getFullYear() + '-' +
//                       String(nextDate.getMonth() + 1).padStart(2, '0') + '-' +
//                       String(nextDate.getDate()).padStart(2, '0') + ' ' +
//                       String(nextDate.getHours()).padStart(2, '0') + ':' +
//                       String(nextDate.getMinutes()).padStart(2, '0') + ':' +
//                       String(nextDate.getSeconds()).padStart(2, '0');

// console.log(formattedDate);






// let currentDateTime = '2025-03-17 21:00:00';
// const timeZone = 'Europe/Kiev';

// let [datePart, timePart] = currentDateTime.split(' ');
// let [year, month, day] = datePart.split('-').map(Number);
// let [hours, minutes, seconds] = timePart.split(':').map(Number);

// let nextDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

// nextDate.setUTCHours(nextDate.getUTCHours() + 3);

// const formattedDate = new Intl.DateTimeFormat('uk-UA', {
//     timeZone: timeZone,
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: false
// }).format(nextDate);

// const convertedDate = formattedDate.replace(/(\d+)\.(\d+)\.(\d+), (\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');

// console.log(convertedDate);









const { DateTime } = require('luxon');

let currentDateTime = '2025-03-17 21:00:00';
const timeZone = 'Europe/Kiev';

let nextDate = DateTime.fromFormat(currentDateTime, 'yyyy-MM-dd HH:mm:ss', { zone: timeZone });

console.log("До:", nextDate.toFormat('yyyy-MM-dd HH:mm:ss'));

nextDate = nextDate.plus({ hours: 3 });

console.log("Після:", nextDate.toFormat('yyyy-MM-dd HH:mm:ss'));

