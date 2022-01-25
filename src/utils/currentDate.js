const currentDate = () => {
    var today = new Date()
    var sc = String(today.getSeconds()).padStart(2, '0')
    var mi = String(today.getMinutes()).padStart(2, '0')
    var hh = String(today.getHours()).padStart(2, '0')
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd + '-' + hh + '-' + mi + '-' + sc
    return today
}
export default currentDate