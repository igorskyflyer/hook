// Author: Igor Dimitrijević (@igorskyflyer)

import { assert, beforeEach, describe, test } from 'vitest'
import { hook } from '../src/index.mjs'

const native: any = Array.prototype.unshift

describe('🧪 Hook tests 🧪', () => {
  beforeEach(() => {
    Array.prototype.unshift = native
  })

  test('#1 should have a length of 1', () => {
    hook(Array.prototype, 'unshift', function () {})

    const array: number[] = []

    array.unshift(128)

    assert.lengthOf(array, 1)
  }) // #1

  test('#2 should return 64', () => {
    hook(
      Array.prototype,
      'unshift',
      function () {
        this.push(64)
      },
      true
    )

    const array: number[] = []

    array.unshift(128)

    assert.strictEqual(array[0], 64)
  }) // #2

  test('#3 should have a length of 2', () => {
    hook(Array.prototype, 'unshift', function () {
      this.push(64)
    })

    const array: number[] = []

    array.unshift(128)

    assert.lengthOf(array, 2)
  }) // #3

  test('#4 should equal 56', () => {
    hook(Array.prototype, 'unshift', function () {
      this.push(56)
    })

    const array: number[] = []

    array.unshift(128)

    assert.strictEqual(array[1], 56)
  }) // #4

  test('#5 should equal x * 2', () => {
    hook(Array.prototype, 'unshift', function (x) {
      this.push(x * 2)
    })

    const array: number[] = []

    array.unshift(128)

    assert.strictEqual(array[1], 256)
  }) // #5
})
