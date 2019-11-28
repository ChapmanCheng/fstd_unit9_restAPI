module.exports.checkNotNull = course => {
    if (course) {
        return course;
    } else {
        const error = new Error("No course found");
        error.status = 400;
        throw error;
    }
};
