import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import Content from '@/app/com/data/chat/content/Content';
import UserChatView from '@/app/com/main/view/UserChatView';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import Page from '@/app/com/data/common/Page';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import UserChatDataSender from '@/app/com/main/sender/UserChatDataSender';
import UserChatData from '@/app/com/data/chat/UserChatData';
import DirectionEnum from '@/app/com/data/chat/type/DirectionEnum';

export default class UserChatManager extends AbstractMaterial {

    protected loadMap: Map<string, boolean> = new Map<string, boolean>();

    public chat(isReceive: boolean, isOwn: boolean, showUser: User, chatUser: User, content: Content): void {
        const key = showUser.id;
        const userChatView: UserChatView = this.appContext.getView(ViewEnum.UserChatView);
        userChatView.insertLast(isReceive, isOwn, key, chatUser, content);
    }

    public firstLoadHistory(userId: string, startMessageKey: string, count: number) {
        if (!this.loadMap.has(userId)) {
            this.loadMap.set(userId, true);
            this.loadHistory(userId, startMessageKey, count);
        }
    }

    public loadHistory(userId: string, startMessageKey: string, count: number) {
        const own = this;
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const userChatSender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);

        const back: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info && info.success) {
                        const items: UserChatData[] = data.body.items;
                        own.setHistory(items);
                    }
                }
            },
            timeOut(data: any): void {
                // no
            },
            lost(data: any): void {
                // no
            },
        } as AbstractDataBackAction;
        const page = new Page();
        // userChatSender.queryList(userId, pb.getUserId(), chatQuery, page, back);
        const direction = DirectionEnum.before;
        userChatSender.getListByStartMessageKey(userId, pb.getUserId(), startMessageKey, direction, count, back);
    }

    public setHistory(contents: UserChatData[]) {
        if (contents) {
            // contents.sort((a: UserChatHistory, b: UserChatHistory) => {
            //     return 0;
            // });
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const ownUserId = pb.getUserId();
            const isReceive = true;
            const userChatView: UserChatView = this.appContext.getView(ViewEnum.UserChatView);
            const length = contents.length;
            for (let i = length - 1; i >= 0; i--) {
                const data = contents[i];
                // const messageKey: string = data.messageKey;
                // const contentId: string = data.contentId;
                const content: Content = data.content;
                const receiveUser: User = data.receiveUser;
                const sendUser: User = data.sendUser;

                const sendUserId: string = sendUser.id;
                const receiveUserId: string = receiveUser.id;

                const isOwn: boolean = sendUserId === ownUserId;

                const showUser: User = (isOwn) ? receiveUser : sendUser;
                const chatUser: User = (isOwn) ? sendUser : showUser;

                const key = showUser.id;

                UserInfoUtil.handleAvatar(showUser);
                UserInfoUtil.handleAvatar(chatUser);

                userChatView.insertBefore(isReceive, isOwn, key, chatUser, content);
            }
        }
    }
}
