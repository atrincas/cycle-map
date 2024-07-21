import { RefObject } from 'react'

export function useScrollToTop(refElement: RefObject<HTMLElement>) {
  function scrollToTop() {
    refElement.current?.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  return { scrollToTop }
}
