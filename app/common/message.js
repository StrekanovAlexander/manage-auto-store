export default (req) => {
    let message = null;
    if (req.session.msgTitle) {
        message = { title: req.session.msgTitle, type: req.session.msgType };
        req.session.msgTitle = null;
        req.session.msgType = null;
    }
    return message;
}