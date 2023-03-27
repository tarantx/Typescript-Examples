import { Actor } from 'tarant';


export interface Constructor<T extends Actor> {
    new(...args: any[]): T;
}
