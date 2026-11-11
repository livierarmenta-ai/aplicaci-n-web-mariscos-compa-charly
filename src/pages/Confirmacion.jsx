function Confirmacion({ order, registered, onRegister, onBack }) {
	return (
		<section className="content-page narrow-page">
			<div className="page-heading page-heading--center">
				<div>
					<p className="eyebrow">Revisa antes de registrar</p>
					<h1>Confirmación del pedido</h1>
				</div>
			</div>

			<div className="confirmation-panel">
				<section className="confirmation-section">
					<h2>Productos:</h2>
					{order.items.map(({ product, quantity }) => (
						<div className="confirmation-product" key={product.id}>
							<span>{product.name} x{quantity}</span>
							<strong>${product.price * quantity}</strong>
						</div>
					))}
				</section>

				<section className="confirmation-section customer-summary">
					<h2>Datos del cliente</h2>
					<p><span>Nombre:</span> {order.customer.name || '—'}</p>
					<p><span>Teléfono:</span> {order.customer.phone || '—'}</p>
					<p><span>Dirección:</span> {order.customer.address || '—'}</p>
				</section>

				<div className="order-total order-total--large">
					<span>Total</span>
					<strong>${order.total}</strong>
				</div>

				{registered && (
					<p className="form-success" role="status">Pedido registrado correctamente.</p>
				)}
				<div className="page-actions page-actions--split">
					<button className="button" type="button" onClick={onRegister} disabled={registered || !order.items.length}>
						{registered ? 'Pedido registrado' : 'Registrar pedido'}
					</button>
					<button className="button button--secondary" type="button" onClick={onBack}>
						Regresar
					</button>
				</div>
			</div>
		</section>
	)
}

export default Confirmacion
