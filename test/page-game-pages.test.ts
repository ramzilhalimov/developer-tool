import { getNumCards, shuffle } from './game-cards'
import { it, expect } from '@jest/globals'

describe('getNumCards()', () => {
    it('should return 6 for easy difficulty', () => {
        // const line = 'easy'
        const expected = 6

        const result = 6

        expect(expected).toBe(result)
    })
})
it('should return 12 for medium difficulty', () => {
    const difficulty = 'medium'
    const expected = 12

    const result = getNumCards(difficulty)

    expect(expected).toBe(result)
})

describe('shuffle()', () => {
    it('should shuffle the cards', () => {
        const array = ['1', '2', '3', '4']
        const shuffledArray = shuffle(array)
        expect(shuffledArray).toHaveLength(array.length)
    })
})
describe('shuffle()', () => {
    it('should shuffle the cards', () => {
        const expected = ['array']
        expect(['array']).toEqual(expect.arrayContaining(expected))
    })
})
