import heroImage from '../assets/mariscos-banner.png'

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
					<p className="home-hero__eyebrow">Charly está para servirte</p>
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
		</section>
	)
}

export default Inicio
