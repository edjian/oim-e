import Content from '@/app/com/common/chat/Content';
import Item from '@/app/com/common/chat/Item';
import BaseUtil from '@/app/lib/util/BaseUtil';
import Section from '@/app/com/common/chat/Section';
import ObjectUtil from '@/app/common/util/ObjectUtil';
import valuesMap from '@/app/com/common/chat/item/index';
import FaceValue from '@/app/com/common/chat/item/FaceValue';

export default class BaseContentItemUtil {

    public static handleConvert(content: Content): Content {
        let value: Content = new Content();
        if (null != content) {
            ObjectUtil.copyByTargetKey(value, content);
            value.sections = [];
            const oldSections = content.sections;
            if (null != oldSections) {
                const newSections: Section[] = [];
                for (const oldSection of oldSections) {
                    const newSection: Section = new Section();
                    const oldItems = oldSection.items;
                    if (oldItems) {
                        const newItems: Item[] = [];
                        for (const oldItem of oldItems) {
                            const newItem: Item = new Item();
                            if (Item.TYPE_TEXT === oldItem.type) {
                                newItem.value = oldItem.value;
                            } else {
                                newItem.value = BaseContentItemUtil.convertItemValue(oldItem.type, oldItem.value);
                            }
                            newItem.type = oldItem.type;
                            newItems.push(newItem);
                        }
                        newSection.items = newItems;
                    }
                    newSections.push(newSection);
                }
                value.sections = newSections;
            }
        }
        return value;
    }

    public static convertItemValue(type: string, data: any): any {
        let map = valuesMap;
        let temp: any;
        if (typeof data === 'string') {
            temp = BaseUtil.jsonToObject(data.toString());
        } else {
            temp = data;
        }
        let value: any;

        if (temp) {
            const length = type.length;
            const key = type.substring(0, 1).toUpperCase() + type.substring(1, length);
            const clazz = map.get(key + 'Value');
            if (clazz) {
                value = ObjectUtil.convert(clazz, temp);
            } else {
                value = temp;
            }
        }

        if (value instanceof FaceValue) {
            const v = ';';
        }
        return value;
    }
}
