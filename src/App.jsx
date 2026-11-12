import { useEffect, useMemo, useState } from 'react'
import Confirmacion from './pages/Confirmacion.jsx'
import DatosCliente from './pages/DatosCliente.jsx'
import Inicio from './pages/Inicio.jsx'
import LoginVendedor from './pages/LoginVendedor.jsx'
import Menu from './pages/Menu.jsx'
import MiPedido from './pages/MiPedido.jsx'
import PanelVendedor from './pages/PanelVendedor.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import './App.css'

const foodImage =
  'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1200&q=85'

const products = [
  {
    id: 'aguachile-rojo',
    name: 'Aguachile rojo',
    detail: 'Aguachile',
    size: 'Por charola',
    price: 170,
    image: foodImage,
  },
  {
    id: 'aguachile-verde',
    name: 'Aguachile verde',
    detail: 'Aguachile',
    size: 'Por charola',
    price: 175,
    image: foodImage,
  },
  {
    id: 'aguachile-negro',
    name: 'Aguachile negro',
    detail: 'Aguachile',
    size: 'Por charola',
    price: 180,
    image: foodImage,
  },
  {
    id: 'aguachile-a-la-diabla',
    name: 'Aguachile a la diabla',
    detail: 'Aguachile',
    size: 'Por charola',
    price: 185,
    image: foodImage,
  },
  {
    id: 'ceviche-pescado-1l',
    name: 'Ceviche de pescado',
    detail: 'Ceviche',
    size: '1 L',
    price: 120,
    image: foodImage,
  },
  {
    id: 'ceviche-camaron-1l',
    name: 'Ceviche de camarón',
    detail: 'Ceviche',
    size: '1 L',
    price: 140,
    image: foodImage,
  },
  {
    id: 'ceviche-campechano-1l',
    name: 'Ceviche campechano',
    detail: 'Ceviche',
    size: '1 L',
    price: 160,
    image: foodImage,
  },
  {
    id: 'ceviche-pescado-medio',
    name: 'Ceviche de pescado',
    detail: 'Ceviche',
    size: '1/2 L',
    price: 80,
    image: foodImage,
  },
  {
    id: 'ceviche-camaron-medio',
    name: 'Ceviche de camarón',
    detail: 'Ceviche',
    size: '1/2 L',
    price: 85,
    image: foodImage,
  },
  {
    id: 'ceviche-campechano-medio',
    name: 'Ceviche campechano',
    detail: 'Ceviche',
    size: '1/2 L',
    price: 90,
    image: foodImage,
  },
]

function App() {
  const [page, setPage] = useState('inicio')
  const [cart, setCart] = useState([])
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [orders, setOrders] = useState(() => {
    const savedOrders = window.localStorage.getItem('mariscos-charly-orders')
    return savedOrders ? JSON.parse(savedOrders) : []
  })
  const [registeredOrder, setRegisteredOrder] = useState(null)

  useEffect(() => {
    window.localStorage.setItem('mariscos-charly-orders', JSON.stringify(orders))
  }, [orders])

  const cartItems = useMemo(
    () =>
      cart
        .map((line) => ({
          ...line,
          product: products.find((product) => product.id === line.productId),
        }))
        .filter((line) => line.product),
    [cart],
  )
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0)
  const cartTotal = cartItems.reduce(
    (total, line) => total + (line.product.price || 0) * line.quantity,
    0,
  )

  function addToCart(product) {
    if (product.price == null) return
    setRegisteredOrder(null)
    setCart((currentCart) => {
      const existingLine = currentCart.find((line) => line.productId === product.id)
      if (existingLine) {
        return currentCart.map((line) =>
          line.productId === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        )
      }
      return [...currentCart, { productId: product.id, quantity: 1 }]
    })
  }

  function changeQuantity(productId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((line) =>
          line.productId === productId
            ? { ...line, quantity: line.quantity + amount }
            : line,
        )
        .filter((line) => line.quantity > 0),
    )
    setRegisteredOrder(null)
  }

  function continueToCustomer(formData) {
    setCustomer(formData)
    setRegisteredOrder(null)
    setPage('confirmacion')
  }

  function registerOrder() {
    if (registeredOrder || !cartItems.length) return

    const order = {
      id: `CH-${Date.now().toString().slice(-6)}`,
      items: cartItems.map((line) => ({ ...line, product: { ...line.product } })),
      customer: { ...customer },
      total: cartTotal,
      createdAt: new Date().toLocaleString('es-MX', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    }
    setOrders((currentOrders) => [order, ...currentOrders])
    setRegisteredOrder(order)
  }

  function handleSellerLogin() {
    setPage('panel')
  }

  const orderForConfirmation = registeredOrder || {
    items: cartItems,
    customer,
    total: cartTotal,
  }

  return (
    <div className="app-shell">
      {page !== 'login' && page !== 'panel' && (
        <Navbar currentPage={page} cartCount={cartCount} onNavigate={setPage} />
      )}

      <main className="app-main">
        {page === 'inicio' && <Inicio onOpenMenu={() => setPage('menu')} />}
        {page === 'menu' && (
          <Menu products={products} onAdd={addToCart} cartCount={cartCount} />
        )}
        {page === 'pedido' && (
          <MiPedido
            items={cartItems}
            total={cartTotal}
            onQuantityChange={changeQuantity}
            onContinue={() => setPage('datos')}
          />
        )}
        {page === 'datos' && (
          <DatosCliente
            initialValues={customer}
            onContinue={continueToCustomer}
          />
        )}
        {page === 'confirmacion' && (
          <Confirmacion
            order={orderForConfirmation}
            registered={Boolean(registeredOrder)}
            onRegister={registerOrder}
            onBack={() => setPage('datos')}
          />
        )}
        {page === 'login' && (
          <LoginVendedor
            onLogin={handleSellerLogin}
            onBack={() => setPage('inicio')}
          />
        )}
        {page === 'panel' && (
          <PanelVendedor
            products={products}
            orders={orders}
            onLogout={() => {
              setPage('inicio')
            }}
          />
        )}
      </main>

      {page === 'inicio' && <Footer />}
    </div>
  )
}

export default App
