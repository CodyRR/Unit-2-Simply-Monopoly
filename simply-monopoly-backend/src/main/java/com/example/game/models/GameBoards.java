package com.example.game.models;

import com.example.game.classes.GroupEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class GameBoards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private GroupEnum groupType;
    private String spaceName;
    private int spaceNumber;
    private int buyAmount;
    private int rentAmount;
    private Boolean isStart;

    public GameBoards() {}

    public GameBoards(GroupEnum groupType, String spaceName, int spaceNumber, int buyAmount, int rentAmount, Boolean isStart) {
        this.groupType = groupType;
        this.spaceName = spaceName;
        this.spaceNumber = spaceNumber;
        this.buyAmount = buyAmount;
        this.rentAmount = rentAmount;
        this.isStart = isStart;
    }

    public int getId() {
        return id;
    }

    public GroupEnum getGroupType() {
        return groupType;
    }

    public void setGroupType(GroupEnum groupType) {
        this.groupType = groupType;
    }

    public String getSpaceName() {
        return spaceName;
    }

    public void setSpaceName(String spaceName) {
        this.spaceName = spaceName;
    }

    public int getSpaceNumber() {
        return spaceNumber;
    }

    public void setSpaceNumber(int spaceNumber) {
        this.spaceNumber = spaceNumber;
    }

    public int getBuyAmount() {
        return buyAmount;
    }

    public void setBuyAmount(int buyAmount) {
        this.buyAmount = buyAmount;
    }

    public int getRentAmount() {
        return rentAmount;
    }

    public void setRentAmount(int rentAmount) {
        this.rentAmount = rentAmount;
    }

    public Boolean getIsStart() {
        return isStart;
    }

    public void setIsStart(Boolean start) {
        isStart = start;
    }
}
