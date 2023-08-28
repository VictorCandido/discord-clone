import { redirect } from 'next/navigation';
import { db } from "@/lib/ds";
import { initialProfile } from "@/lib/initial-profile";
import profileModel from '@/models/profileModel';
import { InitialModal } from '@/components/modals/initial-modal';


const SetupPage = async () => {
    const profile = await initialProfile() as profileModel;

    const server = await db.server.findFirst({
        where: {
            members: {
                some: { profileId: profile.id }
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return <InitialModal />;
}
 
export default SetupPage;