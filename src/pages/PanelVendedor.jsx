import { useMemo, useState } from 'react'
import logoCharly from '../assets/logo-charly.png'

const sections = ['Resumen', 'Productos', 'Pedidos', 'Ventas']

function PanelVendedor({ products, orders, onLogout }) {
	const [section, setSection] = useState('Resumen')
	const salesTotal = orders.reduce((total, order) => total + order.total, 0)
	const averageTicket = orders.length ? salesTotal / orders.length : 0
	const activeProducts = products.filter((product) => product.price != null).length
	const formatCurrency = (value) =>
		new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			maximumFractionDigits: 0,
		}).format(value)
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
				<div className="seller-header__logo" aria-label="Mariscos de tu Compa El Charly">
					<img
						alt="Logo de Mariscos de tu Compa El Charly"
						className="seller-header__logo-image"
						src={logoCharly}
					/>
				</div>
				<div className="seller-header__meta">
					<span className="seller-header__tag">Vendedor</span>
				</div>
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
								<span className="seller-pill">{orders.length} pedidos</span>
							</div>
							<div className="stat-grid">
								<article className="stat-card stat-card--primary">
									<span>Ventas</span>
									<strong>{formatCurrency(salesTotal)}</strong>
									<small>+{orders.length || 0} este turno</small>
								</article>
								<article className="stat-card">
									<span>Pedidos</span>
									<strong>{orders.length}</strong>
									<small>Registrados</small>
								</article>
								<article className="stat-card">
									<span>Ticket promedio</span>
									<strong>{formatCurrency(averageTicket)}</strong>
									<small>Por orden</small>
								</article>
								<article className="stat-card">
									<span>Productos</span>
									<strong>{activeProducts}</strong>
									<small>Disponibles</small>
								</article>
							</div>
							<div className="summary-columns">
								<section className="summary-card">
									<div className="summary-card__header">
										<h2>Producto más vendido</h2>
										<span className="summary-card__badge">TOP</span>
									</div>
									<div className="summary-card__product">
										<strong>{itemsSold[0]?.[0] || '—'}</strong>
										<small>{itemsSold[0]?.[1] || 0} unidades vendidas</small>
									</div>
								</section>
								<section className="summary-card">
									<h2>Pedidos recientes</h2>
									<div className="recent-order-list">
										{orders.length ? (
											orders.slice(0, 3).map((order) => (
												<div className="recent-order" key={order.id}>
													<span>{order.customer.name || order.id}</span>
													<strong>{formatCurrency(order.total)}</strong>
												</div>
											))
										) : (
											<p>—</p>
										)}
									</div>
								</section>
							</div>
						</>
					)}

					{section === 'Productos' && (
						<>
							<div className="page-heading seller-content__heading">
								<div><p className="eyebrow">Catálogo</p><h1>Productos</h1></div>
								<span className="seller-pill">{products.length} opciones</span>
							</div>
							<div className="seller-list seller-list--catalog">
								{products.map((product) => (
									<div className="seller-list__row seller-list__row--catalog" key={product.id}>
										<div className="seller-list__info">
											<span className="seller-list__name">{product.name}</span>
											<small>{product.size}</small>
										</div>
										<strong>{product.price == null ? 'Precio pendiente' : formatCurrency(product.price)}</strong>
									</div>
								))}
							</div>
						</>
					)}

					{section === 'Pedidos' && (
						<>
							<div className="page-heading seller-content__heading">
								<div><p className="eyebrow">Registro local de esta sesión</p><h1>Pedidos</h1></div>
								<span className="seller-pill">{orders.length} totales</span>
							</div>
							{orders.length ? (
								<div className="seller-list seller-list--orders">
									{orders.map((order) => (
										<article className="seller-list__row seller-list__row--order" key={order.id}>
											<div className="seller-list__customer">
												<span className="seller-list__avatar">
													{(order.customer.name || order.id).slice(0, 1).toUpperCase()}
												</span>
												<div>
													<strong>{order.customer.name || order.id}</strong>
													<small>{order.createdAt}</small>
												</div>
											</div>
											<div className="seller-list__amount">
												<span>#{order.id}</span>
												<strong>{formatCurrency(order.total)}</strong>
											</div>
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
								<span className="seller-pill">{orders.length} en total</span>
							</div>
							<div className="sales-panel">
								<div className="sales-total">
									<span>Ventas registradas</span>
									<strong>{formatCurrency(salesTotal)}</strong>
								</div>
								<div className="sales-card">
									<div>
										<span>Pedidos</span>
										<strong>{orders.length}</strong>
									</div>
									<div>
										<span>Ticket promedio</span>
										<strong>{formatCurrency(averageTicket)}</strong>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	)
}

export default PanelVendedor
