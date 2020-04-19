import AbstractMaterial from '@/app/base/AbstractMaterial';
import UserChatItemManager from '@/app/com/main/manager/UserChatItemManager';
import UserChatInfoManager from '@/app/com/main/manager/UserChatInfoManager';
import UserMessageUnreadBox from '@/app/com/main/box/UserMessageUnreadBox';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import UserChatUnread from '@/app/com/bean/UserChatUnread';


export default class UserChatUnreadFunction extends AbstractMaterial {

    public setList(list: UserChatUnread[]) {
        if (list) {
            for (const data of list) {
                const receiveUserId: string = data.receiveUserId;
                const sendUserId: string = data.sendUserId;
                const lastContentId: string = data.lastContentId;
                const unreadCount: number = data.unreadCount;

                this.setUnread(sendUserId, unreadCount);
            }
        }
    }

    public setUnread(userId: string, count: number) {

        const userChatInfoManager: UserChatInfoManager = this.appContext.getMaterial(UserChatInfoManager);
        const userChatItemManager: UserChatItemManager = this.appContext.getMaterial(UserChatItemManager);
        const userMessageUnreadBox: UserMessageUnreadBox = this.appContext.getMaterial(UserMessageUnreadBox);
        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        const messageAllUnreadManager: MessageAllUnreadManager = this.appContext.getMaterial(MessageAllUnreadManager);


        const isChatShowing: boolean = userChatInfoManager.isChatShowing(userId);
        const isTabShowing: boolean = messageAllUnreadManager.isMessageItemShowing();
        if ((!isChatShowing || !isTabShowing)) {
            userMessageUnreadBox.plusUnreadCount(userId, count);
            allMessageUnreadBox.plusUnread(count);

            const totalUnreadCount = allMessageUnreadBox.getTotalUnreadCount();
            const unreadCount = userMessageUnreadBox.getUnreadCount(userId);
            const red = unreadCount > 0;
            const totalRed = totalUnreadCount > 0;
            userChatItemManager.setItemRed(userId, red, unreadCount);
            messageAllUnreadManager.setMessageItemRed(totalRed, totalUnreadCount);
        }
    }
}
