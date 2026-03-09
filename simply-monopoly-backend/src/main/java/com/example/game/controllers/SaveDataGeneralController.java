package com.example.game.controllers;

import com.example.game.models.SaveDataGeneral;
import com.example.game.repositories.SaveDataGeneralRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/save-data-general")
public class SaveDataGeneralController {

    private final SaveDataGeneralRepository saveDataGeneralRepository;

    public SaveDataGeneralController(SaveDataGeneralRepository saveDataGeneralRepository) {
        this.saveDataGeneralRepository = saveDataGeneralRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> listAllGeneral() {
        List<SaveDataGeneral> generalDataList = saveDataGeneralRepository.findAll();
        if (generalDataList.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(generalDataList, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGeneralById(@PathVariable int id) {
        SaveDataGeneral generalData = saveDataGeneralRepository.findById(id).orElse(null);
        if (generalData == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(generalData, HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createGeneral(@RequestBody SaveDataGeneral generalData) {
        SaveDataGeneral savedGeneralData = saveDataGeneralRepository.save(generalData);
        return new ResponseEntity<>(savedGeneralData, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGeneral(@PathVariable int id, @RequestBody SaveDataGeneral updatedGeneralData) {
        SaveDataGeneral existingGeneralData = saveDataGeneralRepository.findById(id).orElse(null);
        if (existingGeneralData == null) {
            return ResponseEntity.notFound().build();
        } else {
            existingGeneralData.setDie(updatedGeneralData.getDie());
            existingGeneralData.setTurnLimit(updatedGeneralData.getTurnLimit());
            existingGeneralData.setTurnNumber(updatedGeneralData.getTurnNumber());
            existingGeneralData.setGoAmount(updatedGeneralData.getGoAmount());
            SaveDataGeneral savedGeneralData = saveDataGeneralRepository.save(existingGeneralData);
            return new ResponseEntity<>(savedGeneralData, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGeneral(@PathVariable int id) {
        SaveDataGeneral existingGeneralData = saveDataGeneralRepository.findById(id).orElse(null);
        if (existingGeneralData == null) {
            return ResponseEntity.notFound().build();
        } else {
            saveDataGeneralRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAllGeneral() {
        saveDataGeneralRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
