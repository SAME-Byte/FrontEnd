import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function PublicLayout({ totalCarrito }) {
  return (
    <>
      <Header totalCarrito={totalCarrito} />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default PublicLayout