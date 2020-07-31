import PromptHandler from '@/app/define/prompt/PromptHandler';
import Prompt from '@/platform/web/common/Prompt';

export default class WebPromptHandlerImpl implements PromptHandler {

    public prompt(message: string, title?: string, type?: string): void {

    }

    public error(message: string, title?: string): void {
        Prompt.error(message, title);
    }

    public info(message: string, title?: string): void {
        Prompt.info(message, title);
    }

    public success(message: string, title?: string): void {
        Prompt.success(message, title);
    }

    public warn(message: string, title?: string): void {
        Prompt.warning(message, title);
    }
}
