import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState(
    [
      {
        name: 'Product 1',
        price:100.00
      },
      {
        name: 'Product 2',
        price:200.00
      },
      {
        name: 'Product 3',
        price:300.00
      }
    ]
  );

  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
    .then(response => response.json())
    .then(data=>setProducts(data))

  },[]) //dependency array = run only once
  

  function addProduct() {
    setProducts(prevState=>[...prevState,{name:'Product'+(prevState.length+1),price:(prevState.length+1)*100.00}]);
  }

  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - ${product.price}
          </li>
        ))}        
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App
