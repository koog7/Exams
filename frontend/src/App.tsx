import './App.css'
import Navbar from './components/Navbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home.tsx';
import Login from './containers/Auth/Login.tsx';
import Registration from './containers/Auth/Registration.tsx';
import PhotoForm from './containers/PhotoForm.tsx';
import UserProfile from './containers/UserProfile.tsx';

const App = () => {

    return (
        <>
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={(
                            <Home />
                        )} />
                        <Route path="/photo/:id" element={(
                            <Home />
                        )} />
                        <Route path="/photo/user/:id" element={(
                            <UserProfile />
                        )} />
                        <Route path="/user/:id" element={(
                            <UserProfile />
                        )} />
                        <Route path="/login" element={(
                            <Login />
                        )} />
                        <Route path="/registration" element={(
                            <Registration />
                        )} />
                        <Route path="/formCreate" element={(
                            <PhotoForm />
                        )} />
                    </Routes>
                </div>
            </div>
        </>
    )
};

export default App
