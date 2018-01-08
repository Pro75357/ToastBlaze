// global functions go here

// this just calculates the age in years based on birthdate
getAge = function(dobString){
    let dob = new Date (dobString);
    let ageDifMs = Date.now() - dob.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear()- 1970)
};

