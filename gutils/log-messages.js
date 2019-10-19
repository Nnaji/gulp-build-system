import log from 'fancy-log';
import c from 'ansi-colors';

let logMessages = function(msg) {
    if (typeof msg === 'object') {
        for (let i in msg) {
            if (msg.hasOwnProperty(i)) {
                log.info(c.greenBright(msg[i]));
            }
        }
    } else {
    // console.log(msg);
        log.info(c.greenBright(msg));
    }
};

export { logMessages };
