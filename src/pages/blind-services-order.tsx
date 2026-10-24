// Placeholder: built from design/screens in step 6.
import { PlaceholderPage } from '../components/ui.js'
import { h, type Html } from '../jsx.js'

export function render(): Html {
  return <PlaceholderPage h1="Order Blind Services resources" crumbs={[{ label: 'Home', href: '/' }, { label: 'Blind Services', href: '/blind-services' }, { label: 'Order resources' }]} />
}
