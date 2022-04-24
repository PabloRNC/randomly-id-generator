import { Generator } from './index'

const id = new Generator({
	type: 'only_letters',
	length: 20,
})

console.log(id.generate())
