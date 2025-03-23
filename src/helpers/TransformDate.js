export default function transformDate(date){
    const selectDate = new window.Date(date)
    const fullYear = selectDate.getFullYear()
    const month = (selectDate.getMonth()+1).toString().padStart(2 , '0');
    const day = (selectDate.getDate()).toString().padStart(2 , "0")
    return `${fullYear}-${month}-${day}`
}