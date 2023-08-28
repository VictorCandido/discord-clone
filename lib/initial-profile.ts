import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from '@/lib/ds';

export const initialProfile = async () => {
    const user = await currentUser();   //  Return the current user logged in on system

    // If there is no user logged in, then redirect to sign in page
    if (!user) {
        return redirectToSignIn();
    }

    // If the user is logged in, find it's profile on db
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    // If it was abble to find it's profile, return then
    if (profile) {
        return profile;
    }

    // If it wan not abble to find it's profile, then create a new one
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })

    return newProfile;
}