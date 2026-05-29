import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BuildingsGrid from "./components/BuildingsGrid";

function List() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="2"/>
            <main style={{ flexGrow: 1 }}>
                <BuildingsGrid/>
            </main>
            <Footer/>
        </div>
    );
}

export default List;