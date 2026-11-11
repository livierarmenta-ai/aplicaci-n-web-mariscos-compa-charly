import { useState } from 'react'

function LoginVendedor({ onLogin }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	function handleSubmit(event) {
		event.preventDefault()
		if (username.trim() && password) onLogin(username.trim())
	}

	return (
		<section className="seller-login-page">
			<form className="seller-login" onSubmit={handleSubmit}>
				<div className="seller-login__heading">
					<p className="eyebrow">Mariscos de tu Compa El Charly</p>
					<h1>Inicio de sesión</h1>
				</div>
				<div className="seller-login__brand" aria-label="Mariscos de tu Compa El Charly">
					<span className="seller-login__brand-name">Mariscos de tu Compa</span>
					<strong>El Charly</strong>
				</div>
				<label className="field">
					<span>Usuario:</span>
					<input
						autoComplete="username"
						onChange={(event) => setUsername(event.target.value)}
						required
						value={username}
					/>
				</label>
				<label className="field">
					<span>Contraseña:</span>
					<input
						autoComplete="current-password"
						onChange={(event) => setPassword(event.target.value)}
						required
						type="password"
						value={password}
					/>
				</label>
				<button className="button seller-login__submit" type="submit">Iniciar sesión</button>
				<p className="seller-login__notice">Acceso de demostración: no hay autenticación conectada.</p>
			</form>
		</section>
	)
}

export default LoginVendedor
