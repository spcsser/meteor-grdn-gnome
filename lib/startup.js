Date.dateDiff = function(datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = { w:604800000,
        d:86400000,
        h:3600000,
        n:60000,
        s:1000 };

    return Math.floor( diff/divideBy[datepart]);
};

Date.prototype.addDays = function(interval){
    this.setTime(this.getTime() + (interval * 86400000));
    return this;
};