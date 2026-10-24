// A tiny JSX runtime that renders to HTML strings (no React, no virtual DOM).
// Pages and components are .tsx files; tsconfig sets jsxFactory "h" and jsxFragmentFactory "Fragment".
// Text and attribute values are escaped. Use raw() for trusted HTML strings (e.g. icon()).

/** Already-safe HTML. Strings are escaped; Html is inserted as-is. */
export class Html {
  readonly value: string
  constructor(value: string) {
    this.value = value
  }
  toString(): string {
    return this.value
  }
}

export type Child = Html | string | number | boolean | null | undefined | Child[]

type Props = Record<string, unknown> & { children?: Child }
type Component<P = Props> = (props: P) => Html

const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])

function escape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Marks a trusted HTML string so it is not escaped. */
export function raw(html: string): Html {
  return new Html(html)
}

function renderChildren(children: Child): string {
  if (children === null || children === undefined || children === false || children === true) return ''
  if (Array.isArray(children)) return children.map(renderChildren).join('')
  if (children instanceof Html) return children.value
  return escape(String(children))
}

function renderAttributes(props: Props): string {
  let out = ''
  for (const [rawName, value] of Object.entries(props)) {
    if (rawName === 'children' || rawName === '__self' || rawName === '__source') continue
    if (value === null || value === undefined || value === false) continue
    const name = rawName === 'className' ? 'class' : rawName === 'htmlFor' ? 'for' : rawName
    out += value === true ? ` ${name}` : ` ${name}="${escape(String(value))}"`
  }
  return out
}

export function h(type: string | Component, props: Props | null, ...children: Child[]): Html {
  const allProps: Props = { ...props, children: children.length === 1 ? children[0] : children }
  if (typeof type === 'function') return type(allProps)
  const attributes = renderAttributes(allProps)
  if (voidElements.has(type)) return new Html(`<${type}${attributes} />`)
  return new Html(`<${type}${attributes}>${renderChildren(allProps.children)}</${type}>`)
}

export function Fragment({ children }: { children?: Child }): Html {
  return new Html(renderChildren(children))
}

declare global {
  namespace JSX {
    type Element = Html
    interface ElementChildrenAttribute {
      children: unknown
    }
    interface IntrinsicElements {
      [tag: string]: Record<string, unknown>
    }
  }
}
