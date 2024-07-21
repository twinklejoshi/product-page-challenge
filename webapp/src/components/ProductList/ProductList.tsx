import { ProductProps } from '../interfaces';

const ProductList = (props: ProductProps) => {
    return (
        <div className="bg-black">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {props.items.map((product) => (
              <div key={product.ProductID} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={product.ProductName}
                    src={product.ProductPhotoURL}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm" style={{color: 'white', fontWeight: 700}}>sku-Id: {product.ProductID}</h3>
                <p className="mt-1 text-lg font-medium" style={{color: 'white', fontWeight: 900}}>{product.ProductName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ProductList;