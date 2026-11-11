function MiPedido({ items, total, onQuantityChange, onContinue }) {
	return (
		<section className="content-page narrow-page">
			<div className="page-heading page-heading--center">
				<div>
					<p className="eyebrow">Revisa tu selección</p>
					<h1>Mi pedido</h1>
				</div>
			</div>

			<div className="order-panel">
				{items.length === 0 ? (
					<div className="empty-state">
						<span className="empty-state__mark" aria-hidden="true">+</span>
						<p>Tu pedido está vacío</p>
					</div>
				) : (
					<div className="order-lines">
						{items.map(({ product, quantity }) => (
							<article className="order-line" key={product.id}>
								<img src={product.image} alt="" className="order-line__image" />
								<div className="order-line__details">
									<h2>{product.name}</h2>
									<p>{product.size}</p>
									<div className="quantity-control" aria-label={`Cantidad de ${product.name}`}>
										<button
											type="button"
											onClick={() => onQuantityChange(product.id, -1)}
											aria-label={`Quitar una unidad de ${product.name}`}
										>
											−
										</button>
										<span>{quantity}</span>
										<button
											type="button"
											onClick={() => onQuantityChange(product.id, 1)}
											aria-label={`Agregar una unidad de ${product.name}`}
										>
											+
										</button>
									</div>
								</div>
								<strong className="order-line__price">${product.price * quantity}</strong>
							</article>
						))}
					</div>
				)}

				<div className="order-total">
					<span>Total</span>
					<strong>${total}</strong>
				</div>
				<div className="page-actions page-actions--center">
					<button className="button" type="button" onClick={onContinue} disabled={!items.length}>
						Continuar
					</button>
				</div>
			</div>
		</section>
	)
}

export default MiPedido
