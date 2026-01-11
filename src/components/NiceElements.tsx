import { useTranslations } from "@/hooks/useTranslations";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCloudArrowUp, faEye, faEyeSlash, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { type ChangeEvent, type DragEvent, useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "./Modal";

/**
 * Components that provide utilities for management pages in dashboard
 *  e.g. create/edit pages
 */

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    className?: string
};
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    invalid?: boolean | '',
    invalidMessage?: string
};
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string,
    invalid?: boolean | '',
    invalidMessage?: string
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string,
    invalid?: boolean | '',
    invalidMessage?: string
};

export type MultiSelectElement = { id: number | string, name: string };
interface MultiSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    selectClassName?: string,
    dropdownClassName?: string
    data: MultiSelectElement[],
    elements: MultiSelectElement[],
    handleElements: (items: MultiSelectElement[]) => void,
    handleData: (items: MultiSelectElement[]) => void,
    selectMessage: string,
    noItemsMessage: string,
    invalid?: boolean | '',
    invalidMessage?: string
};
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
};
interface NoticeProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string
};
interface RadioButtonGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    invalid?: boolean | '',
    defaultCheck: string | number,
    optionsFor: string,
    invalidMessage?: string,
    buttons: { key: string | number, value: string | number }[]
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    CheckboxClassName?: string,
    LabelClassName?: string,
    label: string,
    invalid?: boolean | '',
    invalidMessage?: string
};

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id?: string,
    className?: string,
    multiple?: boolean,
    maxFiles?: number,
    previewMode: 'embed' | 'carousel',
    onFileDrop?: (files: File[]) => void,
    onFileDeletion?: (index: number) => void,
    invalid?: boolean | '',
    invalidMessage?: string
};

interface FileInputModalProps {
    previews: string[],
    inputId?: string,
    maxFiles: number,
    onConfirm: (index: number) => void
};

interface DialogButtonProps {
    buttonTitle: string,
    message: string,
    icon?: IconDefinition,
    defaultChoices?: boolean,
    dangerous?: boolean,
    className?: string,
    iconClassName?: string,
    onConfirm: () => void
};

const Label = ({ className, ...props }: LabelProps) => {
    const classes = `block mb-2 text-sm text-simple ${className ?? ''}`.trim();
    const { htmlFor, ...otherProps } = props;
    return (
        <label {...otherProps} htmlFor={htmlFor} className={classes} />
    )
}

const Input = ({ className, invalid, invalidMessage, ...props }: InputProps) => {
    const classes = `bg-background text-simple rounded-lg block w-full px-3 py-2 focus:outline-none placeholder:text-gray-500 ring-transparent ${invalid ? 'invalid-icon pe-8 border-[1px] border-error ring-1 hover:ring-error focus:ring-error' : 'ring-2 hover:ring-primary-700 focus:ring-primary'} ${className ?? ''}`.trim();
    return (<>
        <input {...props} className={classes} />
        {invalid && <label className="block mt-2 text-sm text-error">{invalidMessage}</label>}
    </>)
}

