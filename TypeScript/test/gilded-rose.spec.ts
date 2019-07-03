import { expect } from 'chai';
import { Item, GildedRose, AGED_BRIE, BACKSTAGE_PASSES, SULFURAS } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    const conjuredItem = "Conjured Mana Cake";

    const assertItemValues = (item: Item, name: string, sellIn: number, quality: number) => {
        expect(item.name).to.equal(name);
        expect(item.sellIn).to.equal(sellIn);
        expect(item.quality).to.equal(quality);
    };

    const setup = (item: Item) => {
        const gildedRose = new GildedRose([ item ]);
        const items = gildedRose.updateQuality();
        
        return { items };
    };

    it('should not change quality or sellIn for Sulfuras item', function() {
        const { items } = setup(new Item(SULFURAS, -1, 80));

        assertItemValues(items[0], SULFURAS, -1, 80);
    });

    it('should increase quality by 0 when quality is already at 50', () => {
        const { items } = setup(new Item(AGED_BRIE, 2, 50));

        assertItemValues(items[0], AGED_BRIE, 1, 50);        
    });

    it('should decrease quality by 2 once sell by date has passed', () => {
        const { items } = setup(new Item("Elixir of the Mongoose", 0, 7));

        assertItemValues(items[0], "Elixir of the Mongoose", -1, 5);
    });

    describe('Backstage Passes', () => {
        it('should increase quality by 2 when there are 10 days or less left', () => {
            const { items } = setup(new Item(BACKSTAGE_PASSES, 10, 30));

            assertItemValues(items[0], BACKSTAGE_PASSES, 9, 32);
        });

        it('should increase quality by 3 when there are 5 days or less left', () => {
            const { items } = setup(new Item(BACKSTAGE_PASSES, 5, 40));

            assertItemValues(items[0], BACKSTAGE_PASSES, 4, 43);
        })

        it('should set quality to 0 after the concert', () => {
            const { items } = setup(new Item(BACKSTAGE_PASSES, 0, 50));

            assertItemValues(items[0], BACKSTAGE_PASSES, -1, 0);
        });
    });

    describe('conjured item', () => {
        it('should decrease quality by 2', () => {
            const { items } = setup(new Item(conjuredItem, 5, 7));
    
            assertItemValues(items[0], conjuredItem, 4, 5);
        });
        
        it('should decrease quality by 4 when the sell by date has passed ', () => {
            const { items } = setup(new Item(conjuredItem, 0, 4));
    
            assertItemValues(items[0], conjuredItem, -1, 0);
        });
    });
});
