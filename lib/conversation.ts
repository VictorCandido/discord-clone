import { db } from "./db"

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
    let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

    if (!conversation) {
        conversation = await createNewConversation(memberOneId, memberTwoId);
    }

    console.log('conversation', conversation)

    return conversation;
}

const findConversation = async (memberOneId: string, memberTwoId: string) => {
    console.log('#### findConversation', memberOneId, memberTwoId)
    
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId },
                    { memberTwoId }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
    console.log('#### createNewConversation', memberOneId, memberTwoId)

    try {
        return await db.conversation.create({
            data: {
              memberOneId,
              memberTwoId,
            },
            include: {
              memberOne: {
                include: {
                  profile: true,
                }
              },
              memberTwo: {
                include: {
                  profile: true,
                }
              }
            }
          });
    } catch (error) {
        console.log(error);
        return null;
    }
}