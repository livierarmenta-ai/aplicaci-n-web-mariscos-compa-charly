import ProductCard from '../components/ProductCard.jsx'

function Menu({ products, onAdd, cartCount }) {
	return (
		<section className="content-page menu-page">
			<div className="page-heading">
				<div>
					<p className="eyebrow">Mariscos de tu Compa El Charly</p>
					<h1>Menú de productos</h1>
				</div>
				{cartCount > 0 && <span className="page-heading__note">{cartCount} en tu pedido</span>}
			</div>
			<div className="product-grid">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} onAdd={onAdd} />
				))}
			</div>
		</section>
	)
}

export default Menu
