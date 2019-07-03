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

export const isConjuredItem = (item: string) => {
    return item.toLowerCase().includes("conjured");
}

export class GildedRose {
    items: Item[];

    constructor(items = [] as Item[]) {
        this.items = items;
    }

    decreaseItemSellIn(item: Item) {
        item.sellIn--;
    }

    increaseItemQuality(item: Item, adj = 1) {
        let newValue = item.quality + adj
        item.quality = newValue > 50 ? 50 : newValue;
    }

    decreaseItemQuality(item: Item, adj = 1) {
        let newValue = item.quality - adj;
        item.quality = newValue < 0 ? 0 : newValue;
    }

    updateQuality() {
        return this.items.map(item => {
            const { name } = item;
            
            if (name === SULFURAS) {
                return item;
            }

            const newItem = { ...item };
            
            if (isConjuredItem(name)) {
                this.decreaseItemSellIn(newItem)
                
                if (newItem.sellIn > 0) {
                    this.decreaseItemQuality(newItem, 2)
                } else {
                    this.decreaseItemQuality(newItem, 4);
                }
                return newItem;
            }

            if (name !== AGED_BRIE && name !== BACKSTAGE_PASSES) {
                this.decreaseItemQuality(newItem);
            } else {
                if (name === BACKSTAGE_PASSES && newItem.sellIn < 11) {
                    const adj = newItem.sellIn < 6 ? 3 : 2;
                    this.increaseItemQuality(newItem, adj);
                } else {
                    this.increaseItemQuality(newItem);
                }
            }
            
            
            this.decreaseItemSellIn(newItem);
            
            if (newItem.sellIn < 0) {
                if (name !== AGED_BRIE) {
                    if (name !== BACKSTAGE_PASSES && newItem.quality > 0) {
                        this.decreaseItemQuality(newItem);
                    } else {
                        this.decreaseItemQuality(newItem, newItem.quality);
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
