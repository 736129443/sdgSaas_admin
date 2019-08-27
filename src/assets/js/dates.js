function computTimeHorizon(whereTheTime, type) {
    var d = new Date(whereTheTime);
    var year = d.getFullYear();
    switch (type) {
        case "1"://周
            //获取周一
            var beginWhereTheTime = GetMondayAndSunday(d);
            var dd = new Date(beginWhereTheTime);
            var beginTime = dd.getTime();
            var beginTimes=beginTime-8*3600*1000

            console.log("beginWhereTheTime:" + beginWhereTheTime + "dd" + dd);
            console.log(beginTimes);
            //获取周天
            dd.setDate(dd.getDate() + 6);
            var monthSunday = parseInt(dd.getMonth()) + 1;
            var endWhereTheTime = dd.getFullYear() + "-" + formatDate(monthSunday) + "-" + formatDate(dd.getDate());
            var date = new Date(endWhereTheTime);
            var endTime = date.getTime();
            console.log("monthSunday:" + monthSunday + "endWhereTheTime" + endWhereTheTime + "endTime" + endTime);
            var endTimes=endTime+16*3600*1000-1
            return {
                startTime: beginTimes,
                endTime: endTimes
            }
        case "2"://月
            //获取月第一天
            var fristDay = new Date(year, month, 1);
            beginWhereTheTime = year + "-" + formatDate(month) + "-" + formatDate(fristDay.getDate());
            console.log("fristDay:" + fristDay + "beginWhereTheTime" + beginWhereTheTime);
            var dd = new Date(beginWhereTheTime);
            var beginTime = dd.getTime();
            var beginTimes=beginTime-8*3600*1000
            //获取月最后一天
            var lastDay = new Date(year, month, 0);
            var endWhereTheTime = year + "-" + formatDate(month) + "-" + formatDate(lastDay.getDate());
            console.log("lastDay:" + lastDay + "endWhereTheTime" + endWhereTheTime);
            var date = new Date(endWhereTheTime);
            var endTime = date.getTime();
            var endTimes=endTime+16*3600*1000-1
            return {
                startTime: beginTimes,
                endTime: endTimes
            }
        case "3"://季度
            //获取当前月所在季度
            var quarter = getQuarterStartMonth(month);
            if (quarter != 0) {
                //获取季度第一天
                var fristDay = new Date(year, quarter, 1);
                //获取季度最后一天
                var lastDay = new Date(year, quarter + 2, 0);
                var beginWhereTheTime = year + "-" + formatDate(quarter) + "-" + formatDate(fristDay.getDate());

                var dd = new Date(beginWhereTheTime);
                var beginTime = dd.getTime();
                var beginTimes=beginTime-8*3600*1000

                var endWhereTheTime = year + "-" + formatDate(quarter + 2) + "-" + formatDate(lastDay.getDate());
                var date = new Date(endWhereTheTime);
                var endTime = date.getTime();
                var endTimes=endTime+16*3600*1000-1
            }
            return {
                startTime: beginTimes,
                endTime: endTimes
            }
        case "4"://全年
            var beginWhereTheTime = year + "-01-01";

            var dd = new Date(beginWhereTheTime);
            var beginTime = dd.getTime();
            var beginTimes=beginTime-8*3600*1000

            var endWhereTheTime = year + "-12-31";
            var date = new Date(endWhereTheTime);
            var endTime = date.getTime();
            var endTimes=endTime+16*3600*1000-1
            return {
                startTime: beginTimes,
                endTime: endTimes
            }
    }
    var month = parseInt(d.getMonth()) + 1;
    console.log("year" + year + "month" + month);
}
//获取指定日期所在周周一
function GetMondayAndSunday(dd) {
    var week = dd.getDay(); //获取时间的星期数
    var minus = week ? week - 1 : 6;
    dd.setDate(dd.getDate() - minus); //获取minus天前的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取月份
    var d = dd.getDate();
    return y + "-" + formatDate(m) + "-" + formatDate(d);
}

//格式化月和日为MM、dd
function formatDate(value) {
    if (value < 10) {
        value = "0" + value;
    }
    return value;
}

//获取当前月所在季度的开始月
function getQuarterStartMonth(month) {
    var quarterStartMonth = 0;
    if (month < 4) {
        quarterStartMonth = 1;
    }
    if (3 < month && month < 7) {
        quarterStartMonth = 4;
    }
    if (6 < month && month < 10) {
        quarterStartMonth = 7;
    }
    if (month > 9) {
        quarterStartMonth = 10;
    }
    return quarterStartMonth;
}

export {
    computTimeHorizon
}