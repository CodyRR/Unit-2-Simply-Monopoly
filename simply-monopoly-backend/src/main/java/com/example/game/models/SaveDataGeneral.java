package com.example.game.models;

import com.example.game.classes.DiceEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SaveDataGeneral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private DiceEnum die;
    private int turnLimit;
    private int turnNumber;
    private int goAmount;
    private int currentPlayerTurn;

    public SaveDataGeneral() {}

    public SaveDataGeneral(DiceEnum die, int turnLimit, int turnNumber, int goAmount, int currentPlayerTurn) {
        this.die = die;
        this.turnLimit = turnLimit;
        this.turnNumber = turnNumber;
        this.goAmount = goAmount;
        this.currentPlayerTurn = currentPlayerTurn;
    }

    public int getId() {
        return id;
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

    public int getCurrentPlayerTurn() {
        return currentPlayerTurn;
    }

    public void setCurrentPlayerTurn(int currentPlayerTurn) {
        this.currentPlayerTurn = currentPlayerTurn;
    }
}
