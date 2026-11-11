import mariscosImage from '../assets/mariscos/mariscos.jpg'

const localImages = import.meta.glob('../assets/mariscos/*.{jpg,jpeg,png,webp}', {
	eager: true,
	import: 'default',
	query: '?url',
})

const heroImage = localImages['../assets/mariscos/inicio.jpg'] || mariscosImage

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
			</div>
			<div className="home-action">
				<button className="button" type="button" onClick={onOpenMenu}>
					Ver menú
				</button>
			</div>
			<section className="business-intro" aria-label="Información breve del negocio">
				<h1>Aguachiles y ceviches</h1>
				<p>Mariscos de tu Compa El Charly</p>
			</section>
		</section>
	)
}

export default Inicio
