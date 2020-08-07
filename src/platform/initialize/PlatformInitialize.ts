import app from '@/app/App';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/e/SystemTrayBlinkDetection';
import AppData from '@/app/base/config/AppData';
import appInfo from '@/platform/common/config/AppInfo';
import AppSettingManager from '@/app/com/client/module/setting/manager/AppSettingManager';
import Platform from '@/app/common/util/Platform';
import AppInfo from '@/app/base/config/AppInfo';
import AppInitializer from '@/impl/initialize/AppInitializer';
import CurrentComponentInitializer from '@/platform/initialize/launch/CurrentComponentInitializer';
import routerManager from '@/router/RouterManager';
import auth from '@/app/common/auth/Auth';
import WebPlatformComponentInitializer from '@/platform/web/initialize/launch/WebPlatformComponentInitializer';
import WebComponentInitializer from '@/common/web/initialize/launch/WebComponentInitializer';


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
        this.initializeRouter();
        this.initialize();
    }


    public initialize(): void {
        this.loadConfig();
        this.buildInitializerComponent();
        this.initializeUnread();
        this.initializeApp();
    }

    public loadConfig() {
        AppData.APP_NAME = appInfo.name;
        AppData.APP_VERSION = appInfo.version;
        AppData.APP_BUILD = appInfo.build;
        AppData.APP_TYPE = appInfo.type;
        AppData.APP_PLATFORM = appInfo.platform;

        AppData.API_VERSION = appInfo.serverVersion;

        const osName = Platform.getName();
        AppInfo.APP_PLATFORM = osName;

        const asm: AppSettingManager = app.appContext.getMaterial(AppSettingManager);
        asm.setDefaultServerUrlGetter(() => {
            return appInfo.serverUrl;
        });
        asm.loadSetting();
    }

    private initializeRouter() {
        const routerSkips: string[] = ['login', 'register', 'resetPassword'];
        routerManager.setRouterAuth({
            isAuth(): boolean {
                return auth.isLogin();
            },
        });
        routerManager.setDefaultRouteName('login');
        routerManager.setSkips(routerSkips);
        routerManager.setIntercept(true);
    }

    private buildInitializerComponent() {
        app.putInitializer(new AppInitializer());

        app.putInitializer(new WebComponentInitializer());

        app.putInitializer(new WebPlatformComponentInitializer());

        app.putInitializer(new CurrentComponentInitializer());
    }

    private initializeUnread() {
        const allMessageUnreadBox: AllMessageUnreadBox = app.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(this.change);
    }

    private initializeApp() {
        app.initialize();
    }
}

export default new PlatformInitialize();
