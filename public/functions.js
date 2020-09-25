const moment= require('moment')
exports.getFormatDate = (date)=>{
    const format = "YYYY-MM-DD 23:59:59"
    return moment(date).endOf('day')
}