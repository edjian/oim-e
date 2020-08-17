export default class ByteSizeUtil {

    public static KB = 1024;
    public static MB = 1024 * ByteSizeUtil.KB;
    public static GB = 1024 * ByteSizeUtil.MB;
    public static TB = 1024 * ByteSizeUtil.GB;
    public static PB = 1024 * ByteSizeUtil.TB;
    public static EB = 1024 * ByteSizeUtil.PB;
    public static ZB = 1024 * ByteSizeUtil.EB;
    public static YB = 1024 * ByteSizeUtil.ZB;
    public static BB = 1024 * ByteSizeUtil.YB;

    public static KB_N = 'KB';
    public static MB_N = 'MB';
    public static GB_N = 'GB';
    public static TB_N = 'TB';
    public static PB_N = 'PB';
    public static EB_N = 'EB';
    public static ZB_N = 'ZB';
    public static YB_N = 'YB';
    public static BB_N = 'BB';


    public static getSizeText(size: number): string {
        let text = '0B';
        if (size < ByteSizeUtil.KB) {
            text = size + 'B';
        } else if (ByteSizeUtil.KB <= size && size < ByteSizeUtil.MB) {
            text = (size / ByteSizeUtil.KB).toFixed(2) + 'KB';
        } else if (ByteSizeUtil.MB <= size && size < ByteSizeUtil.GB) {
            text = (size / (ByteSizeUtil.MB)).toFixed(2) + 'MB';
        } else if (ByteSizeUtil.GB <= size && size < ByteSizeUtil.TB) {
            text = (size / (ByteSizeUtil.GB)).toFixed(2) + 'GB';
        } else if (ByteSizeUtil.TB <= size && size < ByteSizeUtil.PB) {
            text = (size / (ByteSizeUtil.TB)).toFixed(2) + 'TB';
        } else if (ByteSizeUtil.PB <= size && size < ByteSizeUtil.EB) {
            text = (size / (ByteSizeUtil.PB)).toFixed(2) + 'PB';
        } else if (ByteSizeUtil.EB <= size && size < ByteSizeUtil.ZB) {
            text = (size / (ByteSizeUtil.EB)).toFixed(2) + 'EB';
        } else if (ByteSizeUtil.ZB <= size && size < ByteSizeUtil.YB) {
            text = (size / (ByteSizeUtil.ZB)).toFixed(2) + 'ZB';
        } else if (ByteSizeUtil.YB <= size && size < ByteSizeUtil.BB) {
            text = (size / (ByteSizeUtil.YB)).toFixed(2) + 'YB';
        } else {
            text = (size / (ByteSizeUtil.BB)).toFixed(2) + 'BB';
        }
        return text;
    }
}
