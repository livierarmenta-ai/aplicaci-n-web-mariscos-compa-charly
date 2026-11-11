import logoCharly from '../assets/logo-charly.png'

const heroImage =
	'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1800&q=90'

function Inicio({ onOpenMenu }) {
	return (
		<section className="home-page">
			<div className="home-hero">
				<img
					className="home-hero__image"
					src={heroImage}
					alt="Platillo de mariscos"
					fetchPriority="high"
				/>
				<div className="home-hero__wash" aria-hidden="true" />
				<div className="home-hero__content">
					<div className="home-hero__brand">
						<img
							className="home-hero__logo"
							src={logoCharly}
							alt="Logo de Mariscos de tu Compa El Charly"
						/>
						<span>Mariscos de tu Compa · El Charly</span>
					</div>
					<p className="home-hero__eyebrow">Aguachiles y ceviches</p>
					<h1>Del mar a tu mesa,<br />al mero estilo <span>sinaloense</span></h1>
					<p className="home-hero__copy">
						Explora el menú y encuentra tu próximo antojo de mariscos.
					</p>
					<button className="button home-hero__cta" type="button" onClick={onOpenMenu}>
						Ver menú
						<span aria-hidden="true">→</span>
					</button>
				</div>
			</div>
			<section className="home-specialties" aria-label="Especialidades del menú">
				<div className="home-specialties__intro">
					<p className="eyebrow">Sabor de Sinaloa</p>
					<h2>¿Qué se te antoja?</h2>
				</div>
				<div className="home-specialties__list">
					<span>Aguachiles</span>
					<span>Ceviches</span>
					<span>Campechano</span>
				</div>
			</section>
		</section>
	)
}

export default Inicio
