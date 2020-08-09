import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import SystemInformationItemManager from '@/app/com/main/manager/SystemInformationItemManager';
import SystemMessageUnreadBox from '@/app/com/main/module/business/chat/box/unread/SystemMessageUnreadBox';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';
import MessageAllUnreadManager from '@/app/com/main/manager/MessageAllUnreadManager';
import SystemInformationDataManager from '@/app/com/main/manager/SystemInformationDataManager';


export default class SystemInformationDataService extends AbstractMaterial {

    public showByType(type: string) {
        const systemInformManager: SystemInformationDataManager = this.appContext.getMaterial(SystemInformationDataManager);
        systemInformManager.showByType(type);

        const systemInformItemManager: SystemInformationItemManager = this.appContext.getMaterial(SystemInformationItemManager);
        const systemMessageUnreadBox: SystemMessageUnreadBox = this.appContext.getMaterial(SystemMessageUnreadBox);

        systemMessageUnreadBox.setUnreadCount(type, 0);
        systemInformItemManager.setItemRed(type, false, 0);
    }
}
