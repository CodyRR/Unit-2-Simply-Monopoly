package com.example.game.controllers;

import com.example.game.models.GameBoards;
import com.example.game.repositories.GameBoardsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game-boards")
public class GameBoardsController {

    private final GameBoardsRepository gameBoardsRepository;

    public GameBoardsController(GameBoardsRepository gameBoardsRepository) {
        this.gameBoardsRepository = gameBoardsRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> listAllGameBoards() {
        List<GameBoards>  allGameBoards = gameBoardsRepository.findAll();
        if (allGameBoards.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(allGameBoards, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGameBoardById(@PathVariable int id) {
        GameBoards gameBoard = gameBoardsRepository.findById(id).orElse(null);
        if (gameBoard == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(gameBoard, HttpStatus.OK);
        }

    }

    @PostMapping("")
    public ResponseEntity<?> createGameBoard(@RequestBody GameBoards gameBoard) {
        GameBoards savedGameBoard = gameBoardsRepository.save(gameBoard);
        return new ResponseEntity<>(savedGameBoard, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGameBoard(@PathVariable int id, @RequestBody GameBoards updatedGameBoard) {
        GameBoards existingGameBoard = gameBoardsRepository.findById(id).orElse(null);
        if (existingGameBoard == null) {
            return ResponseEntity.notFound().build();
        } else {
            existingGameBoard.setGroupType(updatedGameBoard.getGroupType());
            existingGameBoard.setSpaceName(updatedGameBoard.getSpaceName());
            existingGameBoard.setSpaceNumber(updatedGameBoard.getSpaceNumber());
            existingGameBoard.setBuyAmount(updatedGameBoard.getBuyAmount());
            existingGameBoard.setRentAmount(updatedGameBoard.getRentAmount());
            existingGameBoard.setIsStart(updatedGameBoard.getIsStart());
            GameBoards savedGameBoard = gameBoardsRepository.save(existingGameBoard);
            return new ResponseEntity<>(savedGameBoard, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGameBoard(@PathVariable int id) {

        GameBoards existingGameBoard = gameBoardsRepository.findById(id).orElse(null);
        if (existingGameBoard == null) {
            return ResponseEntity.notFound().build();
        } else {
            gameBoardsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAllGameBoards() {
        gameBoardsRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
