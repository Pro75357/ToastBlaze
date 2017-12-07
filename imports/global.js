// global functions go here

getAge = function(dobString){
    let dob = new Date (dobString)
    let ageDifMs = Date.now() - dob.getTime()
    let ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear()- 1970)
}