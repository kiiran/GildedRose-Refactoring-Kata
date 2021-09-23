import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    it('should return sellIn -1', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
    });

    it('should return quality -0', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(-0);
    });


    it('should return of Aged Brie quality 3', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 2, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
    });

    it('should return never quality over 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 2, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).not.greaterThan(50);
    });

    it('should return for Sulfuras never has to be sold or decreases in Quality', function() {
        const sellIn = 2;
        const quality = 50;
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', sellIn, quality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(quality);
        expect(items[0].sellIn).to.equal(sellIn);
    });
    
    it('should return for Backstage passes increase by 2 when there are 10 days', function() {
        const sellIn = 10;
        const quality = 11;
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(13);
    });

    it('should return for Backstage passes increase by 1 when there are more then 10 days', function() {
        const sellIn = 15;
        const quality = 1;
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
    });

    it('should return for Backstage passes increase by 3 when there are 5 days', function() {
        const sellIn = 2;
        const quality = 11;
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(14);
    });

    it('should return for Backstage passes quality drops to 0 after the concert ', function() {
        const sellIn = -1;
        const quality = 10;
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

});
