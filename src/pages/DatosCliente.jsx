import { useState } from 'react'

function DatosCliente({ initialValues, onContinue }) {
	const [values, setValues] = useState(initialValues)

	function handleChange(event) {
		const { name, value } = event.target
		setValues((currentValues) => ({ ...currentValues, [name]: value }))
	}

	function handleSubmit(event) {
		event.preventDefault()
		onContinue(values)
	}

	return (
		<section className="content-page narrow-page">
			<div className="page-heading page-heading--center">
				<div>
					<p className="eyebrow">Un paso más</p>
					<h1>Datos del cliente</h1>
				</div>
			</div>
			<form className="form-panel customer-form" onSubmit={handleSubmit}>
				<label className="field">
					<span>Nombre:</span>
					<input
						autoComplete="name"
						name="name"
						onChange={handleChange}
						required
						value={values.name}
					/>
				</label>
				<label className="field">
					<span>Teléfono:</span>
					<input
						autoComplete="tel"
						inputMode="tel"
						name="phone"
						onChange={handleChange}
						pattern="[0-9]{10}"
						required
						value={values.phone}
					/>
				</label>
				<label className="field">
					<span>Dirección:</span>
					<input
						autoComplete="street-address"
						name="address"
						onChange={handleChange}
						required
						value={values.address}
					/>
				</label>
				<label className="field">
					<span>¿Con cuánto va a pagar? (opcional):</span>
					<input
						inputMode="decimal"
						min="0"
						name="paymentAmount"
						onChange={handleChange}
						step="0.01"
						type="number"
						value={values.paymentAmount ?? ''}
					/>
				</label>
				<div className="page-actions page-actions--center">
					<button className="button" type="submit">Continuar</button>
				</div>
			</form>
		</section>
	)
}

export default DatosCliente
