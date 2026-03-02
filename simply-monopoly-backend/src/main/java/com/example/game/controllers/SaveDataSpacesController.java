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

    @GetMapping("/{id}")
    public ResponseEntity<?> getSpacesById(@PathVariable int id) {
        SaveDataSpaces spacesData = saveDataSpacesRepository.findById(id).orElse(null);
        if (spacesData == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(spacesData, HttpStatus.OK);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createSpaces(@RequestBody SaveDataSpaces spacesData) {
        SaveDataSpaces savedSpacesData = saveDataSpacesRepository.save(spacesData);
        return new ResponseEntity<>(savedSpacesData, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSpaces(@PathVariable int id, @RequestBody SaveDataSpaces updatedSpacesData) {
        SaveDataSpaces existingSpacesData = saveDataSpacesRepository.findById(id).orElse(null);
        if (existingSpacesData == null) {
            return ResponseEntity.notFound().build();
        } else {
            existingSpacesData.setGroupType(updatedSpacesData.getGroupType());
            existingSpacesData.setSpaceName(updatedSpacesData.getSpaceName());
            existingSpacesData.setSpaceNumber(updatedSpacesData.getSpaceNumber());
            existingSpacesData.setBuyAmount(updatedSpacesData.getBuyAmount());
            existingSpacesData.setRentAmount(updatedSpacesData.getRentAmount());
            existingSpacesData.setIsStart(updatedSpacesData.getIsStart());
            existingSpacesData.setOwner(updatedSpacesData.getOwner());
            existingSpacesData.setColor(updatedSpacesData.getColor());
            existingSpacesData.setIsOwned(updatedSpacesData.getIsOwned());
            SaveDataSpaces savedSpacesData = saveDataSpacesRepository.save(existingSpacesData);
            return new ResponseEntity<>(savedSpacesData, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSpaces(@PathVariable int id) {
        SaveDataSpaces existingSpacesData = saveDataSpacesRepository.findById(id).orElse(null);
        if (existingSpacesData == null) {
            return ResponseEntity.notFound().build();
        } else {
            saveDataSpacesRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
