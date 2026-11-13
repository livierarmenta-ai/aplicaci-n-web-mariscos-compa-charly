function ProductCard({ product, onAdd }) {
	const canAdd = product.price != null

	return (
		<article className={`product-card ${product.isExtra ? 'product-card--no-image' : ''}`}>
			{!product.isExtra && (
				<img className="product-card__image" src={product.image} alt={product.name} loading="lazy" />
			)}
			<div className="product-card__body">
				<p className="eyebrow">{product.detail}</p>
				<h2 className="product-card__title">{product.name}</h2>
				<p className="product-card__size">{product.size}</p>
				<div className="product-card__bottom">
					<strong className="product-card__price">
						{canAdd ? `$${product.price}` : 'Precio pendiente'}
					</strong>
					<button
						className="button button--small"
						type="button"
						onClick={() => onAdd(product)}
						disabled={!canAdd}
						title={canAdd ? `Agregar ${product.name}` : 'Falta definir el precio'}
					>
						Agregar
					</button>
				</div>
			</div>
		</article>
	)
}

export default ProductCard
