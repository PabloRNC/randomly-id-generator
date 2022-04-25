export class Generator {
	public type: GeneratorTypes | undefined
	public length: number
	public custom: string | string
	constructor(options?: GeneratorOptions)
	public generate(): string
}

export type GeneratorTypes = 'ONLY_LETTERS' | 'ONLY_NUMBERS' | 'DEFAULT'
export interface GeneratorOptions {
	type?: GeneratorTypes
	length?: number
	custom?: string | string[]
}
