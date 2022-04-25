"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const default_1 = require("./types/default");
const only_letters_1 = require("./types/only_letters");
const only_numbers_1 = require("./types/only_numbers");
class Generator {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor({ type, length, custom, }) {
        this.type = type;
        this.length = length || 10;
        this.custom = custom;
    }
    generate() {
        if (typeof this.length !== 'number') {
            throw new Error('Length must be a number');
        }
        if (this.custom && this.type) {
            throw new Error('You cannot customize a id and put a default type on the generator');
        }
        if (!this.custom) {
            switch (this.type ? this.type.toLowerCase() : this.type) {
                case 'default':
                    {
                        this.custom = default_1.default_type;
                    }
                    break;
                case 'only_numbers':
                    {
                        this.custom = only_numbers_1.only_numbers;
                    }
                    break;
                case 'only_letters':
                    {
                        this.custom = only_letters_1.only_letters;
                    }
                    break;
                case undefined:
                    {
                        this.custom = default_1.default_type;
                    }
                    break;
                default: {
                    throw new Error(
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `The supplied type is not a valid type, recived(${this.type})`);
                }
            }
        }
        if (!Array.isArray(this.custom)) {
            switch (typeof this.custom) {
                case 'string':
                    {
                        // eslint-disable-next-line no-var
                        var type = this.custom.split(' ');
                        type.forEach((element) => {
                            if (element.length > 1) {
                                throw new Error(`For custom type, you can only use one character that is not separated by an empty space on strings, recived(${element})`);
                            }
                        });
                    }
                    break;
                default: {
                    throw new Error(`For custom ids you can only put an array or a string, recived(${typeof this
                        .custom})`);
                }
            }
        }
        else {
            this.custom.forEach((element) => {
                if (element.length > 1) {
                    throw new Error(`For custom ids array elements must be only one length string, recived(${element})`);
                }
            });
            // eslint-disable-next-line no-var
            var type = this.custom;
        }
        const id = [];
        for (let number = 0; number < this.length; number++) {
            // eslint-disable-next-line computed-property-spacing
            const once = type[Math.floor(Math.random() * type.length)];
            id.push(once);
        }
        return id.join('');
    }
}
exports.Generator = Generator;
//# sourceMappingURL=index.js.map