import { BrowserRouter, Routes, Route } from "react-router-dom";
import Itens from "./pages/itens";
import App from "./App";

export default function RoutesApp(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/opcoes" element={<Itens/>}></Route>
            </Routes> 
        </BrowserRouter>
    )
}