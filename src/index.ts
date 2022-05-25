import { defaultType, onlyLetters, onlyNumbers } from './types'
import { randomInt } from 'node:crypto'

export class Generator implements GeneratorOptions {
	public type: GeneratorTypes | undefined
	public length: number
	public custom!: string | string[]

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	constructor(options?: GeneratorOptions) {
		this.type = options?.type
		this.length = options?.length || 10
		if (options?.custom) this.custom = options.custom
	}

	public generate() {
		if (typeof this.length !== 'number') throw new TypeError('Length must be a number')

		if (this.custom && this.type) {
			throw new Error('You cannot customize a id and put a default type on the generator')
		}

		if (!this.custom) {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			switch (this.type?.toUpperCase() as GeneratorTypes) {
				case 'DEFAULT':
					this.custom = defaultType
					break
				case 'ONLY_NUMBERS':
					this.custom = onlyNumbers
					break
				case 'ONLY_LETTERS':
					this.custom = onlyLetters
					break
				case undefined:
					this.custom = defaultType
					break
				default:
					throw new TypeError(
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						`The supplied type is not a valid type, recived(${this.type})`
					)
			}
		}

		if (!Array.isArray(this.custom)) {
			if (typeof this.custom === 'string') {
				this.custom = this.custom.split(/ +|/)
				for (const element of this.custom) {
					if (element.length > 1) {
						throw new RangeError(
							`For custom type, you can only use one character that is not separated by an empty space on strings, recived(${element})`
						)
					}
				}
			} else {
				throw new TypeError(
					`For custom ids you can only put an array or a string, recived(${typeof this
						.custom})`
				)
			}
		} else {
			for (const element of this.custom) {
				if (element.length > 1) {
					throw new RangeError(
						`For custom ids array elements must be only one length string, recived(${element})`
					)
				}
			}
		}
		const type = this.custom

		const id: string[] = []

		for (let number = 0; number < this.length; number++) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			const once = type[randomInt(0, type.length)]
			id.push(once)
		}

		return id.join('')
	}
}

export type GeneratorTypes = 'ONLY_LETTERS' | 'ONLY_NUMBERS' | 'DEFAULT'

export interface GeneratorOptions {
	type?: GeneratorTypes
	length?: number
	custom?: string | string[]
}