const PasswordInput = ({ className, invalid, invalidMessage, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const classes = `bg-background text-simple rounded-lg block w-full px-3 py-2 focus:outline-none placeholder:text-gray-500 ring-transparent ${invalid ? 'invalid-icon pe-14 border-[1px] border-error ring-1 hover:ring-error focus:ring-error' : 'pe-8 ring-2 hover:ring-primary-700 focus:ring-primary'} ${className ?? ''}`.trim();
    return (<>
        <div className="relative">
            <FontAwesomeIcon className={`icon cursor-pointer absolute top-[calc(50%-0.5em)] text-sm ${invalid ? 'end-8' : 'end-3'}`} icon={showPassword ? faEye : faEyeSlash} onClick={() => setShowPassword(!showPassword)} />
            <input {...props} type={showPassword ? "text" : "password"} className={classes} />
        </div>
        {invalid && <label className="block mt-2 text-sm text-error">{invalidMessage}</label>}
    </>
    )
}
const Textarea = ({ className, invalid, invalidMessage, ...props }: TextareaProps) => {
    const classes = `bg-background text-simple rounded-lg block w-full px-3 py-2 focus:outline-none placeholder:text-gray-500 ring-transparent ${invalid ? 'invalid-icon pe-8 border-[1px] border-error ring-1 hover:ring-error focus:ring-error' : 'ring-2 hover:ring-primary-700 focus:ring-primary'} ${className ?? ''}`.trim();
    return (<>
        <textarea {...props} className={classes} />
        {invalid && <label className="block mt-2 text-sm text-error">{invalidMessage}</label>}</>)
}

const Select = ({ className, invalid, invalidMessage, ...props }: SelectProps) => {
    const classes = `bg-background text-simple rounded-lg block w-full px-3 py-2 pe-7 whitespace-break-spaces hover:cursor-pointer focus:outline-none placeholder:text-gray-500 ring-transparent ${invalid ? 'select-invalid-icon pe-14 border-[1px] border-error ring-1 hover:ring-error focus:ring-error' : 'ring-2 hover:ring-primary-700 focus:ring-primary'} ${className ?? ''}`.trim();
    return (<>
        <select {...props} className={classes} />
        {invalid && <label className="block mt-2 text-sm text-error">{invalidMessage}</label>}
    </>)
}

const MultiSelect = ({ selectClassName, dropdownClassName, data, handleData, elements, handleElements, selectMessage, noItemsMessage, invalid, invalidMessage }: MultiSelectProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const handleFocus = () => {
        if (divRef.current)
            divRef.current.focus();
    };
    const selectClasses = `multi-select select-none bg-background text-simple rounded-lg block w-full ps-3 pe-8 py-2 hover:cursor-pointer focus:outline-none placeholder:text-gray-500 ring-transparent ${invalid ? 'select-invalid-icon pe-14 border-[1px] border-error ring-1 hover:ring-error focus:ring-error' : 'ring-2 hover:ring-primary-700 focus:ring-primary'} ${selectClassName ?? ''}`.trim();
    const dropdownClasses = `dropdown-menu select-none z-10 absolute w-full top-0.5 rounded-lg bg-background ring-2 ring-zinc-400 dark:ring-zinc-600  ${dropdownClassName ?? ''}`.trim();
    const handleAddToElements = (id: string | number, name: string) => {
        // add item to elements and remove from old set (data)
        handleElements([...elements, { id, name }]);
        handleData([...data.filter(d => d.id !== id)]);
    };
    const handleRemoveToElements = (id: string | number, name: string) => {
        // add item back to old set (data) and remove it from elements
        handleData([...data, { id, name }]);
        handleElements([...elements.filter(e => e.id !== id)]);
    };
    const handleDropdown = (e: React.MouseEvent<HTMLElement>) => {
        const dropdown = e.currentTarget.nextSibling as HTMLElement;
        const menu = dropdown.querySelector('.dropdown-menu') as HTMLDivElement;
        const menuParent = menu.parentElement as HTMLDivElement;
        if (menuParent.style.display === 'block')
            return;
        else
            menuParent.style.display = 'block';
        const handleClicks = (x: MouseEvent) => {
            if (x.target === e.target || (!menu.contains(x.target as HTMLElement) && !(e.target as HTMLDivElement).contains(x.target as HTMLElement))) {
                setTimeout(() => menuParent.style.display = 'none', 25);
                document.removeEventListener('click', handleClicks, true);
            }
        }
        document.addEventListener('click', handleClicks, true);
    }
    const MultiSelectItem = ({ id, name }: { id: string | number, name: string }) => {
        return (
            <span className="multi-select-item-selected bg-primary text-white inline-block rounded-lg whitespace-nowrap mx-1 my-1 py-0.5 px-2">
                <span className="item-name me-2 cursor-default">{name}</span>
                <FontAwesomeIcon className="icon" icon={faXmark} onClick={(e) => { e.stopPropagation(); handleRemoveToElements(id, name) }} />
            </span>
        )
    };

    return (<>
        <div className={selectClasses} role="button" tabIndex={0} onClick={(e) => { handleDropdown(e); handleFocus(); }}>
            {elements.length === 0 && selectMessage}
            {elements.length !== 0 && elements.map((elem) => <MultiSelectItem key={elem.id} name={elem.name} id={elem.id} />)}
        </div>
        <div>
            <div className={`dropdown relative hidden`}>
                <div className={dropdownClasses}>
                    {data.length === 0 && <span role="button" tabIndex={0} className="dropdown-no-item block px-3 text-base text-simple leading-10 rounded-lg hover:cursor-pointer dark:hover:bg-subbackground hover:bg-gray-100" onClick={e => e.stopPropagation()} >{noItemsMessage}</span>}
                    {data.map((d) => <span role="button" tabIndex={0} className="dropdown-item block px-3 text-base text-simple leading-10 hover:cursor-pointer dark:hover:bg-subbackground hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg" key={d.id} onClick={(e) => { e.stopPropagation(); handleAddToElements(d.id, d.name); }}>{d.name}</span>)}
                </div>
            </div>
        </div>
        {invalid && <label className="block mt-2 text-sm text-error">{invalidMessage}</label>}
    </>)
}

const Button = ({ className, ...props }: ButtonProps) => {
    const classes = `text-white bg-primary hover:bg-primary-600 disabled:bg-primary-600/70 rounded-xl py-1.5 px-3 ${className ?? ''}`.trim();
    return (
        <button {...props} className={classes} />
    )
}

const Notice = ({ className, ...props }: NoticeProps) => {
    const classes = `block text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line ${className ?? ''}`.trim();
    return (
        <span {...props} className={classes} />
    )
}

const RadioButtonGroup = ({ className, buttons, defaultCheck, optionsFor, invalid, invalidMessage, ...props }: RadioButtonGroupProps) => {
    const groupClasses = `grid w-full gap-2 rounded-xl select-none bg-background text-simple ring-transparent ${invalid ? 'invalid-icon pe-14 border-[1px] border-error ring-1 pe-8' : 'ring-2'} ${className ?? ''}`.trim();
    return (
        <>
            <div className={groupClasses}>
                {buttons.map((value) => (
                    <div key={value.key}>
                        <input {...props}
                            type="radio"
                            name={optionsFor}
                            id={value.key as string}
                            value={value.value}
                            className="peer hidden"
                            checked={defaultCheck === value.value}
                        />
                        <label htmlFor={value.key as string} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white hover:bg-primary/50">
                            {value.key}
                        </label>
                    </div>
                ))}
            </div>
            {invalid && <label className="block mt-2 text-sm text-error">{invalidMessage}</label>}
        </>
    );
};

const Checkbox = ({ label, CheckboxClassName, LabelClassName, ...props }: CheckboxProps) => {
    const checkBoxClasses = `accent-primary mb-2.5 ${CheckboxClassName ?? ''}`.trim();
    const labelClasses = `ms-1.5 ${LabelClassName ?? ''}`.trim();
    return (
        <div className="flex items-center">
            <input {...props} type="checkbox" className={checkBoxClasses} />
            <Label className={labelClasses}>{label}</Label>
        </div>
    )
}

const FileInputModal = ({ previews, maxFiles, inputId, onConfirm }: FileInputModalProps) => {
    const { t } = useTranslations('fileInput');
    const [currentPreview, setCurrentPreview] = useState({ blob: previews[0], index: 0 });
    const [modal, setModal] = useState<boolean>(false);
    const toggle = () => setModal(!modal);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setCurrentPreview({ blob: previews[0], index: 0 }), [previews]);
    return (<>
        <span className={`block font-medium w-full text-simple text-center py-1.5 rounded-xl whitespace-nowrap`} onClick={toggle} role="button" tabIndex={0}>
            <FontAwesomeIcon icon={faEye} className="pe-1.5" />
            <span>{t('clickToPreview')}</span>
        </span>
        <Modal isOpen={modal} toggle={toggle} className="sm:max-w-4xl">
            <ModalBody>
                <h1 className="text-xl font-medium pb-2">{t('preview')}</h1>
                <img src={currentPreview.blob} className="w-full h-full max-h-[50vh] rounded-xl object-contain" alt="preview" />
                {previews.length > 1 && <div className="images mt-2 flex h-20 gap-2">
                    {previews.map((_, i) => <img key={_} src={previews[i]} width={0} height={0}
                        className="bg-black size-20 rounded-xl object-contain cursor-pointer" alt="preview" onClick={() => setCurrentPreview({ blob: previews[i], index: i })} />)}
                </div>}
            </ModalBody>
            <ModalFooter>
                {maxFiles > previews.length &&
                    <button className="absolute start-3 font-medium bg-primary hover:bg-primary-600 text-white rounded-xl whitespace-nowrap keep-open">
                        <label htmlFor={inputId} className="block w-full h-full px-3 py-1.5 cursor-pointer">{t('addMore')}</label>
                    </button>}
                <button className={`font-medium bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl whitespace-nowrap keep-open`} onClick={() => onConfirm(currentPreview.index)}>{t('delete')}</button>
                <button className="font-medium bg-primary hover:bg-primary-600 text-white px-3 py-1.5 rounded-xl whitespace-nowrap">{t('close')}</button>
            </ModalFooter >
        </Modal >
    </>)
}

