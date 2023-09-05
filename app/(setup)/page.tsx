import { redirect } from 'next/navigation';
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from '@/components/modals/initial-modal';


const SetupPage = async () => {
    // First of all, get the user profile
    const profile = await initialProfile();

    // With the user's profile, try to find some server that it may own
    const server = await db.server.findFirst({
        where: {
            members: {
                some: { profileId: profile.id }
            }
        }
    });

    // If it was able to find any server, then redirect to the server
    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    // If it was not able to find any server, then show the "Create Server" modal so the user can create a new one
    return <InitialModal />;
}
 
export default SetupPage;