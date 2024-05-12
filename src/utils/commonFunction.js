export const validateMobileNumber = (mobileNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
}
