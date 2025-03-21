import { fetchProducts } from '@/api';

export default async function Home() {
    let products = [];

    try {
        products = await fetchProducts({});
        console.log('Fetched products:', products);
    } catch (error) {
        console.error('Error fetching products in Home:', error.message);
    }

    return (
        <main>
            <h1>Product List</h1>
            {products.length > 0 ? (
                products.map(product => <div key={product._id}>{product.title}</div>)
            ) : (
                <p>No products available.</p>
            )}
        </main>
    );
}
