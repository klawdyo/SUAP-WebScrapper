import app from "./app";

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "localhost";

app.listen(+port, host, () => console.log(`Running on http://${host}:${port}`));
