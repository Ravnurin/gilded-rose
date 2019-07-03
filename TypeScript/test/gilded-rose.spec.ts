import { expect } from 'chai';
import { Item, GildedRose, AGED_BRIE, BACKSTAGE_PASSES, SULFURAS } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    const assertItemValues = (item: Item, name: string, sellIn: number, quality: number) => {
        expect(item.name).to.equal(name);
        expect(item.sellIn).to.equal(sellIn);
        expect(item.quality).to.equal(quality);
    };

    const conjuredItem = "Conjured Mana Cake";

    it('should foo', function() {
        const gildedRose = new GildedRose([
            new Item(SULFURAS, -1, 80),
            new Item(BACKSTAGE_PASSES, 10, 30),
            new Item(BACKSTAGE_PASSES, 0, 50),
            new Item(AGED_BRIE, 2, 50),
            new Item("Elixir of the Mongoose", 0, 7),
            new Item(conjuredItem, 5, 7),
            new Item(conjuredItem, 0, 4),
        ]);
        const items = gildedRose.updateQuality();

        assertItemValues(items[0], SULFURAS, -1, 80);
        assertItemValues(items[1], BACKSTAGE_PASSES, 9, 32);
        assertItemValues(items[2], BACKSTAGE_PASSES, -1, 0);
        assertItemValues(items[3], AGED_BRIE, 1, 50);
        assertItemValues(items[4], "Elixir of the Mongoose", -1, 5);
        assertItemValues(items[5], conjuredItem, 4, 5);
        assertItemValues(items[6], conjuredItem, -1, 0);
    });

});
