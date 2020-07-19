import app from '@/app/App';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/SystemTrayBlinkDetection';
import WebImageFileHandler from '@/app/define/file/WebImageFileHandler';
import Item from '@/app/com/data/chat/content/Item';
import ImagePathFile from '@/platform/util/ImagePathFile';
import VoicePromptUserSetting from '@/app/com/main/setting/prompt/VoicePromptUserSetting';
import VoicePromptGroupSetting from '@/app/com/main/setting/prompt/VoicePromptGroupSetting';
import VoicePromptType from '@/app/com/main/setting/prompt/type/VoicePromptType';
import MessageAppendUserSetting from '@/app/com/main/setting/message/MessageAppendUserSetting';
import MessageAppendGroupSetting from '@/app/com/main/setting/message/MessageAppendGroupSetting';
import MessageAppendType from '@/app/com/main/setting/message/type/MessageAppendType';
import AppData from '@/app/base/config/AppData';
import appInfo from '@/platform/config/AppInfo';
import MessageSwitchSetting from '@/app/com/main/setting/message/MessageSwitchSetting';
import AppSettingManager from '@/app/com/main/manager/AppSettingManager';

class PlatformInitialize {
    private change: DataChange<number> = new class implements DataChange<number> {
        public change(count: number): void {
            if (count > 0) {
                systemTrayBlinkDetection.setBlink(true);
            } else {
                systemTrayBlinkDetection.setBlink(false);
            }
        }
    };

    public constructor() {
        this.loadConfig();
    }

    public loadConfig() {
        AppData.APP_NAME = appInfo.name;
        AppData.APP_VERSION = appInfo.version;
        AppData.APP_BUILD = appInfo.build;
        AppData.APP_TYPE = appInfo.type;
        AppData.APP_PLATFORM = appInfo.platform;

        AppData.API_VERSION = appInfo.serverVersion;


        const asm: AppSettingManager = app.appContext.getMaterial(AppSettingManager);
        asm.setDefaultServerUrlGetter(() => {
            return appInfo.serverUrl;
        });
        asm.loadSetting();
    }

    public initialize(): void {
        this.loadConfig();
        this.initializeUnread();
        this.initializeComponent();
    }

    private initializeUnread() {
        // tslint:disable-next-line:max-classes-per-file new-parens
        const allMessageUnreadBox: AllMessageUnreadBox = app.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(this.change);
    }

    private initializeComponent() {

        const webImageFileHandler: WebImageFileHandler = {
            handleItems(items: Item[], back: (map: Map<string, File>) => void): void {
                ImagePathFile.handleFileImageItems(items, back);
            },
        } as WebImageFileHandler;

        app.appContext.putObject(WebImageFileHandler.name, webImageFileHandler);

        const userVoicePromptSetting: VoicePromptUserSetting = app.appContext.getMaterial(VoicePromptUserSetting);
        const groupVoicePromptSetting: VoicePromptGroupSetting = app.appContext.getMaterial(VoicePromptGroupSetting);

        userVoicePromptSetting.setDefaultType(VoicePromptType.always);
        groupVoicePromptSetting.setDefaultType(VoicePromptType.always);

        const messageAppendUserSetting: MessageAppendUserSetting = app.appContext.getMaterial(MessageAppendUserSetting);
        const messageAppendGroupSetting: MessageAppendGroupSetting = app.appContext.getMaterial(MessageAppendGroupSetting);

        messageAppendUserSetting.setDefaultType(MessageAppendType.bottom);
        messageAppendGroupSetting.setDefaultType(MessageAppendType.bottom);

        const messageSwitchSetting: MessageSwitchSetting = app.appContext.getMaterial(MessageSwitchSetting);
        messageSwitchSetting.setSwitchType(MessageAppendType.bottom);
    }
}

export default new PlatformInitialize();
