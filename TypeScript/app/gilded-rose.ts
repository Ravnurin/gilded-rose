export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros'

export class GildedRose {
    items: Item[];

    constructor(items = [] as Item[]) {
        this.items = items;
    }

    updateQuality() {
        return this.items.map(item => {
            const newItem = { ...item };
            // const { name, sellIn, quality } = newItem;

            if (newItem.name !== AGED_BRIE && newItem.name !== BACKSTAGE_PASSES) {
                if (newItem.quality > 0 && newItem.name !== SULFURAS) {
                    newItem.quality--;
                }
            } else {
                if (newItem.quality < 50) {
                    newItem.quality++;

                    if (newItem.name === BACKSTAGE_PASSES) {
                        if (newItem.sellIn < 11 && newItem.quality < 50) {
                            newItem.quality++;
                        }
                        if (newItem.sellIn < 6 && newItem.quality < 50) {
                            newItem.quality++;                            
                        }
                    }
                }
            }
            if (newItem.name !== SULFURAS) {
                newItem.sellIn--;
            }
            if (newItem.sellIn < 0) {
                if (newItem.name !== AGED_BRIE) {
                    if (newItem.name !== BACKSTAGE_PASSES) {
                        if (newItem.quality > 0) {
                            if (newItem.name !== SULFURAS) {
                                newItem.quality--;
                            }
                        }
                    } else {
                        newItem.quality = newItem.quality - newItem.quality;
                    }
                } else {
                    if (newItem.quality < 50) {
                        newItem.quality++;
                    }
                }
            }
            return newItem;
        });
    }
}
