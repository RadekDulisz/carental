import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders key homepage content', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/book your next car in under 60 seconds/i)).toBeTruthy();
  expect(screen.getByText(/complete reservation/i)).toBeTruthy();
});
