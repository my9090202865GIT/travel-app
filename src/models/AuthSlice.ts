export interface AuthSlice {
    isLoggedIn: boolean;
    modalOpen: boolean;
    username: string;
    users: Array<{ username: string, password: string, email: string }>;
}