const FileInput = ({ id, className, multiple = false, maxFiles = 1, previewMode, onFileDrop, onFileDeletion, invalid, invalidMessage, children, ...props }: FileInputProps) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState<string[]>([]);
    const [currentPreview, setCurrentPreview] = useState({ blob: preview[0], index: 0 });
    const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const handleDragLeave = () => setIsDragOver(false);
    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => e.preventDefault();
    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (maxFiles <= preview.length)
            return;
        const input = document.getElementById(id as string) as HTMLInputElement;
        const fileList = Array.from(e.dataTransfer.files);
        const totalCount = fileList.length + preview.length;
        if (totalCount > maxFiles) {
            const remainingSpace = maxFiles - preview.length;
            fileList.length = remainingSpace;
        }
        if (onFileDrop) onFileDrop(fileList);
        setPreview(prev => ([...prev, ...fileList.map(file => URL.createObjectURL(file))]));
        input.value = '';
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && onFileDrop) {
            const fileList = Array.from(e.target.files);
            const totalCount = fileList.length + preview.length;
            if (totalCount > maxFiles) {
                const remainingSpace = maxFiles - preview.length;
                fileList.length = remainingSpace;
            }
            onFileDrop(fileList);
            setPreview(prev => ([...prev, ...fileList.map(file => URL.createObjectURL(file))]));
            e.target.value = '';
        }
    };
    const handleImageDeletion = (index: number) => {
        setPreview(preview?.filter((_, i) => i !== index));
        if (onFileDeletion) onFileDeletion(index);
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setCurrentPreview({ blob: preview[0], index: 0 }), [preview]);
    const classes = `flex flex-col items-center justify-center w-full rounded-xl cursor-pointer bg-background hover:bg-neutral-200 dark:hover:bg-background/50 ring-transparent
     ${isDragOver ? 'bg-neutral-200 dark:bg-background/50 ring-2 !ring-primary-700' : ''} ${invalid ? 'border-[1px] border-error ring-1 hover:ring-error focus:ring-error'
            : 'ring-2 hover:ring-primary-700 focus:ring-primary'} ${previewMode === 'embed' && preview.length !== 0 ? 'h-10' : 'h-64'} ${className ?? ''}`.trim();

    return (<>
        <div className="flex flex-col justify-center w-full">
            <label onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop} htmlFor={preview.length !== 0 ? '' : id} className={classes}>
                {preview?.length !== 0 ?
                    previewMode === 'carousel' ? <div className="carousel relative w-full h-full rounded-xl">
                        <div className="absolute text-primary end-0 pe-4 pt-4 z-10">
                            {maxFiles > preview.length && <label className="pe-2 cursor-pointer" htmlFor={id}><FontAwesomeIcon icon={faPlus} /></label>}
                            <FontAwesomeIcon icon={faTrash} onClick={(e) => { e.preventDefault(); handleImageDeletion(currentPreview.index) }} />
                        </div>
                        {currentPreview.blob && <img src={currentPreview.blob} className="w-full h-full object-contain" alt="preview" />}
                    </div>
                        : <div className="embed w-full px-4 items-center flex justify-between">
                            <FileInputModal maxFiles={maxFiles} inputId={id} onConfirm={(i) => handleImageDeletion(i)} previews={preview} />
                        </div>
                    : <div className="flex flex-col items-center justify-center pt-5 pb-6 px-3 text-center pointer-events-none">
                        <FontAwesomeIcon icon={faCloudArrowUp} size="2x" />
                        {children}
                    </div>}
                <input id={id} type="file" className="hidden" multiple={multiple} onChange={handleChange} {...props} />
            </label>
            {(previewMode === 'carousel' && preview.length > 1) && <div className="images mt-2 flex h-20 gap-2 cursor-default" >
                {preview.map((_, i) => <img key={_} src={preview[i]}
                    className="bg-black size-20 rounded-xl object-contain cursor-pointer" alt="preview" onClick={() => setCurrentPreview({ blob: preview[i], index: i })} />)}
            </div>}
        </div>
        {invalid && <label className="block mt-2 text-sm text-error">{invalidMessage}</label>}
    </>)
}

