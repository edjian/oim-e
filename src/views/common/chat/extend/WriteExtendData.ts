import App from '@/app/App';
import WriteExtendStore from '@/views/common/chat/extend/WriteExtendStore';
import WriteMapper from '@/views/common/chat/WriteMapper';
import WriteExtend from '@/views/common/chat/extend/WriteExtend';

export default class WriteExtendData {

    constructor(public key: any) {
    }

    get has(): boolean {
        const store: WriteExtendStore = App.appContext.getMaterial(WriteExtendStore);
        return store.has(this.key);
    }

    public invoke(writeMapper: WriteMapper): void {
        const store: WriteExtendStore = App.appContext.getMaterial(WriteExtendStore);
        const writeExtend: WriteExtend = store.get(this.key);
        if (writeExtend) {
            writeExtend.invoke(writeMapper);
        }
    }
}
