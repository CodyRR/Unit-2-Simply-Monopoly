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

    @PostMapping("")
    public ResponseEntity<?> createPlayer(@RequestBody SaveDataPlayers newPlayerData) {
        SaveDataPlayers savedPlayerData = saveDataPlayersRepository.save(newPlayerData);
        return new ResponseEntity<>(savedPlayerData, HttpStatus.CREATED);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAllPlayers() {
        saveDataPlayersRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
