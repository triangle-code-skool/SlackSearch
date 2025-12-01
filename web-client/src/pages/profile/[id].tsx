import { useRouter } from "next/router";
import dummyData from "../../data/dummy_data.json";

const SAVED_KEY = "saved_profile_ids";

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;
    //Find the person based on id
    const person = dummyData.find(p => p.slack_id === id);
    //Person did not exist
    if (!person) {
        return (
        <div>
            <h1 className="text-3xl">
                Profile
            </h1>
            <p>
                No person found for this ID
            </p>
        </div>
        );
    }

    //Find name, display name, email, phone number, and online matches
    const realName = person.seed_identity.real_name;
    const displayName = person.seed_identity.display_name;
    const email = person.seed_identity.email;
    const phoneNum = person.seed_identity.phone ?? "N/A";

    //Save the id to local storage to populate dashboard
    const SaveToDash = () => {
        try {
            //Grab raw local storage data and see if it is populated
            const raw = localStorage.getItem(SAVED_KEY);
            let saved = [];
            if (raw) {
                saved = JSON.parse(raw);
            }

            //See if id has already been saved, if not add to local storage
            if (!saved.includes(id)) {
                saved.push(id);
                localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
            }
            //Navigate to the dashboard page
            router.push("/dashboard");
        } catch (err) {
            console.error("Failed to save profile:", err);
        }
    };

    //Show the id, name, usernam, email, phone-number, as well as save to dashboard button
    return (
        <div>
            <h1 className="text-3xl">
                Profile
            </h1>
            <p>
                User id: {id} <br />
                Name: {realName} <br />
                Username: {displayName} <br />
                Email: {email} <br />
                Phone Number: {phoneNum}
            </p>
            <button
            type="button"
            onClick={SaveToDash}
            className="relative inline-flex h-6 w-11 items-center bg-gray-800 transition-colors"
            >
                Save to Dashboard
            </button>
        </div>
    );
};

export default Profile;