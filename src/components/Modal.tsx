import React from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean,
    toggle: () => void,
    className?: string,
    children: React.ReactNode
};

/**
 * Title of modal
 * @param {string} title String as title for modal
 */
function ModalTitle({ title }: { title: string }) {
    return (<div className="title p-4 pb-0 text-lg font-medium">{title}</div>)
}

function ModalBody({ children }: { children: React.ReactNode }) {
    return (<div className="body p-4">{children}</div>)
}
function ModalFooter({ children }: { children: React.ReactNode }) {
    return (<div className="footer flex relative justify-end p-3 gap-2">{children}</div>)
}

const Modal = ({ isOpen, toggle, className, children }: ModalProps) => {
    function handleOutModalClick(e: React.MouseEvent<HTMLDivElement>) {
        // detecting clicks on modalWrapper or buttons in footer
        // this approach allows us to have <select> or w.e in footer
        // add 'keep-open' to button className to prevent auto close
        const elem = (e.target as HTMLElement);
        const modalWrapper = document.querySelector('.modal')?.parentElement;
        const isFooterButton = (document.querySelector('.modal .footer') === elem.parentElement && elem.nodeName.toLowerCase() === 'button' && !elem.classList.contains('keep-open'));
        if (elem === modalWrapper || isFooterButton) {
            modalWrapper?.classList.replace('animate-fadein', 'animate-fadeout');
            modalWrapper?.firstElementChild?.classList.replace('animate-dialogFadein', 'animate-dialogFadeout'); // modal
            setTimeout(() => toggle(), 200);
        }
    }

    return isOpen ? createPortal(
        <div role="button" tabIndex={-1} onClick={(e) => handleOutModalClick(e)} className="fixed cursor-auto animate-fadein bg-black/50 flex justify-center min-h-full items-center top-0 left-0 h-full w-full z-[1024]">
            <div className={`modal animate-dialogFadein text-simple bg-subbackground flex flex-col sm:min-w-96 sm:max-w-lg w-full mx-2 rounded-xl ${className ?? ''}`.trim()}>
                {children}
            </div>
        </div>,
        document.body) : null;
}

export { Modal, ModalBody, ModalFooter, ModalTitle };
