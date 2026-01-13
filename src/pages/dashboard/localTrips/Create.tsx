import LocalTripForm from "@/components/trips/LocalTripForm";

export default function LocalTripCreation() {
    return (
        <div className="localtrip-creation h-full">
            <LocalTripForm purpose="create" />
        </div>
    )
}