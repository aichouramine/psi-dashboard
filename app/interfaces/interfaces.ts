export enum AuthType {
    TWITTER,
    GITHUB
};

export enum NotificationPermission {
	GRANTED,
	DENIED,
	UNSUPPORTED
};

export interface AuthUser {
    auth: {
        provider: string,
        uid: string
    },
    expires: number,
    provider: string,
    token: string,
    uid: string,
    twitter?: {
        accessToken: string,
        accessTokenSecret: string,
        displayName: string,
        id: string,
        profileImageURL: string,
        username: string
    }
};