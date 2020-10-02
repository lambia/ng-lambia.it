export interface Item {
    readonly id: number;
    selected?: boolean; //ToDo
    readonly name: string;

    readonly href?: string;
    readonly src?: string;
    readonly description?: string;

    //fields: { things: [1,2,3], categories: [1] } 
    readonly fields: {
        [propName: string]: number[];
    };
}