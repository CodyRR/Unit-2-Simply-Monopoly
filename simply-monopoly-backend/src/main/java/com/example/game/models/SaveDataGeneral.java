package com.example.game.models;

import com.example.game.classes.DiceEnum;
import jakarta.persistence.Entity;

@Entity
public class SaveDataGeneral {

    private DiceEnum die;
    private int turnLimit;
    private int turnNumber;
    private int goAmount;

    public SaveDataGeneral() {}

    public SaveDataGeneral(DiceEnum die, int turnLimit, int turnNumber, int goAmount) {
        this.die = die;
        this.turnLimit = turnLimit;
        this.turnNumber = turnNumber;
        this.goAmount = goAmount;
    }

    public DiceEnum getDie() {
        return die;
    }

    public void setDie(DiceEnum die) {
        this.die = die;
    }

    public int getTurnLimit() {
        return turnLimit;
    }

    public void setTurnLimit(int turnLimit) {
        this.turnLimit = turnLimit;
    }

    public int getTurnNumber() {
        return turnNumber;
    }

    public void setTurnNumber(int turnNumber) {
        this.turnNumber = turnNumber;
    }

    public int getGoAmount() {
        return goAmount;
    }

    public void setGoAmount(int goAmount) {
        this.goAmount = goAmount;
    }
}
