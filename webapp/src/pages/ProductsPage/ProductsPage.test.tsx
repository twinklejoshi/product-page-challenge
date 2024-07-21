import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductsPage from './ProductsPage';
import { getProductsData } from '../ApiHelper';
import { Product } from '../../components/interfaces';
import { MemoryRouter } from 'react-router-dom';

// Mock the getProductsData function
jest.mock('../ApiHelper', () => ({
  getProductsData: jest.fn(),
}));

describe('ProductsPage Component', () => {
  const mockProducts: Product[] = [
    { ProductID: 1, ProductName: 'Product 1', ProductPhotoURL: 'http://example.com/photo1.jpg', ProductStatus: 'Active' },
    { ProductID: 2, ProductName: 'Product 2', ProductPhotoURL: 'http://example.com/photo2.jpg', ProductStatus: 'Inactive' },
    { ProductID: 3, ProductName: 'Product 3', ProductPhotoURL: 'http://example.com/photo3.jpg', ProductStatus: 'Active' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading spinner initially', () => {
    (getProductsData as jest.Mock).mockResolvedValue({ productData: [], errorOccured: false });
    render(<MemoryRouter><ProductsPage /></MemoryRouter>);
    expect(screen.getByTestId('loading-spinner-container')).toBeInTheDocument();
  });

  test('displays product list when data is loaded', async () => {
    (getProductsData as jest.Mock).mockResolvedValue({ productData: mockProducts, errorOccured: false });
    render(<MemoryRouter><ProductsPage /></MemoryRouter>);
    await waitFor(() => expect(screen.queryByTestId('loading-spinner-container')).not.toBeInTheDocument());
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument(); // Product 2 is inactive
  });

  test('displays error message if there is an error fetching data', async () => {
    (getProductsData as jest.Mock).mockResolvedValue({ productData: [], errorOccured: true });
    render(<MemoryRouter><ProductsPage /></MemoryRouter>);
    await waitFor(() => expect(screen.queryByTestId('loading-spinner-container')).not.toBeInTheDocument());
    expect(screen.getByTestId('error-container')).toBeInTheDocument();
    expect(screen.getByText('An error occured fetching the data!')).toBeInTheDocument();
  });
});
