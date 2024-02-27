/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Dialog_Modal.css";

const Dialog_Modal = () => {
    const [dialogModalShow, setDialogModalShow] = useState("");

    useEffect(function () {
        const isChecked = localStorage.getItem("dialogStatus") ? JSON.parse(localStorage.getItem("dialogStatus")) : "";

        !isChecked && setTimeout(() => setDialogModalShow("show"), 3000);
    }, []);

    function handleCloseDialog(event) {
        const isChecked = event.target.checked;
        localStorage.setItem("dialogStatus", JSON.stringify(isChecked));
    }
    return (
        <div className={`modal-dialog ${dialogModalShow}`}>
            <div className="modal-content">
                <button className="modal-close" onClick={() => setDialogModalShow("")}>
                    <i className="bi bi-x"></i>
                </button>
                <div className="modal-image">
                    <img src="/img/modal-dialog.jpg" alt="" />
                </div>
                <div className="popup-wrapper">
                    <div className="popup-content">
                        <div className="popup-title">
                            <h3>NEWSLETTER</h3>
                        </div>
                        <p className="popup-text">
                            Sign up to our newsletter and get exclusive deals you won find any where else straight to
                            your inbox!
                        </p>
                        <form className="popup-form">
                            <input type="text" placeholder="Enter Your E-mail Address Here" />
                            <button className="btn btn-primary">SUBSCRİBE</button>
                            <label htmlFor="">
                                <input type="checkbox" onChange={handleCloseDialog} />
                                <span>Don`t show this popup again!</span>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-overlay" onClick={() => setDialogModalShow("")}></div>
        </div>
    );
};

export default Dialog_Modal;
