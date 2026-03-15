package com.example.game.controllers;

import com.example.game.models.SaveDataSpaces;
import com.example.game.repositories.SaveDataSpacesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/save-data-spaces")
public class SaveDataSpacesController {

    private final SaveDataSpacesRepository saveDataSpacesRepository;

    public SaveDataSpacesController(SaveDataSpacesRepository saveDataSpacesRepository) {
        this.saveDataSpacesRepository = saveDataSpacesRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> listAllSpaces() {
        List<SaveDataSpaces> spacesDataList = saveDataSpacesRepository.findAll();
        if (spacesDataList.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(spacesDataList, HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createSpaces(@RequestBody SaveDataSpaces spacesData) {
        SaveDataSpaces savedSpacesData = saveDataSpacesRepository.save(spacesData);
        return new ResponseEntity<>(savedSpacesData, HttpStatus.CREATED);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAllSpaces() {
        saveDataSpacesRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
