export interface RedditCommunity {
    id: number;
    name: string;
    description: string;
    rules: string[];
    suspended: boolean;
    suspendedReason: string;
    imageId: number;
}