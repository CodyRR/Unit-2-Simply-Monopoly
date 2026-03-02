package com.example.game.models;

import com.example.game.classes.GroupEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SaveDataSpaces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private GroupEnum groupType;
    private String spaceName;
    private int spaceNumber;
    private int buyAmount;
    private int rentAmount;
    private Boolean isStart;
    private String owner;
    private String color;
    private Boolean isOwned;

    public SaveDataSpaces() {}

    public SaveDataSpaces(GroupEnum groupType, String spaceName, int spaceNumber, int buyAmount, int rentAmount, Boolean isStart, String owner, String color, Boolean isOwned) {
        this.groupType = groupType;
        this.spaceName = spaceName;
        this.spaceNumber = spaceNumber;
        this.buyAmount = buyAmount;
        this.rentAmount = rentAmount;
        this.isStart = isStart;
        this.owner = owner;
        this.color = color;
        this.isOwned = isOwned;
    }

    public int getId() {
        return id;
    }

    public Boolean getIsOwned() {
        return isOwned;
    }

    public void setIsOwned(Boolean owned) {
        isOwned = owned;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public Boolean getIsStart() {
        return isStart;
    }

    public void setIsStart(Boolean start) {
        isStart = start;
    }

    public int getRentAmount() {
        return rentAmount;
    }

    public void setRentAmount(int rentAmount) {
        this.rentAmount = rentAmount;
    }

    public int getBuyAmount() {
        return buyAmount;
    }

    public void setBuyAmount(int buyAmount) {
        this.buyAmount = buyAmount;
    }

    public int getSpaceNumber() {
        return spaceNumber;
    }

    public void setSpaceNumber(int spaceNumber) {
        this.spaceNumber = spaceNumber;
    }

    public String getSpaceName() {
        return spaceName;
    }

    public void setSpaceName(String spaceName) {
        this.spaceName = spaceName;
    }

    public GroupEnum getGroupType() {
        return groupType;
    }

    public void setGroupType(GroupEnum groupType) {
        this.groupType = groupType;
    }
}
