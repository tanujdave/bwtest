
/**
 * Convert the given string to title case.
 * 
 * @param {String} str 
 */
export const titleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Replace list of keys of given string.
 * 
 * @param {String} str 
 * @param {Object} keys 
 */
export const replaceStringKyes = (str, keys) => {
    Object.keys(keys).map(function (key) {
        str = str.replace(`{${key}}`, keys[key]);
    });
    return str;
}