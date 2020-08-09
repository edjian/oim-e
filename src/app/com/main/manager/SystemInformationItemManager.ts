import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ViewEnum from '@/app/com/client/common/view/ViewEnum';
import MessageListView from '@/app/com/client/module/message/view/MessageListView';
import SystemInformationItemEvent from '@/app/com/main/module/common/event/SystemInformationItemEvent';

export default class SystemInformationItemManager extends AbstractMaterial {
    private type = 'system_information';

    public show(key: string) {
        this.addOrUpdate(key);
        this.selectItem(key);
    }

    public addOrUpdate(key: string) {
        const name = '信息';
        const avatar = 'assets/images/common/head/system/inform.png';
        const gray = false;
        const systemInformItemEvent: SystemInformationItemEvent = this.appContext.getMaterial(SystemInformationItemEvent);

        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.addOrUpdateItem(this.type, key, name, avatar, gray, (k: string) => {
            systemInformItemEvent.onSelect(key);
        }, (k: string) => {
            systemInformItemEvent.onDelete(k);
        });
    }

    public selectItem(key: string) {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.selectItem(this.type, key);
    }

    public hasItem(key: string): boolean {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        return messageListView.hasItem(this.type, key);
    }

    public deleteItem(key: string) {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.removeItem(this.type, key);
    }

    public updateItemText(key: string, text: string, timeText: string, timestamp: number): void {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.updateItemText(this.type, key, text, timeText, timestamp);
    }

    public setItemRed(key: string, red: boolean, count: number): void {
        const messageListView: MessageListView = this.appContext.getView(ViewEnum.MessageListView);
        messageListView.setItemRed(this.type, key, red, count);
    }
}
