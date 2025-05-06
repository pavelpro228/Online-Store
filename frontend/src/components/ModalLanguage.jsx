import React from "react";
import { MdClose } from "react-icons/md";

const ModalLanguage = (props) => {
    const closeModal = () => {
        props.setIsOpenedModal(isOpenedModal => !isOpenedModal)
    }
    return (
        <div className="modal-overlay">
                    <div>
                        <div className="modal">
                            <form>
                                <div style={{display: 'flex', marginBottom: "40px"}}>
                                    <p className='review-title'>Обрати мову</p>
                                    <MdClose className='btn-close' onClick={closeModal}/>
                                </div>
                                <ul className="select-language">
                                    {/* Links */}
                                    <li>Англійська</li>
                                    <li>Українська</li>
                                    <li>Російська</li>
                                </ul>
                            </form>
                        </div>
                    </div>
                    
                </div>
    )
}
export default ModalLanguage