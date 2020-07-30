import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ActionBox from '@/app/base/action/box/ActionBox';
import InvokeAction from '@/app/base/net/InvokeAction';
import PromptHandler from '@/app/define/prompt/PromptHandler';
import NetServer from '@/app/base/net/NetServer';
import DataBackAction from '@/app/base/net/DataBackAction';
import Prompter from '@/app/com/main/component/Prompter';

export default class NetModule extends AbstractMaterial {

    public readonly netServer: NetServer = new NetServer();

    public initializeNetServer(): void {
        const own = this;
        this.netServer.setAutoConnect(true);
        this.netServer.setInvokeAction({
            invoke(key: string, data: any): void {
                own.invokeAction(key, data);
            },
        } as InvokeAction);
        this.netServer.setErrorPrompt({
            prompt(message: string): void {
                own.appContext.prompt(message);
            },
        } as PromptHandler);
    }

    public invokeAction(key: string, data: any): void {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const actionBox: ActionBox = this.appContext.getMaterial(ActionBox);
        actionBox.invokeAction(key, data, (d) => {
            if (data.info) {
                prompter.message(data.info, '', '消息异常！');
            }
        });
    }

    public send(data: any, back?: DataBackAction, parallel?: boolean): void {
        const netModule: NetModule = this.appContext.getMaterial(NetModule);
        netModule.netServer.send(data, back, parallel);
    }
}
