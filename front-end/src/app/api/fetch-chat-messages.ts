import { UserProfile } from "@/types/user-profile";

export enum ChatMessageRole {
  Seller = 'Seller',
  User = 'User',
  AI = 'AI'
}

export type ChatUserToSeller = {
    from: ChatMessageRole.User;
    to: ChatMessageRole.Seller;
    message: string;
    timestamp: string;
    userProfile: UserProfile
}

export type ChatSellerToUser = {
    from: ChatMessageRole.Seller;
    to: ChatMessageRole.User;
    message: string;
    timestamp: string;
    userProfile: UserProfile
}

export type ChatAIToUser = {
    from: ChatMessageRole.AI;
    to: ChatMessageRole.User;
    message: string;
    timestamp: string;
}

export type ChatUserToAI = {
    from: ChatMessageRole.User;
    to: ChatMessageRole.AI;
    message: string;
    timestamp: string;
    userProfile: UserProfile
}

export type ChatMessage = ChatUserToSeller | ChatSellerToUser | ChatAIToUser | ChatUserToAI