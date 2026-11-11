import { useMemo, useState } from 'react'

const sections = ['Resumen', 'Productos', 'Pedidos', 'Ventas']

function PanelVendedor({ sellerName, products, orders, onLogout }) {
	const [section, setSection] = useState('Resumen')
	const salesTotal = orders.reduce((total, order) => total + order.total, 0)
	const itemsSold = useMemo(() => {
		const counts = new Map()
		orders.forEach((order) => {
			order.items.forEach(({ product, quantity }) => {
				counts.set(product.name, (counts.get(product.name) || 0) + quantity)
			})
		})
		return [...counts.entries()].sort((first, second) => second[1] - first[1])
	}, [orders])

	return (
		<section className="seller-panel">
			<header className="seller-header">
				<div className="seller-header__brand">
					<span>Mariscos de tu Compa</span>
					<strong>El Charly</strong>
				</div>
				<span className="seller-header__user">{sellerName}</span>
				<button className="button button--text" type="button" onClick={onLogout}>Salir</button>
			</header>

			<div className="seller-workspace">
				<nav className="seller-nav" aria-label="Administración del vendedor">
					{sections.map((item) => (
						<button
							className={`seller-nav__item ${section === item ? 'is-active' : ''}`}
							key={item}
							onClick={() => setSection(item)}
							type="button"
						>
							{item}
						</button>
					))}
				</nav>

				<div className="seller-content">
					{section === 'Resumen' && (
						<>
							<div className="page-heading seller-content__heading">
								<div>
									<p className="eyebrow">Panel del propietario/vendedor</p>
									<h1>Resumen del día</h1>
								</div>
							</div>
							<div className="metric-grid">
								<article className="metric-card">
									<span>Ventas</span>
									<strong>${salesTotal}</strong>
								</article>
								<article className="metric-card">
									<span>Pedidos</span>
									<strong>{orders.length}</strong>
								</article>
							</div>
							<div className="summary-columns">
								<section className="summary-block">
									<h2>Producto más vendido:</h2>
									<p>{itemsSold[0]?.[0] || '—'}</p>
								</section>
								<section className="summary-block">
									<h2>Pedidos recientes</h2>
									{orders.length ? (
										orders.slice(0, 3).map((order) => (
											<p className="recent-order" key={order.id}>
												<span>{order.customer.name || order.id}</span>
												<strong>${order.total}</strong>
											</p>
										))
									) : (
										<p>—</p>
									)}
								</section>
							</div>
						</>
					)}

					{section === 'Productos' && (
						<>
							<div className="page-heading seller-content__heading">
								<div><p className="eyebrow">Catálogo</p><h1>Productos</h1></div>
							</div>
							<div className="seller-list">
								{products.map((product) => (
									<div className="seller-list__row" key={product.id}>
										<span>{product.name} <small>{product.size}</small></span>
										<strong>{product.price == null ? 'Precio pendiente' : `$${product.price}`}</strong>
									</div>
								))}
							</div>
						</>
					)}

					{section === 'Pedidos' && (
						<>
							<div className="page-heading seller-content__heading">
								<div><p className="eyebrow">Registro local de esta sesión</p><h1>Pedidos</h1></div>
							</div>
							{orders.length ? (
								<div className="seller-list">
									{orders.map((order) => (
										<article className="seller-list__row seller-list__row--order" key={order.id}>
											<span><strong>{order.customer.name}</strong><small>{order.createdAt}</small></span>
											<strong>${order.total}</strong>
										</article>
									))}
								</div>
							) : <p className="seller-empty">Aún no hay pedidos registrados.</p>}
						</>
					)}

					{section === 'Ventas' && (
						<>
							<div className="page-heading seller-content__heading">
								<div><p className="eyebrow">Acumulado de pedidos registrados</p><h1>Ventas</h1></div>
							</div>
							<div className="sales-total">
								<span>Ventas registradas</span>
								<strong>${salesTotal}</strong>
							</div>
							<p className="seller-empty">{orders.length} pedidos en esta sesión</p>
						</>
					)}
				</div>
			</div>
		</section>
	)
}

export default PanelVendedor
