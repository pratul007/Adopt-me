import { express } from "express";
import { renderToString} from 'react-dom/server';
import { StaticRouter } from "react-router";
import fs from 'fs';
import App from '../src/App';

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync('dist/index.html').toString();
const parts = html.split('not render');

const app = express();

app.use('/dist' , express.static('dist'));
app.use((req, res) => {
    const staticContext = {};
    const reactMakeup = (
        <StaticRouter url={req.url} context={staticContext}>
            <App />
        </StaticRouter>
    );

    res.status(staticContext.statusCode || 200);
    res.send(`${parts[0]}${renderToString(reactMakeup)}${parts[1]}`);
    res.end();
});

console.log(`listing on http://localhost:${PORT}`);
app.listen(PORT);