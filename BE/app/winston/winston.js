const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

module.exports = winston.createLogger({
  // format của log được kết hợp thông qua format.combine
  format: winston.format.combine(
    winston.format.splat(),
    // Định dạng time cho log
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    // thêm màu sắc
    winston.format.colorize(),
    // thiết lập định dạng của log
    winston.format.printf(
      log => {
        // nếu log là error hiển thị stack trace còn không hiển thị message của log 
        if(log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
        return  `[${log.timestamp}] [${log.level}] ${log.message}`;
      },
    ),
  ),
  transports: [
    // hiển thị log thông qua console
    new winston.transports.Console(),
    // Thiết lập ghi các errors vào file 
    new winston.transports.DailyRotateFile({
      maxsize: 5242880,
      datePattern: 'YYYY-MM-DD',
      filename: path.join(__dirname, `/logs/%DATE%_logger.log`), 
    })
  ],
})












// module.exports = createLogger({
//     format: combine(
//         printf(info =>{
//             if(info && info.level == 'warn'){
//                 return `[${moment().format()}] [WARNING] ${info.message}`;
//             }
//             else
//             {
//                 return `[${moment().format()}] [${info.level.toUpperCase()}]${info.message}`;
//             }
//         }),
//     ),

//     transport:[
//         new (require('winston-daily-rolate-file'))({
//             timestamps: () => `[${moment().format()}]`,
//             datePattern: 'YYYYMMDD',
//             filename: 'winstone_%DATE%.log',
//             dirname: 'logs',
//         })
//     ],
//     exitError: false,

// })