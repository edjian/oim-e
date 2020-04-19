import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import RecentChatQuery from '@/app/com/data/chat/RecentChatQuery';

export default class RecentChatSender extends AbstractMaterial {

    private action: string = '2.1.001';

    public queryCount(query: RecentChatQuery, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        this.appContext.netServer.send(m, back, parallel);
    }

    public queryList(query: RecentChatQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.query = query;
        m.body.page = page;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getById(id: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.id = id;
        this.appContext.netServer.send(m, back, parallel);
    }

    public remove(userId: string, chatId: string, type: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.userId = userId;
        m.body.chatId = chatId;
        m.body.type = type;
        this.appContext.netServer.send(m, back, parallel);
    }
}
