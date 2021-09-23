export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export enum ItemName {
    'Aged_Brie' = 'Aged Brie',
    'Backstage' = 'Backstage passes to a TAFKAL80ETC concert',
    'Sulfuras' = 'Sulfuras, Hand of Ragnaros'
}
export enum Action {
    "increase"="increase",
    "decrease" = "decrease"
}

const MAX_QUALITY=50;
const MIN_QUALITY=0;
export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
 
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (!this.isSpecialItem(item.name) && item.quality > MIN_QUALITY ) {
                item.quality = item.quality - 1
            } else {
               this.itemQualityCalc(item);
            }
            if (item.name != ItemName.Sulfuras) {
                item.sellIn = item.sellIn - 1;
            }
           this.itemSellInCal(item);
        }
        return this.items;
    }

    private isSpecialItem(name:string):boolean {
        if (Object.values<string>(ItemName).includes(name)){
            return true;
        }
        return false;
    }

    private itemQualityCalc(item:Item) {
        this.changeQuality(item,Action.increase);
        if (item.name == ItemName.Backstage && item.sellIn < 11 ) {
            this.changeQuality(item,Action.increase);
            if (item.sellIn < 6) {
                this.changeQuality(item,Action.increase);                   
            }
        }
    }

    private itemSellInCal(item:Item){
        if (item.sellIn >= 0 || item.name == ItemName.Sulfuras) {
            return ;
        }
        if (item.name == ItemName.Aged_Brie){
            this.changeQuality(item,Action.increase);
            return ;
        }
        if (item.name == ItemName.Backstage ) {
            item.quality = 0;
            return ;
        } 
        this.changeQuality(item,Action.decrease);
    }


    private changeQuality(item:Item, action:Action) {
        if (item.quality > MIN_QUALITY && action === Action.decrease ) {
            item.quality -= 1;
        }
        if (item.quality < MAX_QUALITY && action === Action.increase) {
            item.quality += 1;
        }
    }
            
}
