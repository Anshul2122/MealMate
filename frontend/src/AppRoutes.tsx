import { Navigate, Route,Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackpage';
import UserProfilePage from "./pages/UserProfilepage"
import ProtectedRoute from './auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout showHero={true}><HomePage /></Layout>} />
      {/* if user is not logged-in, in that case we can't see the login profile page, which is done with the protect route, which have the outlet thing, which helps in do so */}
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
      </Route>
      <Route path='/auth-callback' element={ <AuthCallbackPage/>} />          
          <Route path="*" element = {<Navigate to="/" />}/>
    </Routes>
  )
}

export default AppRoutes;