const DialogButton = ({ buttonTitle, message, icon, iconClassName, defaultChoices = false, dangerous = false, className, onConfirm }: DialogButtonProps) => {
    const { t } = useTranslations('dialog');
    const [modal, setModal] = useState<boolean>(false);
    const toggle = () => setModal(!modal);
    return (<>
        <span role="button" tabIndex={0} className={`block font-medium w-full text-simple text-center py-1.5 rounded-xl whitespace-nowrap ${className ?? ''}`.trim()} onClick={toggle} >
            {icon && <FontAwesomeIcon icon={icon} className={`pe-1.5 ${iconClassName}`.trim()} />}
            <span>{buttonTitle}</span>
        </span>
        <Modal isOpen={modal} toggle={toggle} className="sm:max-w-4xl">
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <button className={`font-medium ${dangerous ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-600'} text-white px-3 py-1.5 rounded-xl whitespace-nowrap`} onClick={onConfirm}>{defaultChoices ? t('yes') : buttonTitle}</button>
                <button className="font-medium bg-primary hover:bg-primary-600 text-white px-3 py-1.5 rounded-xl whitespace-nowrap">{defaultChoices ? t('no') : t('cancel')}</button>
            </ModalFooter>
        </Modal >
    </>)
}

export { Button, Checkbox, DialogButton, FileInput, Input, Label, MultiSelect, Notice, PasswordInput, RadioButtonGroup, Select, Textarea };
