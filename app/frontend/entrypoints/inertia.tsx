import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import type { ComponentType } from 'react'

const el = document.getElementById('app')
const initialPage = el?.dataset.page ? JSON.parse(el.dataset.page) : undefined

createInertiaApp({
  page: initialPage, 
  
  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true }) as Record<
      string,
      { default: ComponentType<unknown> }
    >
    
    const pagePath = `../pages/${name}.tsx`
    const page = pages[pagePath]
    
    if (!page) {
      throw new Error(`Page not found: ${name}`)
    }
    
    return page.default
  },
  
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
})