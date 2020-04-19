import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/data/common/Page';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatQuery from '@/app/com/data/chat/UserChatQuery';
import UserChatUnreadQuery from '@/app/com/data/chat/UserChatUnreadQuery';

export default class UserChatDataSender extends AbstractMaterial {

    private action: string = '2.2.002';

    public queryCount(query: UserChatQuery, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        this.appContext.netServer.send(m, back, parallel);
    }

    public queryList(query: UserChatQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.query = query;
        m.body.page = page;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getByContentId(contentId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {};
        m.body.contentId = contentId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getByContentIds(contentIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {};
        m.body.contentIds = contentIds;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getListByStartId(sendUserId: string, receiveUserId: string, startId: string, direction: string, count: number, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        m.body.startId = startId;
        m.body.direction = direction;
        m.body.count = count;
        this.appContext.netServer.send(m, back, parallel);
    }

    public getListByStartMessageKey(sendUserId: string, receiveUserId: string, startMessageKey: string, direction: string, count: number, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.sendUserId = sendUserId;
        m.body.receiveUserId = receiveUserId;
        m.body.startMessageKey = startMessageKey;
        m.body.direction = direction;
        m.body.count = count;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateToReadBySendUserId(receiveUserId: string, sendUserId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0009');
        m.body = {};
        m.body.receiveUserId = receiveUserId;
        m.body.sendUserId = sendUserId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateToReadByContentId(receiveUserId: string, contentId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0011');
        m.body = {};
        m.body.receiveUserId = receiveUserId;
        m.body.contentId = contentId;
        this.appContext.netServer.send(m, back, parallel);
    }

    public updateToReadByMessageKey(receiveUserId: string, messageKey: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0013');
        m.body = {};
        m.body.receiveUserId = receiveUserId;
        m.body.messageKey = messageKey;
        this.appContext.netServer.send(m, back, parallel);
    }

    public queryUserChatUnreadCount(query: UserChatUnreadQuery, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0015');
        m.body = {};
        m.body.query = query;
        this.appContext.netServer.send(m, back, parallel);
    }

    public queryUserChatUnreadList(query: UserChatUnreadQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0016');
        m.body = {};
        m.body.query = query;
        m.body.page = page;
        this.appContext.netServer.send(m, back, parallel);
    }
}
