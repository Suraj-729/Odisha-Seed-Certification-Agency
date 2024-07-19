import React from 'react';
//import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Layout from './components/layout/Layout';
import InputVerify from './components/pages/InputVerify';
import ChatBot from './components/support/ChatBot';
import Posts from './components/pages/Posts';
import GrowergCertification from './components/pages/GrowergCertification';
import StorageObje from './components/storage/StorageMini';
import Footer from './components/layout/Footer';
import Header from './components/layout/header';
//import ConfirmationComponent from './components/pages/ConfirmationComponen';

function App() {
    //const [formData, setFormData] = useState(null);
    return (
        <Router>
            <div className="App">
                <Header />
                
                <main>
                    
                    <Routes>
                        <Route path="/inputVerify" element={<InputVerify />} />
                        <Route path="/chatbot" element={<ChatBot />} />
                        <Route path='/posts' element={<Posts />} />
                        <Route path='/GrowergCertification' element={<GrowergCertification  />}/>
                        <Route path='/storage' element={<StorageObje/>}/>
                       
                        {/* <Route path="/confirmation" element={<ConfirmationComponent formData={formData} />} /> */}
                        {/* Add other routes as needed */}
                    </Routes>
                </main>
                <ChatBot />

                <Footer/>
                
            </div>
        </Router>
    );
}

export default App;



