const express = require('express');
const app = express();
    app.use(express.json());
const port = 3000;
const eventRouter = require('./routers/eventRouters');
const cors = require('cors');
    app.use(cors());
    app.use('/eventos', eventRouter);

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
