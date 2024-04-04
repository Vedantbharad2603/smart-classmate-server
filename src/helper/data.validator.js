function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobileNumber(mobileNumber) {
    return /^[0-9]{10}$/.test(mobileNumber);
}
function isValidPassword(password) {
    // Password must be at least 8 characters long
    // and contain at least one uppercase letter, one lowercase letter, and one digit
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

module.exports = {
    isValidEmail,
    isValidMobileNumber,
    isValidPassword
};