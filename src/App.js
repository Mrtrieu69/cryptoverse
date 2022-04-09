import { Routes, Route, Link } from "react-router-dom"
import { Layout, Typography, Space } from "antd"

import { Navbar, Homepage, Cryptocurrencies, CryptoDetails, News } from "./components"
import "./App.css"
import "antd/dist/antd.css"

function App() {
    return(
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
                            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                            <Route path="/news" element={<News />} />
                        </Routes>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
                        Cryptoverse <br />
                        @Copyright <a href="https://www.facebook.com/trieu.m.tam">MrTrieu69</a>
                    </Typography.Title>
                </div>
            </div>

        </div>
    )
}

export default App