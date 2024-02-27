import Header from "../components/Layout/Header/Header";
import Policy from "../components/Layout/Policy/Policy";
import Footer from "../components/Layout/Footer/Footer";
import Search_Modal from "../Modals/Search_Modal/Search_Modal";
import { useState } from "react";
import Dialog_Modal from "../Modals/Dialog_Modal/Dialog_Modal";

// eslint-disable-next-line react/prop-types
const Main_Layout = ({ children }) => {
    // todo Search Modal State
    const [searchModalShow, setSearchModalShow] = useState("");
    // todo Search Modal State

    return (
        <div className="main-layout">
            <Search_Modal searchModalShow={searchModalShow} setSearchModalShow={setSearchModalShow} />
            <Dialog_Modal />
            <Header setSearchModalShow={setSearchModalShow} />
            {children}
            <Policy />
            <Footer />
        </div>
    );
};

export default Main_Layout;
