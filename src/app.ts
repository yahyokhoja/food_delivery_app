import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import routes from './routes';
import sequelize from './config/database';

const app = express();
const port = 3000;

// Используем helmet для настройки заголовков безопасности
app.use(helmet());

// Настраиваем политику безопасности контента (CSP)
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'https://www.gstatic.com', 'https://stackpath.bootstrapcdn.com'],
            scriptSrc: ["'self'", 'https://www.gstatic.com', 'https://code.jquery.com', 'https://cdn.jsdelivr.net'],
            imgSrc: ["'self'", 'data:'],
            connectSrc: ["'self'", 'https://translate-pa.googleapis.com'],
        },
    })
);

app.use(bodyParser.json());
app.use('/api', routes);

// Обслуживаем статические файлы из папки public
app.use(express.static(path.join(__dirname, '../public')));

// Добавляем маршрут для корневого URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Добавляем маршрут для админки
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Инициализируем базу данных и запускаем сервер
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Сервер запущен на http://localhost:${port}`);
    });
});