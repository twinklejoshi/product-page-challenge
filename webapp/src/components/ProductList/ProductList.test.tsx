import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductList from './ProductList';
import { ProductProps } from '../interfaces';

describe('ProductList Component', () => {
  test('renders without crashing with no items', () => {
    const props: ProductProps = { items: [] };
    render(<ProductList {...props} />);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  test('renders correctly with items', () => {
    const props: ProductProps = {
      items: [
        {
          ProductID: 1,
          ProductName: 'Product 1',
          ProductPhotoURL: 'http://example.com/photo1.jpg',
        },
        {
          ProductID: 2,
          ProductName: 'Product 2',
          ProductPhotoURL: 'http://example.com/photo2.jpg',
        },
      ],
    };
    render(<ProductList {...props} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('displays product images correctly', () => {
    const props: ProductProps = {
      items: [
        {
          ProductID: 1,
          ProductName: 'Product 1',
          ProductPhotoURL: 'http://example.com/photo1.jpg',
        },
        {
          ProductID: 2,
          ProductName: 'Product 2',
          ProductPhotoURL: 'http://example.com/photo2.jpg',
        },
      ],
    };
    render(<ProductList {...props} />);

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'http://example.com/photo1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Product 1');
    expect(images[1]).toHaveAttribute('src', 'http://example.com/photo2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Product 2');
  });

  test('displays product IDs and names correctly', () => {
    const props: ProductProps = {
      items: [
        {
          ProductID: 1,
          ProductName: 'Product 1',
          ProductPhotoURL: 'http://example.com/photo1.jpg',
        },
        {
          ProductID: 2,
          ProductName: 'Product 2',
          ProductPhotoURL: 'http://example.com/photo2.jpg',
        },
      ],
    };
    render(<ProductList {...props} />);

    expect(screen.getByText('sku-Id: 1')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('sku-Id: 2')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
