import { useRouter } from "next/router";

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
        <h1 className="text-3xl">
            Profile
        </h1>
        <p>User id: {id}</p>
        </div>
    );
};

export default Profile;