import { Member, MemberRole, Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & { profile: Profile };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIconMap = {
    'GUEST': null,
    'MODERATOR': <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    'ADMIN': <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>
}

const ChatItem = (props: ChatItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fileType = props.fileUrl?.split('.').pop();

    const isAdmin = props.currentMember.role == MemberRole.ADMIN;
    const isModerator = props.currentMember.role == MemberRole.MODERATOR;
    const isOwner = props.currentMember.id = props.member.id;
    const canDeleteMessage = !props.deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !props.deleted && isOwner && !props.fileUrl;
    const isPDF = fileType === 'pdf' && props.fileUrl;
    const isImage = !isPDF && props.fileUrl;
    

    return ( 
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar 
                        src={ props.member.profile.imageUrl }
                    />
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">
                                { props.member.profile.name }
                            </p>

                            <ActionTooltip label={props.member.role}>
                                <p>{ roleIconMap[props.member.role] }</p>
                            </ActionTooltip>
                        </div>

                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            { props.timestamp }
                        </span>
                    </div>

                    {isImage && (
                        <a 
                            href={props.fileUrl as any}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <Image 
                                src={props.fileUrl as any}
                                alt={props.content}
                                fill
                                className="object-cover"
                            />
                        </a>
                    )}

                    {isPDF && (
                        <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
                            <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400'/>
                            <a
                                href={props.fileUrl as any}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
                            >
                                PDF File
                            </a>
                        </div>
                    )}

                    {!props.fileUrl && !isEditing && (
                        <p className={cn(
                            'text-sm text-zinc-600 dark:text-zinc-300',
                            props.deleted && 'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1'
                        )}>
                            {props.content}
                            {props.isUpdated && !props.deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}
                </div>
            </div>

            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"/>
                        </ActionTooltip>
                    )}

                    {canDeleteMessage && (
                        <ActionTooltip label="Delete">
                            <Trash className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"/>
                        </ActionTooltip>
                    )}
                </div>
            )}
        </div>
    );
}
 
export default ChatItem;