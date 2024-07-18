import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
// underlying radix component is using ResizeObserver and scrollIntoView so it should be mocked:
global.ResizeObserver = class ResizeObserver {
  cb: any
  constructor(cb: any) {
    this.cb = cb
  }
  observe() {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }])
  }
  unobserve() {}
  disconnect() {}
} as any

global.window.HTMLElement.prototype.scrollIntoView = function () {}

afterEach(() => {
  cleanup()
})
