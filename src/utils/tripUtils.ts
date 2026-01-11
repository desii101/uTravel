import { faArrowTrendDown, faArrowTrendUp, faGripLines, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

type IProfitStatus = { icon: IconDefinition, color: string, text: string };

export function profitStatus(peopleCount: number, peopleBreakeven: number): IProfitStatus {
    const messages: Record<string, IProfitStatus> = {
        profitable: { icon: faArrowTrendUp, color: '#22c55e', text: 'profitableTrip' },
        notProfitable: { icon: faArrowTrendDown, color: '#dc2626', text: 'notProfitableTrip' },
        breakeven: { icon: faGripLines, color: '#66b5ff', text: 'breakevenTrip' },
    };
    if (peopleCount === peopleBreakeven) return messages['breakeven'];
    else if (peopleCount > peopleBreakeven) return messages['profitable'];
    else return messages['notProfitable'];
}
