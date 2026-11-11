import { useState } from 'react'
import logoCharly from '../assets/logo-charly.png'

function LoginVendedor({ onLogin, onBack }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	function handleSubmit(event) {
		event.preventDefault()
		if (username.trim() && password) onLogin(username.trim())
	}

	return (
		<section className="seller-login-page">
			<div className="seller-login-layout">
				<div className="seller-login__intro">
					<button className="seller-login__back" onClick={onBack} type="button">
						<span aria-hidden="true">←</span>
						<span>Regresar</span>
					</button>
					<img
						alt="Logo de Mariscos de tu Compa El Charly"
						className="seller-login__logo"
						src={logoCharly}
					/>
					<p className="seller-login__kicker">Panel de administración</p>
					<h1>Del mar a tu mesa,<br />al mero estilo sinaloense</h1>
					<p className="seller-login__intro-copy">
						Consulta pedidos y ventas de Mariscos de tu Compa El Charly desde un solo espacio.
					</p>
					<div className="seller-login__status">
						<span className="seller-login__status-dot" />
						<span>Acceso para vendedores</span>
					</div>
					<p className="seller-login__signature">Mariscos de tu Compa · El Charly</p>
				</div>
				<form className="seller-login" onSubmit={handleSubmit}>
					<div className="seller-login__heading">
						<p className="eyebrow">Bienvenido</p>
						<h2>Iniciar sesión</h2>
						<p>Ingresa tus datos para continuar al panel.</p>
					</div>
					<label className="field">
						<span>Usuario</span>
						<input
							autoComplete="username"
							onChange={(event) => setUsername(event.target.value)}
							placeholder="Tu usuario"
							required
							value={username}
						/>
					</label>
					<label className="field">
						<span>Contraseña</span>
						<input
							autoComplete="current-password"
							onChange={(event) => setPassword(event.target.value)}
							placeholder="Tu contraseña"
							required
							type="password"
							value={password}
						/>
					</label>
					<button className="button seller-login__submit" type="submit">Iniciar sesión</button>
					<p className="seller-login__notice">Acceso de demostración: no hay autenticación conectada.</p>
				</form>
			</div>
		</section>
	)
}

export default LoginVendedor
