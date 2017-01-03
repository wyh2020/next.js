/* global describe, it, expect */

import { join } from 'path'
import resolve from '../../server/resolve'

const dataPath = join(__dirname, '_resolvedata')

describe('Resolve', () => {
  it('should resolve a .js path', async () => {
    const p = await resolve(join(dataPath, 'one.js'))
    expect(p).toBe(join(dataPath, 'one.js'))
  })

  it('should resolve a .json path', async () => {
    const p = await resolve(join(dataPath, 'two.json'))
    expect(p).toBe(join(dataPath, 'two.json'))
  })

  it('should resolve a module without an extension', async () => {
    const p = await resolve(join(dataPath, 'one'))
    expect(p).toBe(join(dataPath, 'one.js'))
  })

  it('should resolve a .js module in a directory', async () => {
    const p = await resolve(join(dataPath, 'aa'))
    expect(p).toBe(join(dataPath, 'aa', 'index.js'))
  })

  it('should resolve a .json module in a directory', async () => {
    const p = await resolve(join(dataPath, 'bb'))
    expect(p).toBe(join(dataPath, 'bb', 'index.json'))
  })

  it('should resolve give priority to index.js over index.json', async () => {
    const p = await resolve(join(dataPath, 'cc'))
    expect(p).toBe(join(dataPath, 'cc', 'index.js'))
  })
})
