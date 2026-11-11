import logo from '../assets/mariscos/logo.png'

const links = [
	{ label: 'Inicio', page: 'inicio' },
	{ label: 'Menú', page: 'menu' },
	{ label: 'Mi pedido', page: 'pedido' },
	{ label: 'Vendedor', page: 'login' },
]

function Navbar({ currentPage, cartCount, onNavigate }) {
	return (
		<header className="site-header">
			<button
				className="brand-mark"
				type="button"
				onClick={() => onNavigate('inicio')}
				aria-label="Ir al inicio"
			>
				<img
					className="brand-mark__logo"
					src={logo}
					alt="Mariscos de tu Compa El Charly"
				/>
			</button>

			<nav className="site-nav" aria-label="Navegación principal">
				{links.map((link) => (
					<button
						className={`site-nav__link ${currentPage === link.page ? 'is-active' : ''}`}
						key={link.page}
						type="button"
						onClick={() => onNavigate(link.page)}
						aria-current={currentPage === link.page ? 'page' : undefined}
					>
						{link.label}
						{link.page === 'pedido' && cartCount > 0 && (
							<span className="site-nav__count">{cartCount}</span>
						)}
					</button>
				))}
			</nav>
		</header>
	)
}

export default Navbar
