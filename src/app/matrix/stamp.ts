export interface Stamp {
    readonly id: number;
    visible: boolean;
    readonly title: string;
    readonly href?: string;
    readonly src?: string;
    readonly description?: string;
}