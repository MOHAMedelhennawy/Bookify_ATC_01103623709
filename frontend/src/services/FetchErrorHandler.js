export default (fn) => {
    return (...args) => {
        try {
            return fn(...args);
        } catch (error) {
            console.log(error)
        }
    }
};