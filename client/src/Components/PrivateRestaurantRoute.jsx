import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

// This is your protected route component
function ProtectedRoute({ children }) {
  const { currentRestaurantUser } = useSelector((state) => state.user);
  return currentRestaurantUser ? children : <Navigate to='/Restaurantsignin' />;
}

// This is how you use the ProtectedRoute component
export default function PrivateRestaurantRoute() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}
