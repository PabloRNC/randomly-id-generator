import { default_type } from './types/default'
import { only_letters } from './types/only_letters'
import { only_numbers } from './types/only_numbers'


export class Generator {
	private type: GeneratorOptions['type']
	private length: number
	private custom: string | undefined

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	constructor({
		type,
		length,
		custom,
	}: {
		type: GeneratorOptions['type']
		length: number
		custom?: string
	}) {
		this.type = type
		this.length = length || 10
		this.custom = custom
	}

	public generate() {
		if (typeof this.length !== 'number') {
			throw new Error('Length must be a number')
		}

		if (this.custom && this.type) {
			throw new Error('You cannot customize a id and put a default type on the generator')
		}

		if(!this.custom) {
			
			switch (this.type? this.type.toLowerCase(): this.type) {
				case 'default':
					{
						this.custom = default_type as unknown as string
					}
					break
				case 'only_numbers':
					{
						this.custom = only_numbers as unknown as string
					}
					break
				case 'only_letters':
					{
						this.custom = only_letters as unknown as string
					}
					break
				case undefined:
					{
						this.custom = default_type as unknown as string
					}
					break
				default: {
					throw new Error(
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						`The supplied type is not a valid type, recived(${this.type})`
					)
				}
			}
			}
		
        
		if (!Array.isArray(this.custom)) {
			switch (typeof this.custom) {
				case 'string':
					{
						// eslint-disable-next-line no-var
						var type = this.custom.split(' ')

						type.forEach((element: string) => {
							if (element.length > 1) {
								throw new Error(
									`For custom type, you can only use one character that is not separated by an empty space on strings, recived(${element})`
								)
							}
						})
					}
					break
				default: {
					throw new Error(
						`For custom ids you can only put an array or a string, recived(${typeof this
							.custom})`
					)
				}
			}
		} else {
			this.custom.forEach((element: string) => {
				if (element.length > 1) {
					throw new Error(
						`For custom ids array elements must be only one length string, recived(${element})`
					)
				}
			})
		
			// eslint-disable-next-line no-var
			var type = this.custom as string[]
		}
	

		const id: string[] = []

		for (let number = 0; number < this.length; number++) {
			// eslint-disable-next-line computed-property-spacing
			const once = type[Math.floor(Math.random() * type.length)]
			id.push(once as string)
		}

		return id.join('')
	}
}

export interface GeneratorOptions {
	type: 'only_letters' | 'only_numbers' | 'default'
}
