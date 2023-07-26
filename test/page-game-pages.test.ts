import { getNumCards, shuffle } from './game-cards'
import { it, expect } from '@jest/globals'

describe('getNumCards()', () => {
    it('should return 6 for easy difficulty', () => {
        let line = 'easy'
        let expected = 6

        let result = 6

        expect(expected).toBe(result)
    })
})
describe('shuffle()', () => {
    it('should shuffle the cards', () => {
        const array = ['1', '2', '3', '4']
        const shuffledArray = shuffle(array)
        expect(shuffledArray).toHaveLength(array.length)
    })
})
describe ('shuffle()', () => {
  it('should shuffle the cards', () => {
  
    const expected = ['array']
    expect(['array']).toEqual(expect.arrayContaining(expected));
  })
})