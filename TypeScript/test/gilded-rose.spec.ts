import { expect } from 'chai';
import { Item, GildedRose, AGED_BRIE, BACKSTAGE_PASSES, SULFURAS } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    const assertItemValues = (item: Item, name: string, sellIn: number, quality: number) => {
        expect(item.name).to.equal(name);
        expect(item.sellIn).to.equal(sellIn);
        expect(item.quality).to.equal(quality);
    };

    it('should foo', function() {
        const gildedRose = new GildedRose([
            new Item(SULFURAS, -1, 80),
            new Item(BACKSTAGE_PASSES, 15, 20),
            new Item(BACKSTAGE_PASSES, 10, 30),
            new Item(AGED_BRIE, 2, 40),
        ]);
        const items = gildedRose.updateQuality();

        assertItemValues(items[0], SULFURAS, -1, 80);
        assertItemValues(items[1], BACKSTAGE_PASSES, 14, 21);
        assertItemValues(items[2], BACKSTAGE_PASSES, 9, 32);
        assertItemValues(items[3], AGED_BRIE, 1, 41);



    });

});
