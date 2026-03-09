package com.example.game.controllers;

import com.example.game.models.SaveDataPlayers;
import com.example.game.repositories.SaveDataPlayersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/save-data-players")
public class SaveDataPlayersController {

    private final SaveDataPlayersRepository saveDataPlayersRepository;

    public SaveDataPlayersController(SaveDataPlayersRepository saveDataPlayersRepository) {
        this.saveDataPlayersRepository = saveDataPlayersRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> listAllPlayers() {
        List<SaveDataPlayers> playersDataList = saveDataPlayersRepository.findAll();
        if (playersDataList.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(playersDataList, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlayerById(@PathVariable int id) {
        SaveDataPlayers playerData = saveDataPlayersRepository.findById(id).orElse(null);
        if (playerData == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(playerData, HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createPlayer(@RequestBody SaveDataPlayers newPlayerData) {
        SaveDataPlayers savedPlayerData = saveDataPlayersRepository.save(newPlayerData);
        return new ResponseEntity<>(savedPlayerData, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlayer(@PathVariable int id, @RequestBody SaveDataPlayers updatedPlayerData) {
        SaveDataPlayers existingPlayerData = saveDataPlayersRepository.findById(id).orElse(null);
        if (existingPlayerData == null) {
            return ResponseEntity.notFound().build();
        } else {
            existingPlayerData.setName(updatedPlayerData.getName());
            existingPlayerData.setColor(updatedPlayerData.getColor());
            existingPlayerData.setAmount(updatedPlayerData.getAmount());
            existingPlayerData.setCurrentSpace(updatedPlayerData.getCurrentSpace());
            SaveDataPlayers savedPlayerData = saveDataPlayersRepository.save(existingPlayerData);
            return new ResponseEntity<>(savedPlayerData, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlayer(@PathVariable int id) {
        SaveDataPlayers existingPlayerData = saveDataPlayersRepository.findById(id).orElse(null);
        if (existingPlayerData == null) {
            return ResponseEntity.notFound().build();
        } else {
            saveDataPlayersRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAllPlayers() {
        saveDataPlayersRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
