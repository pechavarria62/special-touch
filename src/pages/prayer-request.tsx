// Placeholder: built from design/screens in step 11.
import { PlaceholderPage } from '../components/ui.js'
import { h, type Html } from '../jsx.js'

export function render(): Html {
  return <PlaceholderPage h1="Send us a prayer request" crumbs={[{ label: 'Home', href: '/' }, { label: 'Prayer request' }]} />
}
