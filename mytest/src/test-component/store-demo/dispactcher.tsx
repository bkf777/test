import { Action } from "./actions";


class Dispatcher {
    private callbacks: { [key: string]: (action: Action) => void } = {};

    register(callback: (action: Action) => void): string {
        const id = new Date().getTime().toString();
        this.callbacks[id] = callback;
        return id;
    }

    dispatch(action: Action): void {
        for (const id in this.callbacks) {
            this.callbacks[id](action);
        }
    }
}

const dispatcher = new Dispatcher();

export default dispatcher;
