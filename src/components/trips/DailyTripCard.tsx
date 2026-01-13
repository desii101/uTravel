import { useTranslations } from "@/hooks/useTranslations";
import { profitStatus } from "@/utils/tripUtils";
import { faAddressBook, faCalendarDays, faCircleXmark, faEdit, faMoneyBill1Wave, faUsers, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { Button, DialogButton } from "../NiceElements";

interface DailyTripCardProps {
    id: string,
    title: string,
    peopleCount: number,
    peopleBreakeven: number,
    price: number,
    tripDate: string,
};

export default function DailyTripCard({ id, title, peopleCount, peopleBreakeven, price, tripDate }: DailyTripCardProps) {
    const { t } = useTranslations('dashboard.dailyTrips.card');
    const navigate = useNavigate();
    const profitStats = profitStatus(peopleCount, peopleBreakeven);
    return (
        <div className="bg-subbackground rounded-xl w-full flex flex-row">
            <div className="flex flex-col flex-grow text-simple p-3">
                <h1 className="font-medium text-primary text-xl md:text-3xl flex flex-col">
                    {title}
                </h1>
                <div>
                    <div className="people">
                        <FontAwesomeIcon className="text-primary me-2" size="lg" icon={faUsers} />
                        <span>
                            <span className="font-normal">{t('peopleRegistered', { count: peopleCount })}</span>
                        </span>
                    </div>
                    <div className="profit-status">
                        <FontAwesomeIcon className="me-2" size="lg" color={profitStats.color} icon={profitStats.icon} />
                        <span>
                            <span className="font-normal">{t(profitStats.text)}</span>
                        </span>
                    </div>
                </div>
                <div className="flex flex-col font-light mt-6">
                    <div className="date">
                        <FontAwesomeIcon className="text-primary w-4 me-2" icon={faCalendarDays} />
                        <span>
                            <span className="font-normal">{t('date')} - </span>
                            <span>{tripDate}</span>
                        </span>
                    </div>
                    <div className="price">
                        <FontAwesomeIcon className="text-primary w-4 me-2" icon={faMoneyBill1Wave} />
                        <span>
                            <span className="font-normal">{t('ticketPrice')} - </span>
                            <span>{price}₪</span>
                        </span>
                    </div>
                    <div className="people-breakeven">
                        <FontAwesomeIcon className="text-primary w-4 me-2" icon={faUsersBetweenLines} />
                        <span>
                            <span className="font-normal">{t('peopleBreakeven', { breakeven: peopleBreakeven })}</span>
                        </span>
                    </div>
                </div>
                <div className="buttons flex max-lg:flex-col gap-3 pt-4">
                    <Button className="w-full !bg-green-500" onClick={() => navigate(`${id}/registeration`)}>
                        <FontAwesomeIcon icon={faAddressBook} />
                        <span className="ps-2 font-medium">{t('registeration')}</span>
                    </Button>
                    <Button className="w-full " onClick={() => navigate(`${id}/edit`)}>
                        <FontAwesomeIcon icon={faEdit} />
                        <span className="ps-2 font-medium">{t('edit')}</span>
                    </Button>
                    <DialogButton dangerous defaultChoices buttonTitle={t('cancel')} icon={faCircleXmark}
                        className="bg-error text-white content-center" message={t('tripCancelWarning', { trip: title })} onConfirm={() => console.log('deleted')} />
                </div>
            </div>
        </div>
    )
}