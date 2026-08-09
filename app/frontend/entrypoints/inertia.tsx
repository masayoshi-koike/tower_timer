import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'

const el = document.getElementById('app')
const initialPage = el?.dataset.page ? JSON.parse(el.dataset.page) : undefined

createInertiaApp({
  page: initialPage, 
  
  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    return pages[`../pages/${name}.tsx`] as any 
  },
  
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
})