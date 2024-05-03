"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        'credentials': true,
        'origin': true,
        'methods': "GET, HEAD, PUT, POST, PATCH, DELETE",
        'allowedHeaders': 'rejectUnauthorized,Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
    });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map