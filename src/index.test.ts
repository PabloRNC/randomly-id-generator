import { Generator } from './index'

const id = new Generator({
	type: 'ONLY_LETTERS',
	length: 20,
})

console.log(id.generate())
