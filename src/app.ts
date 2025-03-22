import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes/index';
import sequelize from './config/database';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});