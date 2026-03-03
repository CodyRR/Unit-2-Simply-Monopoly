
export default class Space {
    constructor(name, spaceNum, spaceValueStart, spaceValueBought, isStartSpace){

        this.name = name;
        this.spaceNum = spaceNum;
        this.owner = "Sale";
        this.color = "gray";
        this.spaceIsBought = false;
        this.spaceValueStart = spaceValueStart;
        this.spaceValueBought = spaceValueBought;
        this.isStartSpace = isStartSpace;
        if(isStartSpace){
            this.owner = "Start";
        }
    }
}