import DailyTripForm from "@/components/trips/DailyTripForm";

export default function DailyTripCreation() {
    return (
        <div className="dailytrip-creation h-full">
            <DailyTripForm purpose="create" />
        </div>
    )
}