import ReactDOM from "react-dom";
import { useEffect } from "react";
import classNames from "classnames";

function Modal({ onClose, children, actionBar }) {

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    const classes = classNames(
        'fixed p-10 bg-white w-120',
        {
            'inset-x-96 inset-y-64': window.innerWidth > 800,
            'inset-x-14 inset-y-48': window.innerWidth < 800 && window.innerWidth > 400,
            'inset-x-10 inset-y-32': window.innerWidth < 400
        }
    );

    return ReactDOM.createPortal(
        <div>
            <div onClick={ onClose } className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className={classes}>
                <div className="flex flex-col justify-between h-full">
                    { children }
                    <div className="flex justify-center">
                        { actionBar }
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
}

export default Modal;