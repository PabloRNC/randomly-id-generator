"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const id = new index_1.Generator({
    type: 'only_letters',
    length: 20,
});
console.log(id.generate());
//# sourceMappingURL=index.test.js.map