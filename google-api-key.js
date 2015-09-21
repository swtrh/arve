var googleKey = process.env.GOOGLE_API_KEY;
if (googleKey === undefined) {
    throw("No google api key specified");
}
module.exports = googleKey;
