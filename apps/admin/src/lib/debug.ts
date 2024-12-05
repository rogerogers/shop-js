import createDebug, { Debugger } from 'debug';

const debug = (name: string): Debugger => createDebug('backend').extend(name);
export default debug;
