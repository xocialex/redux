import App from '../components/App';
import MainProducts from '../components/Products';
import SideCart from '../components/SideCart';


function Home() {
  return (
    <div className="App">
       
       <MainProducts />
       <SideCart />
    </div>
  );
}

export default Home;
