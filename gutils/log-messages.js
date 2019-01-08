import util from 'gulp-util';

let logMessages = function(msg) {
    if (typeof(msg) === 'object') {
        for (let i in msg) {
            if (msg.hasOwnProperty(i)) {
                util.log(util.colors.grey(msg[i]));
            }
        }
    } else {
        // console.log(msg);
        util.log(util.colors.grey(msg));
    }
};



export { logMessages };