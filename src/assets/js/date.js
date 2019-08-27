function formatDateTime(inputTime,formatVal='dateTime') {
    let date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second=date.getSeconds();
    second=second < 10 ? ('0' + second) : second;

    switch (formatVal){
        case 'dateTime':
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            break;
        case 'date':
            return y + '-' + m + '-' + d;
            break;
        case 'time':
            return h+':'+minute+':'+second;
            break;
        case 'years':
            return y+'年'+ m+'月'+d+' '+h+':'+minute+':'+second;
            break;
        default:
            break;
    }
};

export {
    formatDateTime
}