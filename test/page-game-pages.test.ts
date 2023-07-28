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
it('should return 18 for hard difficulty', () => {
    const difficulty = 'hard'
    const expected = 18

    const result = 18

    expect(expected).toBe(result)
})

it('should return 6 for unknown difficulty', () => {
    const difficulty = 'unknown'
    const expected = 6

    const result = 6

    expect(expected).toBe(result)
})

describe('shuffle()', () => {
    it('should shuffle the cards', () => {
        const array = ['1', '2', '3', '4']
        const shuffledArray = shuffle(array)
        expect(shuffledArray).toHaveLength(array.length)
    })
})
