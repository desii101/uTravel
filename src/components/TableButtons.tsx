import { useTranslations } from "@/hooks/useTranslations"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faPen, faPersonCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Modal, ModalBody, ModalFooter } from "./Modal"
import type { tableButtonsHandlerTypes, TableType } from "./TableTypes"


interface TableButtonProps {
    title: string,
    icon: IconDefinition,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
};

/**
 * Table button for TableRow component
 */
function TableButton({ title, icon, onClick }: TableButtonProps) {
    return (
        <button className="font-medium bg-primary hover:bg-primary-600 text-white px-3 py-1.5 rounded-xl whitespace-nowrap" onClick={onClick}>
            <FontAwesomeIcon icon={icon} className="pe-1.5" />
            <span>{title}</span>
        </button>
    )
}


interface TableButtonModalProps {
    buttonTitle: string,
    message: string,
    icon: IconDefinition,
    defaultChoices?: boolean,
    dangerous?: boolean,
    onConfirm: () => void
};
function TableButtonModal({ buttonTitle, message, icon, defaultChoices = false, dangerous = false, onConfirm }: TableButtonModalProps) {
    const { t } = useTranslations('dashboard.tables');
    const [modal, setModal] = useState<boolean>(false);
    const toggle = () => setModal(!modal);
    return (<>
        <button className={`font-medium ${dangerous ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-600'} text-white px-3 py-1.5 rounded-xl whitespace-nowrap`} onClick={toggle}>
            <FontAwesomeIcon icon={icon} className="pe-1.5" />
            <span>{buttonTitle}</span>
        </button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <button className={`font-medium ${dangerous ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-600'} text-white px-3 py-1.5 rounded-xl whitespace-nowrap`} onClick={onConfirm}>{defaultChoices ? t('yes') : buttonTitle}</button>
                <button className="font-medium bg-primary hover:bg-primary-600 text-white px-3 py-1.5 rounded-xl whitespace-nowrap">{defaultChoices ? t('no') : t('cancel')}</button>
            </ModalFooter>
        </Modal>
    </>)
}

/**
 * Adds buttons to each table row if needed
 * @param {tableButtonsHandlerTypes} type type of table
 * @param {TableType} element the passed row data
 */
export function TableButtonsHandler({ type, element }: { type: tableButtonsHandlerTypes, element: TableType }) {
    const { t } = useTranslations('dashboard.tables');
    const navigate = useNavigate();
    if (type === 'clients')
        return (<>
            <TableButton icon={faPen} title={t('edit')} onClick={() => navigate(`${element.id}`)} />
            <TableButtonModal icon={faPersonCircleXmark} dangerous={true} buttonTitle={t('delete')} message={t('clientDeleteWarning', { client: element['name'] })} onConfirm={() => alert('delete')} />
        </>)
    else
        return null;
}