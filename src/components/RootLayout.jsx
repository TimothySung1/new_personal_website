import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='pb-20 relative'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout;