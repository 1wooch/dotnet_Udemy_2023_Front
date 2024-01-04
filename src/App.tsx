const products = [
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

function App() {

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
    </div>
  )
}

export default App
